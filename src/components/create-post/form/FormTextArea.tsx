import React, { TextareaHTMLAttributes } from 'react';

interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function FormTextArea({ label, className = '', ...props }: FormTextAreaProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        {...props}
        className={`
          w-full px-4 py-3 bg-gray-50 rounded-xl 
          focus:outline-none focus:ring-2 focus:ring-blue-100 
          transition-all min-h-[100px] resize-none
          ${className}
        `}
      />
    </div>
  );
}