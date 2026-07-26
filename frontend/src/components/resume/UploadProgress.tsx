import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadProgressProps {
  fileName: string;
  progress: number;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({ fileName, progress }) => {
  return (
    <div className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <Loader2 className="h-4.5 w-4.5 text-brand-650 dark:text-brand-450 animate-spin shrink-0" />
          <div className="overflow-hidden">
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block truncate">
              Uploading {fileName}
            </span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-450 block mt-0.5">
              Attaching metadata and transferring to cloud storage...
            </span>
          </div>
        </div>
        <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
          {progress}%
        </span>
      </div>

      <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-brand-500 to-indigo-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
};

export default UploadProgress;
