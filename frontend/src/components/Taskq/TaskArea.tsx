// src/pages/TaskArea.tsx
import React, { useEffect, useState } from 'react';
import useAxiosInterface from '../../hooks/useAxiosInterface';
import { deleteTask, getTasks, updateTask } from '../../services/taskApi';
import type { Task } from '../../types/task';
import TaskFilter from './TaskFilter';
import TaskTable from './TaskTable';

const TaskArea: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const axiosInterface = useAxiosInterface();
  const [statusFilter, setStatusFilter] = useState<Task['status'] | ''>('');

  const fetchTasks = async () => {
    const response = await getTasks(statusFilter, axiosInterface);
    setTasks(response.data);
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id, axiosInterface);
    fetchTasks();
  };

  const handleStatusChange = async (id: number, status: Task['status']) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    await updateTask({ ...task, status }, axiosInterface);
    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    console.log('Edit task', task);
    // TODO: open edit modal or navigate to edit page
  };

  const handleView = (task: Task) => {
    console.log('View task', task);
    // TODO: open view modal or navigate to view page
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  return (
    <div className="p-4">
      <TaskFilter value={statusFilter} onChange={setStatusFilter} />
      <h1 className="text-xl font-bold mb-4">Tasks</h1>
      <TaskTable
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default TaskArea;
