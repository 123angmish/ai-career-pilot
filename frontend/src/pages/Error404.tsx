import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Error404: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 select-none">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-extrabold text-brand-600 dark:text-brand-500 tracking-widest">
          404
        </h1>
        <div className="bg-brand-500 text-white px-2 text-sm rounded rotate-12 inline-block absolute -translate-y-12">
          Page Not Found
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-4">
          Lost in transit
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 mb-6">
          The page you are looking for does not exist, has been removed, or has had its name changed.
        </p>
        <Link to="/dashboard">
          <Button variant="primary">Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};
export default Error404;
