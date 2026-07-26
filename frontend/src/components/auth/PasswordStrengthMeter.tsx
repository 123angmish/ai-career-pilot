import React, { useMemo } from 'react';

interface StrengthLevel {
  label: string;
  color: string;
  bg: string;
  segments: number;
}

const LEVELS: StrengthLevel[] = [
  { label: 'Too short', color: 'text-zinc-400 dark:text-zinc-500', bg: 'bg-zinc-200 dark:bg-zinc-700', segments: 0 },
  { label: 'Weak',      color: 'text-red-500 dark:text-red-400',   bg: 'bg-red-500',     segments: 1 },
  { label: 'Fair',      color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500', segments: 2 },
  { label: 'Good',      color: 'text-yellow-500 dark:text-yellow-400', bg: 'bg-yellow-500', segments: 3 },
  { label: 'Strong',    color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500', segments: 4 },
];

interface Criterion {
  label: string;
  met: boolean;
}

function getStrength(password: string): { level: number; criteria: Criterion[] } {
  const criteria: Criterion[] = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Uppercase letter (A-Z)',  met: /[A-Z]/.test(password) },
    { label: 'Number (0-9)',            met: /[0-9]/.test(password) },
    { label: 'Special character (!@#$…)', met: /[^A-Za-z0-9]/.test(password) },
  ];

  if (password.length === 0) return { level: 0, criteria };

  const met = criteria.filter((c) => c.met).length;
  const level = password.length < 8 ? 1 : Math.min(met + 1, 4);

  return { level, criteria };
}

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const { level, criteria } = useMemo(() => getStrength(password), [password]);

  if (!password) return null;

  const current = LEVELS[level];

  return (
    <div className="mt-2 space-y-2 animate-in fade-in duration-200">
      {/* Segment bar */}
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4].map((seg) => (
          <div
            key={seg}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              seg <= current.segments ? current.bg : 'bg-zinc-200 dark:bg-zinc-700'
            }`}
          />
        ))}
        <span className={`text-xs font-medium ml-1 shrink-0 transition-colors ${current.color}`}>
          {current.label}
        </span>
      </div>

      {/* Criteria checklist */}
      <ul className="space-y-0.5">
        {criteria.map((c) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <span
              className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[10px] transition-colors ${
                c.met
                  ? 'bg-emerald-500 text-white'
                  : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500'
              }`}
            >
              {c.met ? '✓' : '·'}
            </span>
            <span
              className={`text-xs transition-colors ${
                c.met
                  ? 'text-zinc-700 dark:text-zinc-300'
                  : 'text-zinc-400 dark:text-zinc-500'
              }`}
            >
              {c.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
