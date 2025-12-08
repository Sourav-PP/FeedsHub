import React from 'react';
import { type FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  wrapperClassName?: string;
}

const Input: React.FC<InputProps> = ({ label, error, placeholder, className, wrapperClassName,  ...props }) => {
  const inputClasses = `
    w-full 
    rounded-xl 
    bg-gray-200/60 
    px-3 
    py-2 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-400/50 
    ${error ? 'border border-red-500' : 'border border-gray-300'}
    ${className || ''} // Append any extra classes passed in
  `.trim();

  return (
    <div className={`flex flex-col ${wrapperClassName || ''}`}>
      {label && <label className="mb-1 font-medium text-gray-700">{label}</label>}
      <input
        className={inputClasses}
        placeholder={placeholder}
        {...props}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>}
    </div>
  );
};

export default Input;
