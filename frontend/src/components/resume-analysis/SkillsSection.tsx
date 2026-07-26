import React from 'react';
import { motion } from 'framer-motion';
import { Code2, AlertCircle } from 'lucide-react';

interface SkillsSectionProps {
  skills: string[];
  missingSkills: string[];
}

const SkillBadge: React.FC<{ label: string; type: 'present' | 'missing'; index: number }> = ({ label, type, index }) => (
  <motion.span
    key={label}
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.03 }}
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
      type === 'present'
        ? 'bg-brand-50 dark:bg-brand-950/40 border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300'
        : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400'
    }`}
  >
    {label}
  </motion.span>
);

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, missingSkills }) => {
  return (
    <div className="space-y-6">
      {/* Detected Skills */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            Detected Skills
          </h3>
          <span className="ml-auto text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
            {skills.length}
          </span>
        </div>

        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <SkillBadge key={skill} label={skill} type="present" index={i} />
            ))}
          </div>
        ) : (
          <p className="text-xs text-zinc-400 dark:text-zinc-500">No skills detected.</p>
        )}
      </div>

      {/* Missing Skills */}
      {missingSkills.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-900/40 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
              Missing Key Skills
            </h3>
            <span className="ml-auto text-xs font-bold text-red-500 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded-full">
              {missingSkills.length}
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 leading-relaxed">
            These skills are commonly expected by ATS systems but were not found in your resume.
          </p>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, i) => (
              <SkillBadge key={skill} label={skill} type="missing" index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
