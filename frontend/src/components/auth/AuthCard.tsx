import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * AuthCard — the focused white/dark card container for form content
 * rendered inside AuthLayout's right-side Outlet.
 */
export const AuthCard: React.FC<AuthCardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`w-full max-w-md mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg dark:shadow-zinc-950/60 p-8 md:p-10 animate-in fade-in slide-in-from-bottom-2 duration-300 ${className}`}
    >
      {children}
    </div>
  );
};
