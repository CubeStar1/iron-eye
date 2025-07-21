from pydantic import BaseModel
from typing import List

class BoundingBox(BaseModel):
    x: int  # top-left x
    y: int  # top-left y
    width: int
    height: int
    label: str
    confidence: float

class BoxesPayload(BaseModel):
    frame: int
    boxes: List[BoundingBox]
