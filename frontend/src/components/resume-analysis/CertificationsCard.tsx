import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface CertificationsCardProps {
  certifications?: string[];
}

export const CertificationsCard: React.FC<CertificationsCardProps> = ({ certifications }) => {
  if (!certifications || certifications.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="bg-white dark:bg-zinc-900 border border-violet-200 dark:border-violet-900/40 rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center">
          <Award className="h-4 w-4 text-violet-600 dark:text-violet-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Recommended Certifications</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Credentials that will boost your profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.04 * i }}
            className="flex items-start gap-2.5 p-3 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/30"
          >
            <div className="mt-0.5 h-5 w-5 rounded-full bg-violet-200 dark:bg-violet-800/60 flex items-center justify-center text-violet-700 dark:text-violet-300 text-xs font-bold shrink-0">
              {i + 1}
            </div>
            <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-snug">{cert}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CertificationsCard;
