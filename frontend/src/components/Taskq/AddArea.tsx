import React, { useState } from 'react';
import DatePickerInput from '../Inputs/DatePickerInput';
import SelectInput from '../Inputs/SelectInput';
import TextInput from '../Inputs/TextInput';
import TextareaInput from '../Inputs/TextareaInput';

import axios from 'axios';
import useAxiosInterface from '../../hooks/useAxiosInterface';
import { createTask } from '../../services/taskApi';
import type { Task, TaskStatus } from '../../types/task';
import { TASK_STATUS } from '../../types/task';
import { showToast } from '../../utils/toast';
import SubmitButton from '../Inputs/SubmitButton';

const AddArea: React.FC = () => {
  const [inputs, setInputs] = useState<Task>({
    title: '',
    description: '',
    status: TASK_STATUS.PENDING,
    due_date: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosInterface = useAxiosInterface();

  const handleChange = (field: keyof Task, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const taskStatusOptions = Object.values(TASK_STATUS).map((status) => ({
    label: status.replace('_', ' '), // optional formatting
    value: status,
  }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const createdTask = await createTask(inputs, axiosInterface);
      if (createdTask.status === 201) {
        showToast({
          message: 'Task created successfully!',
          type: 'success',
          duration: 2000,
        });
      }

      // Reset form
      setInputs({
        title: '',
        description: '',
        status: TASK_STATUS.PENDING,
        due_date: '',
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Failed to create task:',
          error.response?.data?.detail || error.message,
        );
      } else if (error instanceof Error) {
        console.error('Failed to create task:', error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="
          bg-white dark:bg-gray-800
          rounded-2xl
          border border-gray-200 dark:border-gray-700
          shadow-sm
          p-6
          space-y-6
        "
      >
        {/* Title */}
        <TextInput
          label="Title"
          value={inputs.title}
          name="title"
          onChange={(value) => handleChange('title', value)}
          required
        />

        {/* Description */}
        <TextareaInput
          label="Description"
          value={inputs.description}
          onChange={(value) => handleChange('description', value)}
          required
        />

        {/* Grid section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePickerInput
            label="Due Date"
            value={inputs.due_date}
            onChange={(value) => handleChange('due_date', value)}
            required
          />

          <SelectInput
            label="Status"
            name="status"
            value={inputs.status}
            options={taskStatusOptions}
            onChange={(value) => handleChange('status', value as TaskStatus)}
            required
          />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <SubmitButton
            label="Add Task"
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default AddArea;
