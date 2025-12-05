import React from 'react';
import { type FieldError } from 'react-hook-form';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: FieldError;
}

const Textarea: React.FC<TextAreaProps> = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <textarea
        className="w-full border p-2 rounded min-h-[120px] bg-white text-black"
        {...props}
      ></textarea>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Textarea;
