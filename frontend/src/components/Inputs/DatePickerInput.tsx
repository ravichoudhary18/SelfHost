import React from 'react';

type DatePickerInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  value,
  onChange,
  name,
  disabled = false,
  required = false,
  readonly = false,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-white dark:text-darkText">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        type="date"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        readOnly={readonly}
        required={required}
        className="
          rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none
          bg-card text-white placeholder-gray-400
          dark:bg-darkCard dark:text-darkText dark:border-gray-600 dark:placeholder-gray-500
          focus:ring-2 focus:ring-primary transition
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      />
    </div>
  );
};

export default DatePickerInput;
