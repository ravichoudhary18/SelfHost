import React from 'react';
import type { Task } from '../../types/task';

interface TaskFilterProps {
  value: Task['status'] | '';
  onChange: (status: Task['status'] | '') => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <label className="text-sm font-medium text-gray-700">
        Filter by Status:
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Task['status'] | '')}
        className="border rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All</option>
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
        <option value="FAILED">Failed</option>
      </select>
    </div>
  );
};

export default TaskFilter;
