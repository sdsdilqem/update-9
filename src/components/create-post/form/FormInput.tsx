import React, { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  prefix?: string;
}

export default function FormInput({ label, prefix, className = '', ...props }: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-3 text-gray-500 font-medium">
            {prefix}
          </span>
        )}
        <input
          {...props}
          className={`
            w-full px-4 py-3 bg-gray-50 rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-blue-100 
            transition-all
            ${prefix ? 'pl-12' : ''}
            ${className}
          `}
        />
      </div>
    </div>
  );
}