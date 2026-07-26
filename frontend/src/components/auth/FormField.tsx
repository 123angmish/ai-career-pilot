import React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * FormField — layout wrapper pairing a label, any input child, and an error message.
 * Keeps form layouts DRY without coupling to a specific input type.
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  error,
  required,
  className = '',
  children,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-red-500 dark:text-red-400" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
          role="alert"
        >
          <svg className="h-3 w-3 shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM7 5a1 1 0 012 0v3.5a1 1 0 01-2 0V5zm1 6.5a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};
