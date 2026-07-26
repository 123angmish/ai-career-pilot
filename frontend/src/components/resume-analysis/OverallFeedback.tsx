import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface OverallFeedbackProps {
  feedback: string;
}

export const OverallFeedback: React.FC<OverallFeedbackProps> = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="relative bg-gradient-to-br from-brand-50 to-violet-50 dark:from-brand-950/30 dark:to-violet-950/20 border border-brand-200 dark:border-brand-800/60 rounded-2xl p-6 overflow-hidden shadow-sm"
    >
      {/* Background glow */}
      <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-brand-300/20 dark:bg-brand-600/10 blur-2xl" />

      <div className="relative flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-brand-600 dark:text-brand-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Overall AI Feedback</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Gemini AI final verdict</p>
        </div>
      </div>

      <p className="relative text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
        {feedback}
      </p>
    </motion.div>
  );
};

export default OverallFeedback;
