import React from 'react';
import { Button } from '../components/ui/Button';

export const Error500: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 select-none">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-extrabold text-red-600 dark:text-red-500 tracking-widest">
          500
        </h1>
        <div className="bg-red-500 text-white px-2 text-sm rounded rotate-12 inline-block absolute -translate-y-12">
          Server Error
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-4">
          Internal connection error
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 mb-6">
          Our servers are experiencing an unexpected issue. Please try reloading the page or contact support if the issue persists.
        </p>
        <Button variant="primary" onClick={handleReload}>
          Reload Application
        </Button>
      </div>
    </div>
  );
};
export default Error500;
