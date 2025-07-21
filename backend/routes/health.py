from fastapi import APIRouter
from backend.types.base import StatusResponse

router = APIRouter(tags=["health"])

@router.get("/", response_model=StatusResponse)
async def health_check():
    return StatusResponse(status="Backend up and running")
