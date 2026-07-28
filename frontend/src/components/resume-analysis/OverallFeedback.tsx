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
      className="relative bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-white border border-indigo-100 rounded-3xl p-6 overflow-hidden shadow-sm"
    >
      <div className="relative flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-600 border border-indigo-200 shadow-2xs">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 font-display">Overall AI Feedback</h3>
          <p className="text-xs text-slate-500 font-medium">Gemini AI final verdict</p>
        </div>
      </div>

      <p className="relative text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
        {feedback}
      </p>
    </motion.div>
  );
};

export default OverallFeedback;
