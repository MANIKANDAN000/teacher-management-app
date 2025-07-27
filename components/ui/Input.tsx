// src/components/ui/Input.tsx
'use client';

import React from 'react';

// Define the properties (props) the input can accept
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string; // Optional error message for validation
}

const Input: React.FC<InputProps> = ({ label, id, error, ...props }) => {
  // Conditionally apply error styles if an error message is provided
  const errorStyles = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-primary focus:border-primary';

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          className={`block w-full rounded-md shadow-sm sm:text-sm transition-colors duration-200 ${errorStyles}`}
          {...props}
        />
      </div>
      {/* If an error exists, display the error message below the input */}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;