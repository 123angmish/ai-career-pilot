import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ArrowRight, BrainCircuit, CalendarClock, FileText, Loader2, RefreshCw, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { JobDescriptionInput } from '../components/jd-match/JobDescriptionInput';
import { MatchScoreCard } from '../components/jd-match/MatchScoreCard';
import { SkillAnalysis } from '../components/jd-match/SkillAnalysis';
import { MatchCharts } from '../components/jd-match/MatchCharts';
import { CompatibilityCards } from '../components/jd-match/CompatibilityCards';
import { RecommendationCard } from '../components/jd-match/RecommendationCard';
import { HiringProbability } from '../components/jd-match/HiringProbability';
import { OverallSummary } from '../components/jd-match/OverallSummary';
import { useJDMatch } from '../hooks/useJDMatch';
import { resumeService } from '../services/resume.service';

const MINIMUM_JD_LENGTH = 80;

function ResultSkeleton() {
  return <div className="space-y-5 animate-pulse"><div className="grid gap-5 lg:grid-cols-3"><div className="h-48 rounded-2xl bg-zinc-200 dark:bg-zinc-800" /><div className="lg:col-span-2 h-48 rounded-2xl bg-zinc-200 dark:bg-zinc-800" /></div><div className="h-64 rounded-2xl bg-zinc-200 dark:bg-zinc-800" /></div>;
}

function getErrorMessage(error: unknown) {
  if (typeof error === 'object' && error && 'response' in error) {
    const response = error.response;
    if (typeof response === 'object' && response && 'data' in response) {
      const data = response.data;
      if (typeof data === 'object' && data && 'message' in data && typeof data.message === 'string') return data.message;
    }
  }
  return error instanceof Error ? error.message : 'Unable to analyze this job description. Please try again.';
}

export const JdMatch: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [validationError, setValidationError] = useState('');
  const { data: resume, isLoading: isLoadingResume } = useQuery({ queryKey: ['myResume'], queryFn: () => resumeService.getMyResume() });
  const matchMutation = useJDMatch();
  const result = matchMutation.data;

  const analyze = () => {
    const text = jobDescription.trim();
    if (!text) { setValidationError('Add a job description to begin.'); return; }
    if (text.length < MINIMUM_JD_LENGTH) { setValidationError(`Use at least ${MINIMUM_JD_LENGTH} characters for a useful analysis.`); return; }
    if (!resume) return;
    setValidationError('');
    matchMutation.mutate({ resumeId: resume.id, jobDescription: text });
  };

  return <div className="mx-auto max-w-7xl space-y-6 pb-10">
    <header className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
      <div><div className="flex items-center gap-2"><div className="rounded-lg bg-brand-100 p-2 text-brand-700 dark:bg-brand-950 dark:text-brand-300"><BrainCircuit className="h-5 w-5" /></div><h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Job Description Match</h1></div><p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Compare your active resume with a role and get targeted, AI-powered application guidance.</p>{result && <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400"><CalendarClock className="h-3.5 w-3.5" />Last analyzed {new Date(result.analyzedAt).toLocaleString()}</p>}</div>
      <Button onClick={analyze} isLoading={matchMutation.isPending} disabled={!resume || isLoadingResume} className="shrink-0"><BrainCircuit className="mr-1.5 h-4 w-4" />{matchMutation.isPending ? 'Analyzing…' : 'Analyze match'}</Button>
    </header>

    {isLoadingResume ? <ResultSkeleton /> : !resume ? <section className="rounded-2xl border border-zinc-200 bg-white px-6 py-16 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900"><FileText className="mx-auto h-9 w-9 text-zinc-400" /><h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Upload a resume first</h2><p className="mx-auto mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400">The matcher needs an active resume to compare against the job description.</p><Link to="/resumes/upload" className="mt-5 inline-block"><Button><Upload className="mr-1.5 h-4 w-4" />Upload resume</Button></Link></section> : <>
      <JobDescriptionInput value={jobDescription} onChange={(value) => { setJobDescription(value); if (validationError) setValidationError(''); }} error={validationError} />
      <AnimatePresence mode="wait">
        {matchMutation.isPending && <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="mb-4 flex items-center gap-2 rounded-xl border border-brand-100 bg-brand-50 p-3 text-sm text-brand-700 dark:border-brand-900/40 dark:bg-brand-950/30 dark:text-brand-300"><Loader2 className="h-4 w-4 animate-spin" />Comparing your resume to the job requirements…</div><ResultSkeleton /></motion.div>}
        {matchMutation.isError && <motion.section key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/20"><div className="flex items-start gap-3"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" /><div><h2 className="font-semibold text-red-900 dark:text-red-200">Analysis failed</h2><p className="mt-1 text-sm text-red-700 dark:text-red-300">{getErrorMessage(matchMutation.error)}</p><Button variant="outline" size="sm" className="mt-3" onClick={analyze}><RefreshCw className="mr-1.5 h-3.5 w-3.5" />Try again</Button></div></div></motion.section>}
        {result && !matchMutation.isPending && <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5"><div className="grid gap-5 lg:grid-cols-3"><MatchScoreCard score={result.matchPercentage} /><div className="lg:col-span-2"><MatchCharts matchedCount={result.matchedKeywords.length} missingCount={result.missingKeywords.length} score={result.matchPercentage} /></div></div><SkillAnalysis matched={result.matchedKeywords} missing={result.missingKeywords} /><CompatibilityCards /><div className="grid gap-5 lg:grid-cols-3"><div className="lg:col-span-2"><RecommendationCard suggestions={result.tailoringSuggestions} gaps={result.gaps} /></div><HiringProbability score={result.matchPercentage} /></div><OverallSummary result={result} /><div className="flex justify-end"><button onClick={() => document.querySelector('textarea')?.focus()} className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline dark:text-brand-300">Refine description <ArrowRight className="h-4 w-4" /></button></div></motion.div>}
      </AnimatePresence>
    </>}
  </div>;
};

export default JdMatch;
