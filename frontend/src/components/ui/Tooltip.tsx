import React, { useState } from 'react';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-zinc-900 dark:border-t-zinc-850',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-zinc-900 dark:border-b-zinc-850',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-zinc-900 dark:border-l-zinc-850',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-zinc-900 dark:border-r-zinc-850',
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 px-2 py-1.5 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-800 rounded shadow-sm whitespace-nowrap pointer-events-none select-none border border-zinc-800 dark:border-zinc-700 ${positionClasses[position]}`}
          role="tooltip"
        >
          {content}
          <div
            className={`absolute border-4 border-transparent ${arrowClasses[position]}`}
          />
        </div>
      )}
    </div>
  );
};
