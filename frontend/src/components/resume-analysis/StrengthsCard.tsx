import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface StrengthsCardProps {
  strengths: string[];
}

export const StrengthsCard: React.FC<StrengthsCardProps> = ({ strengths }) => {
  if (!strengths || strengths.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white border border-emerald-200 rounded-3xl p-6 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-2xs">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 font-display">Resume Strengths</h3>
          <p className="text-xs text-slate-500 font-medium">{strengths.length} strengths found</p>
        </div>
      </div>

      <ul className="space-y-2.5">
        {strengths.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i }}
            className="flex gap-3 items-start p-2.5 rounded-2xl bg-emerald-50/40 border border-emerald-100"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="text-xs text-slate-700 leading-relaxed font-medium">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default StrengthsCard;
