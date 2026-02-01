from fastapi import APIRouter
from app.api.v1.routes import task


api_router = APIRouter(prefix="/api/v1")
api_router.include_router(task.router, prefix="/tasks", tags=["Tasks"])
