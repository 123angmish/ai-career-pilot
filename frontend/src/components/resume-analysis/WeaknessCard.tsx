import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, AlertTriangle } from 'lucide-react';

interface WeaknessCardProps {
  weaknesses: string[];
}

export const WeaknessCard: React.FC<WeaknessCardProps> = ({ weaknesses }) => {
  if (!weaknesses || weaknesses.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-900/40 rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Resume Weaknesses</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{weaknesses.length} issues identified</p>
        </div>
      </div>

      <ul className="space-y-2.5">
        {weaknesses.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i }}
            className="flex gap-3 items-start"
          >
            <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
            <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-snug">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default WeaknessCard;
