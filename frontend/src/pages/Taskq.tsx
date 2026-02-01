import type React from 'react';
import AddArea from '../components/Taskq/AddArea';
import TaskArea from '../components/Taskq/TaskArea';

const Taskq: React.FC = () => {
  return (
    <div>
      <AddArea />
      <TaskArea />
    </div>
  );
};

export default Taskq;
