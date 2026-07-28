import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface SuggestionsCardProps {
  suggestions: string[];
  atsTips?: string[];
  projectImprovements?: string[];
  grammarSuggestions?: string[];
}

interface SectionProps {
  title: string;
  items: string[];
  startIndex?: number;
}

const Section: React.FC<SectionProps> = ({ title, items, startIndex = 0 }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * (startIndex + i) }}
            className="flex gap-3 items-start p-2.5 rounded-2xl bg-amber-50/40 border border-amber-100"
          >
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
            <span className="text-xs text-slate-700 leading-relaxed font-medium">{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export const SuggestionsCard: React.FC<SuggestionsCardProps> = ({
  suggestions,
  atsTips,
  projectImprovements,
  grammarSuggestions,
}) => {
  const hasSomething =
    (suggestions?.length ?? 0) > 0 ||
    (atsTips?.length ?? 0) > 0 ||
    (projectImprovements?.length ?? 0) > 0 ||
    (grammarSuggestions?.length ?? 0) > 0;

  if (!hasSomething) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white border border-amber-200 rounded-3xl p-6 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 shadow-2xs">
          <Lightbulb className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 font-display">AI Recommendations</h3>
          <p className="text-xs text-slate-500 font-medium">Actionable improvements from AI</p>
        </div>
      </div>

      <div className="space-y-5">
        <Section title="General Suggestions" items={suggestions ?? []} startIndex={0} />
        <Section title="ATS Optimization Tips" items={atsTips ?? []} startIndex={suggestions?.length ?? 0} />
        <Section title="Project Improvements" items={projectImprovements ?? []} startIndex={(suggestions?.length ?? 0) + (atsTips?.length ?? 0)} />
        <Section title="Grammar & Language" items={grammarSuggestions ?? []} startIndex={(suggestions?.length ?? 0) + (atsTips?.length ?? 0) + (projectImprovements?.length ?? 0)} />
      </div>
    </motion.div>
  );
};

export default SuggestionsCard;
