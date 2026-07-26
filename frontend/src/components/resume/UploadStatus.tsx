import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadStatusProps {
  status: 'uploaded' | 'ready_for_analysis' | 'ats_ready';
}

export const UploadStatus: React.FC<UploadStatusProps> = ({ status }) => {
  const steps = [
    {
      id: 'uploaded',
      label: 'Resume Uploaded',
      description: 'Stored securely in cloud repository',
      isActive: true,
    },
    {
      id: 'ready_for_analysis',
      label: 'Ready for Analysis',
      description: 'Language parser verified structure',
      isActive: status === 'ready_for_analysis' || status === 'ats_ready',
    },
    {
      id: 'ats_ready',
      label: 'ATS Ready',
      description: 'Formatted and keywords indexed',
      isActive: status === 'ats_ready',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className={`
            p-4.5 rounded-xl border flex items-start gap-3.5 transition-all duration-300
            ${
              step.isActive
                ? 'border-emerald-250 bg-emerald-50/30 dark:border-emerald-850/60 dark:bg-emerald-950/20'
                : 'border-zinc-200 bg-zinc-50/50 dark:border-zinc-800/40 dark:bg-zinc-900/10'
            }
          `}
        >
          {step.isActive ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-450 shrink-0 mt-0.5" />
          ) : (
            <Circle className="h-5 w-5 text-zinc-400 dark:text-zinc-650 shrink-0 mt-0.5" />
          )}

          <div className="space-y-0.5">
            <h4 className={`text-xs font-bold tracking-tight ${
              step.isActive 
                ? 'text-emerald-850 dark:text-emerald-350' 
                : 'text-zinc-500 dark:text-zinc-400'
            }`}>
              {step.label}
            </h4>
            <p className={`text-[10px] ${
              step.isActive 
                ? 'text-emerald-700/80 dark:text-emerald-400/70' 
                : 'text-zinc-400 dark:text-zinc-500'
            }`}>
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default UploadStatus;
