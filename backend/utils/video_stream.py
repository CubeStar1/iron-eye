from __future__ import annotations

import asyncio
import time
import os
import glob
from typing import AsyncGenerator, List

import cv2  
import numpy as np 
import pyautogui 

from backend.types.video import BoundingBox
from ultralytics import YOLO 
from supabase import create_client, Client 
from dotenv import load_dotenv

load_dotenv("backend/.env")

BASE_DIR = os.path.join(os.path.dirname(__file__), "../assets")
_YOLO_MODEL = YOLO(BASE_DIR + "/models/best.pt") # Custom model
# _YOLO_MODEL = YOLO("yolov8m.pt") # YOLOv8 base model, uncomment to use

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_ADMIN")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
_last_detection_upload: float = 0.0


def sobel_filter(frame: np.ndarray) -> np.ndarray:
    """Apply a Sobel edge filter to the given BGR/GRAY frame and return an 8-bit single-channel image.
    """
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY) if frame.ndim == 3 else frame

    grad_x = cv2.Sobel(gray, cv2.CV_16S, 1, 0, ksize=3)
    grad_y = cv2.Sobel(gray, cv2.CV_16S, 0, 1, ksize=3)

    abs_grad_x = cv2.convertScaleAbs(grad_x)
    abs_grad_y = cv2.convertScaleAbs(grad_y)

    sobel = cv2.addWeighted(abs_grad_x, 0.5, abs_grad_y, 0.5, 0)

    return cv2.cvtColor(sobel, cv2.COLOR_GRAY2BGR)


def maybe_upload_detections(feed: str, boxes: List[BoundingBox], frame_idx: int, interval: float = 10.0) -> None:
    """Upload detection rows to Supabase `public.detections` if interval elapsed.

    Parameters
    ----------
    feed: str
        One of "RGB","IR","FUSED".
    boxes: List[BoundingBox]
        Detections for the frame.
    frame_idx: int
        Frame counter.
    interval: float
        Minimum seconds between consecutive uploads.
    """
    global _last_detection_upload

    if not boxes:
        return

    now = time.time()
    if now - _last_detection_upload < interval:
        return

    rows = [
        {
            "feed": feed,
            "label": b.label,
            "confidence": round(b.confidence, 2),
            "frame": frame_idx,
        }
        for b in boxes
    ]
    try:
        data, error = supabase.table("detections").insert(rows).execute()
        print(data, error)
        _last_detection_upload = now
    except Exception as exc:  
        print("Supabase detection insert failed:", exc)


def detect_boxes(image: np.ndarray, feed: str, frame_idx: int) -> List[BoundingBox]:
    """Run detection on a BGR image and return BoundingBox list."""
    results = _YOLO_MODEL([image])[0]
    boxes: List[BoundingBox] = []
    names = _YOLO_MODEL.names  
    for cls, conf, xyxy in zip(
        results.boxes.cls, results.boxes.conf, results.boxes.xyxy  # type: ignore
    ):
        x1, y1, x2, y2 = [int(v) for v in xyxy]
        label = names[int(cls)] if isinstance(names, dict) else str(int(cls))
        boxes.append(
            BoundingBox(
                x=x1,
                y=y1,
                width=x2 - x1,
                height=y2 - y1,
                label=label,
                confidence=float(conf),
            )
        )
    maybe_upload_detections(feed, boxes, frame_idx)
    return boxes


def draw_boxes(frame: np.ndarray, boxes: List[BoundingBox]) -> np.ndarray:
    for b in boxes:
        cv2.rectangle(frame, (b.x, b.y), (b.x + b.width, b.y + b.height), (0, 0, 255), 2)
        cv2.putText(frame, f"{b.label} {int(b.confidence*100)}%", (b.x, b.y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,255), 1)
    return frame

async def image_frame_iter(folder: str, fps: int = 30) -> AsyncGenerator[np.ndarray, None]:
    """Yield jpeg bytes by looping images in folder."""
    images = sorted(glob.glob(os.path.join(folder, "*.jpg")))
    if not images:
        return
    boundary = b"--frame"
    while True:
        for path in images:
            img = cv2.imread(path)
            yield img
            await asyncio.sleep(1 / fps)


async def screen_frame_iter(fps: int = 30) -> AsyncGenerator[np.ndarray, None]:
    """Yield jpeg bytes from live screen capture."""
    boundary = b"--frame"
    while True:
        screenshot = pyautogui.screenshot()
        frame = cv2.cvtColor(np.array(screenshot), cv2.COLOR_RGB2BGR)
        ok, buf = cv2.imencode(".jpg", frame)
        if not ok:
            continue
        yield frame
        await asyncio.sleep(1 / fps)


async def video_frame_iter(path: str, loop: bool=True, fps: int = 30):
    """Yield raw bytes from mp4 file in chunks (simple file read)."""
    cap = cv2.VideoCapture(path)
    while True:
        ret, frame = cap.read()
        if not ret:
            if loop:
                cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                continue
            break
        yield frame
        await asyncio.sleep(1 / fps)
    cap.release()
