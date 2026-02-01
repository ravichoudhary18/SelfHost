from app.api.v1.api import api_router
from app.core.config import settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="TaskQ",
    description="Task Management API",
    version="1.0.0",
    debug=settings.DEBUG,
)

origins = [
    "http://localhost:5173",  # Vite React dev server
    "http://localhost:3000",  # if CRA
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)