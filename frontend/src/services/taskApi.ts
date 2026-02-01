import { type AxiosInstance, type AxiosResponse } from 'axios';
import type { Task, TaskForm } from '../types/task';

export async function createTask(
  task: TaskForm,
  axiosInterface: AxiosInstance,
): Promise<AxiosResponse> {
  const response = await axiosInterface.post('/api/v1/tasks/tasks', {
    title: task.title,
    description: task.description || null,
    status: task.status,
    due_date: task.due_date || null,
  });

  return response;
}

export async function getTasks(
  status: string,
  axiosInstance: AxiosInstance,
): Promise<AxiosResponse<Task[]>> {
  return axiosInstance.get('/api/v1/tasks/tasks', {
    params: status ? { status } : undefined,
  });
}

export async function updateTask(
  task: Task,
  axiosInstance: AxiosInstance,
): Promise<AxiosResponse<Task>> {
  if (!task.id) throw new Error('Task ID is required for update');
  return await axiosInstance.put(`/api/v1/tasks/tasks/${task.id}`, {
    title: task.title,
    description: task.description || null,
    status: task.status,
    due_date: task.due_date || null,
  });
}

export async function deleteTask(
  taskId: number,
  axiosInstance: AxiosInstance,
): Promise<AxiosResponse<void>> {
  return axiosInstance.delete('/api/v1/tasks/tasks', {
    params: { task_id: taskId },
  });
}
