import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const inputId = id || `pwd-input-${Math.random().toString(36).substr(2, 9)}`;

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
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={visible ? 'text' : 'password'}
            className={`block w-full rounded-xl border text-sm py-2.5 pl-3.5 pr-10 transition-all font-medium
              bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2
              ${
                error
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
                  : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'
              } ${className}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            tabIndex={-1}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {error && (
          <p className="mt-1 text-xs font-bold text-rose-600" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="mt-1 text-xs text-slate-500 font-medium">{helperText}</p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
