"""Video streaming endpoints."""
from fastapi import APIRouter, Response, UploadFile, File
from fastapi.responses import StreamingResponse
from typing import Literal
from fastapi import HTTPException
from backend.utils.video_stream import (
    image_frame_iter,
    screen_frame_iter,
    video_frame_iter,
    detect_boxes,
    draw_boxes,
    _YOLO_MODEL,
    sobel_filter,
)
import os
import time
from enum import Enum
from dotenv import load_dotenv
import cv2
from typing import Literal

from ultralytics import YOLO  

load_dotenv("backend/.env")

class Feed(str, Enum):
    RGB = "RGB"
    IR = "IR"
    FUSED = "FUSED"

router = APIRouter(prefix="/video", tags=["video"])

BASE_DIR = os.path.join(os.path.dirname(__file__), "../assets")

ORIGINAL_IMAGE_DIR = os.getenv("IMAGE_DIR", os.path.join(BASE_DIR, "images"))
ORIGINAL_VIDEO_PATH = os.getenv("VIDEO_PATH", os.path.join(BASE_DIR, "videos/aerothon-demo.mp4"))

@router.get("/stream/{feed}")
async def stream_feed(feed: Feed,
                      mode: Literal["image", "video", "live"] = "image"):
    """
    Unified MJPEG stream. For image/live, runs YOLO and draws boxes.
    """
    if mode == "video":
        video_path = ORIGINAL_VIDEO_PATH
        print(video_path)
        if not os.path.isfile(video_path):
            raise HTTPException(404, "Video not found")
        frame_gen = video_frame_iter(video_path)
    elif mode == "live":
        frame_gen = screen_frame_iter()
    else:
        folder = ORIGINAL_IMAGE_DIR
        if not os.path.isdir(folder):
            raise HTTPException(404, "Image folder not found")
        frame_gen = image_frame_iter(folder)

    boundary = b"--frame"

    async def mjpeg():
        frame_index = 0
        async for frame in frame_gen:
            # Apply per-feed processing
            # 1. Sobel edge filter for IR feed
            if feed == Feed.IR:
                frame = sobel_filter(frame)

            # 2. Bounding boxes for FUSED feed (any mode)
            if feed == Feed.FUSED and _YOLO_MODEL:
                boxes = detect_boxes(frame, feed.value, frame_index)
                frame = draw_boxes(frame, boxes)
                
            frame_index += 1

            ok, buf = cv2.imencode(".jpg", frame)
            if ok:
                yield (boundary + b"\r\nContent-Type: image/jpeg\r\n\r\n"
                       + buf.tobytes() + b"\r\n")

    return StreamingResponse(mjpeg(),
                            media_type="multipart/x-mixed-replace; boundary=frame")


@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    """Receive an image file and save it to ORIGINAL_IMAGE_DIR."""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image uploads are supported")
    os.makedirs(ORIGINAL_IMAGE_DIR, exist_ok=True)
    filename = f"upload_{int(time.time())}_{file.filename}"
    dest_path = os.path.join(ORIGINAL_IMAGE_DIR, filename)
    with open(dest_path, "wb") as out_file:
        content = await file.read()
        out_file.write(content)
    return {"filename": filename, "status": "uploaded"}