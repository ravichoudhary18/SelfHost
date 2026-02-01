import React from 'react';

type TextareaInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  error?: string;
};

const TextareaInput: React.FC<TextareaInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  name,
  rows = 2,
  disabled = false,
  required = false,
  readonly = false,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-white dark:text-darkText">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        readOnly={readonly}
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
      />

      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default TextareaInput;
