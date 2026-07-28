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
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
      type === 'present'
        ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
        : 'bg-rose-50 border-rose-200 text-rose-700'
    }`}
  >
    {label}
  </motion.span>
);

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, missingSkills }) => {
  return (
    <div className="space-y-6">
      {/* Detected Skills */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Code2 className="h-4 w-4" />
          </div>
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-display">
            Detected Skills
          </h3>
          <span className="ml-auto text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
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
          <p className="text-xs text-slate-400 font-medium">No skills detected.</p>
        )}
      </div>

      {/* Missing Skills */}
      {missingSkills.length > 0 && (
        <div className="bg-white border border-rose-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
              <AlertCircle className="h-4 w-4" />
            </div>
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-display">
              Missing Key Skills
            </h3>
            <span className="ml-auto text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              {missingSkills.length}
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-3 leading-relaxed font-medium">
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
