import { CheckCircle2, Gauge } from 'lucide-react';
import { getMatchStatus } from '../../types/jdMatch';

export function MatchScoreCard({ score }: { score: number }) {
  const status = getMatchStatus(score);
  const tone = score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : score >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400';
  const ring = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
  const dashOffset = 251.2 - (251.2 * Math.max(0, Math.min(100, score))) / 100;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100"><Gauge className="h-4 w-4 text-brand-600" /> Overall match</div>
      <div className="mt-4 flex items-center gap-5">
        <div className="relative h-32 w-32 shrink-0">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-label={`${score}% match score`}>
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" strokeWidth="9" />
            <circle cx="50" cy="50" r="40" fill="none" stroke={ring} strokeWidth="9" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset={dashOffset} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{score}%</span><span className="text-[10px] uppercase tracking-wider text-zinc-500">Match</span></div>
        </div>
        <div><span className={`inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold dark:bg-zinc-800 ${tone}`}><CheckCircle2 className="h-3.5 w-3.5" />{status}</span><p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">Your score reflects skill and keyword coverage against this job description.</p></div>
      </div>
    </section>
  );
}
