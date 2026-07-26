import React from 'react';
import { UploadCloud } from 'lucide-react';

interface EmptyUploadStateProps {
  onClick: () => void;
}

export const EmptyUploadState: React.FC<EmptyUploadStateProps> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm cursor-pointer hover:border-brand-500 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20 transition-all duration-300 select-none group"
    >
      <div className="p-4 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-sm mb-4">
        <UploadCloud className="h-8 w-8" />
      </div>
      <h3 className="text-base font-bold text-zinc-850 dark:text-zinc-50 tracking-tight">
        No active resume found
      </h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm leading-relaxed">
        Upload your professional resume in PDF format to immediately scan it with our AI tools, calculate your ATS matching score, or prep for mock interview panels.
      </p>
      <button className="mt-5 px-4.5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors">
        Upload New Resume
      </button>
    </div>
  );
};

export default EmptyUploadState;
