import { Edit, Eye, Trash2 } from 'lucide-react'; // optional icons
import moment from 'moment';
import React from 'react';
import type { Task } from '../../types/task';
import { TASK_STATUS } from '../../types/task';

interface TaskRowProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onView: (task: Task) => void;
  onStatusChange: (id: number, status: Task['status']) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  onEdit,
  onDelete,
  onView,
  onStatusChange,
}) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-4 py-2">{task.title}</td>
      <td className="px-4 py-2">{task.description}</td>
      <td className="px-4 py-2">
        {task.due_date ? moment(task.due_date).format('MM-DD-YYYY') : '—'}
      </td>
      <td className="px-4 py-2">
        <select
          className="border rounded px-2 py-1 text-sm bg-white hover:bg-gray-100"
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as Task['status'])
          }
        >
          {Object.values(TASK_STATUS).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-2 flex gap-2">
        <button
          onClick={() => onView(task)}
          className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
        >
          <Eye size={16} />
          View
        </button>
        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
        >
          <Edit size={16} />
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
