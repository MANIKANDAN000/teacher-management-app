// src/components/ui/Alert.tsx
'use client';

import React from 'react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const baseStyles = 'rounded-md p-4 text-sm animate-fadeIn';
  
  const variantStyles = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  };

  const Icon = () => {
    if (type === 'success') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className={`${baseStyles} ${variantStyles[type]}`} role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon />
        </div>
        <div className="ml-3">
          <p className="font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;