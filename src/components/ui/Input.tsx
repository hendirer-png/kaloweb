import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isFocused?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  isFocused, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-700 ml-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          "text-input",
          isFocused && "text-input-focused",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 ml-1 font-medium">{error}</span>
      )}
    </div>
  );
};
