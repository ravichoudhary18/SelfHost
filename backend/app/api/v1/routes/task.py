from typing import List, Optional

from app.core.database import get_db
from app.schemas.task import TaskCreate, TaskResponse, TaskStatus, TaskUpdate
from app.services.task_service import (
    bulk_delete_tasks,
    create_task,
    delete_task,
    get_task,
    update_task,
)
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.post('/tasks', response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task_api(task_in: TaskCreate, db: AsyncSession = Depends(get_db)):
    task = await create_task(db, task_in)
    return task

@router.get('/tasks', response_model=List[TaskResponse])
async def get_task_api(task_id: Optional[int] = None, 
    status: Optional[TaskStatus] = Query(None, description="Filter by task status"),
    db: AsyncSession = Depends(get_db)):
    result = await get_task(db, task_id, status)
    return result

@router.get("/tasks/{task_id}", response_model=List[TaskResponse])
async def get_single_task_api(task_id: int, db: AsyncSession = Depends(get_db)):
    result = await get_task(db, task_id)
    return result

@router.put("/tasks/{task_id}", response_model=TaskResponse)
async def api_update_task(task_id: int, task_in: TaskUpdate, db: AsyncSession = Depends(get_db)):
    task = (await get_task(db, task_id))[0]
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task = await update_task(db, task, task_in)
    return task

@router.delete("/tasks", status_code=status.HTTP_204_NO_CONTENT)
async def api_delete_tasks(
    task_id: Optional[int] = Query(None, description="ID of a single task to delete"),
    task_ids: Optional[List[int]] = Query(None, description="List of task IDs to delete in bulk"),
    db: AsyncSession = Depends(get_db)
):
    """
    Delete a single task (task_id) or multiple tasks (task_ids).
    - Provide either `task_id` or `task_ids`.
    - Returns 204 for single delete.
    - Returns JSON {"deleted": n} for bulk delete.
    """
    # Single delete
    if task_id is not None:
        tasks = await get_task(db, task_id)
        task = tasks[0] if tasks else None
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        await delete_task(db, task)
        return  # 204 No Content

    # Bulk delete
    if task_ids:
        deleted_count = await bulk_delete_tasks(db, task_ids)
        if deleted_count == 0:
            raise HTTPException(status_code=404, detail="No tasks found to delete")
        return {"deleted": deleted_count}

    # Neither provided
    raise HTTPException(status_code=400, detail="Provide task_id or task_ids to delete")