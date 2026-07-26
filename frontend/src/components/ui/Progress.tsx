import React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0 to 100
  indicatorClassName?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  className = '',
  value = 0,
  indicatorClassName = '',
  ...props
}) => {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className={`relative w-full h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 ${className}`}
      {...props}
    >
      <div
        className={`h-full w-full flex-1 bg-brand-600 dark:bg-brand-500 transition-all duration-300 ${indicatorClassName}`}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
};
