import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import React from 'react';

interface PhoneInputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  label?: string;
  error?: string;
}

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({ control, name, label, error }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <div className="flex flex-col w-full">
        {label && <label className="mb-1 font-medium text-gray-700">{label}</label>}
        <PhoneInput
          country="in"
          value={field.value}
          onChange={field.onChange}
          inputProps={{
            name: field.name,
            required: true,
          }}
          containerStyle={{ width: '100%' }}
          inputStyle={{
            width: '100%',
            backgroundColor: '#e5e7eb99', // matches bg-gray-200/60
            padding: '1.25rem 3rem', // px-3 py-2
            border: 'none',
            borderRadius: '0.6rem',
            outline: 'none',
            fontSize: '1rem',
          }}
          buttonStyle={{
            borderRadius: '0.6rem 0 0 0.6rem', // rounded-l-xl
            border: '1px solid #d1d5db',
            backgroundColor: '#e5e7eb99',
          }}
          dropdownStyle={{
            backgroundColor: '#fff',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
          }}
        />
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    )}
  />
);

export default PhoneInputField;
