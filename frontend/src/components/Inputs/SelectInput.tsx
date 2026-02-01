import React from 'react';

type SelectInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  name?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  options,
  name,
  disabled = false,
  required = false,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-white dark:text-darkText">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <select
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={`
          rounded-xl border px-3 py-2 text-sm outline-none transition
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'}
          bg-card text-white placeholder-gray-400
          dark:border-gray-600 dark:bg-darkCard dark:text-darkText dark:placeholder-gray-500
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:ring-2
        `}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default SelectInput;
