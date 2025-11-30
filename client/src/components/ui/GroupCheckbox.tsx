import React from 'react';
import { type FieldError, type UseFormRegister } from 'react-hook-form';

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  label?: string;
  options: CheckboxOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  name: string;
  error?: FieldError;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, options, register, name, error }) => {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-2 font-medium text-gray-700">{label}</label>}
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={opt.value}
              {...register(name)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>}
    </div>
  );
};

export default CheckboxGroup;
