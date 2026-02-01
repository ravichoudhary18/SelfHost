from typing import Optional

from app.models.task import Task
from app.schemas.task import TaskCreate, TaskStatus, TaskUpdate
from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


async def create_task(db: AsyncSession, task_in: TaskCreate, user_id:int = 1) -> Task:
    
    task = Task(
        title= task_in.title,
        description = task_in.description,
        status = task_in.status,
        due_date = task_in.due_date,
        created_by = user_id,
        updated_by=user_id
    )
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task


async def get_task(
    db: AsyncSession,
    task_id: Optional[int] = None,
    status: Optional[TaskStatus] = None,
):
    stmt = select(Task)

    # filter by task_id (single task)
    if task_id is not None:
        stmt = stmt.where(Task.id == task_id)

    # filter by status
    if status is not None:
        stmt = stmt.where(Task.status == status)

    # order only when fetching list
    if task_id is None:
        stmt = stmt.order_by(Task.created_at.desc())

    result = await db.execute(stmt)
    tasks = result.scalars().all()

    # keep your original return shape
    if task_id is not None:
        return tasks[:1]  # single task as list

    return tasks

async def update_task(db: AsyncSession, task: Task, task_in: TaskUpdate, user_id: int = 1):
    for field, value in task_in.model_dump(exclude_unset=True).items():
        setattr(task, field, value)
    task.updated_by = user_id
    await db.commit()
    await db.refresh(task)
    return task

async def delete_task(db: AsyncSession, task: Task):
    await db.delete(task)
    await db.commit()
    return True

async def bulk_delete_tasks(db: AsyncSession, task_ids: list[int]) -> int:
    """
    Delete multiple tasks in a single query.
    
    Args:
        db: AsyncSession object
        task_ids: list of task IDs to delete

    Returns:
        int: number of tasks deleted
    """
    if not task_ids:
        return 0  # nothing to delete

    stmt = delete(Task).where(Task.id.in_(task_ids)).execution_options(synchronize_session=False)
    result = await db.execute(stmt)
    await db.commit()
    
    return result.rowcount or 0  # number of rows deleted