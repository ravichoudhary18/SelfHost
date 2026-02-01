export const TASK_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string;
  created_at?: string;
  updated_at?: string;
  created_by?: number;
  updated_by?: number;
}
