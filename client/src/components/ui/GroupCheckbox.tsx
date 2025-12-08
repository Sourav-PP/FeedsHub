/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useController } from "react-hook-form";

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  label?: string;
  options: CheckboxOption[];
  control: any;
  name: string;
  error?: any;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  control,
  name,
  error,
}) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: [],
  });

  const safeValue: string[] = Array.isArray(value) ? value : [];

  const toggle = (val: string) => {
    if (safeValue.includes(val)) {
      onChange(safeValue.filter((v) => v !== val));
    } else {
      onChange([...safeValue, val]);
    }
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-2 font-medium text-gray-700">{label}</label>
      )}

      <div className="flex flex-wrap gap-4">
        {options.map((opt) => {
          const isChecked = safeValue.includes(opt.value);

          return (
            <label key={opt.value} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(opt.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>

      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default CheckboxGroup;
