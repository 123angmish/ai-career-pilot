import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface RememberMeCheckboxProps {
  registration?: UseFormRegisterReturn;
  label?: string;
  id?: string;
}

/**
 * RememberMeCheckbox — styled checkbox wired to react-hook-form register().
 * Also works as an uncontrolled input without registration.
 */
export const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({
  registration,
  label = 'Remember me',
  id = 'remember-me',
}) => {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2.5 group cursor-pointer select-none w-fit"
    >
      <div className="relative flex items-center">
        <input
          id={id}
          type="checkbox"
          className="peer h-4 w-4 rounded border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-brand-600 dark:text-brand-500 focus:ring-brand-500 focus:ring-1 focus:ring-offset-1 dark:focus:ring-offset-zinc-900 cursor-pointer transition-colors accent-brand-600"
          {...registration}
        />
      </div>
      <span className="text-xs text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
        {label}
      </span>
    </label>
  );
};
