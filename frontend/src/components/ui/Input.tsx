import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, type = 'text', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative rounded-xl shadow-2xs">
          <input
            id={inputId}
            ref={ref}
            type={type}
            className={`block w-full rounded-xl border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500 text-sm py-2.5 px-3.5 focus:outline-none focus:ring-2 border transition-all font-medium ${
              error
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
                : 'border-slate-200 hover:border-slate-300'
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-xs font-bold text-rose-600" id={`${inputId}-error`}>
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="mt-1 text-xs text-slate-500 font-medium">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
