import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText,
  RefreshCw,
  AlertCircle,
  Loader2,
  Upload,
  FileCheck,
  ArrowRight,
  Brain,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { resumeAnalysisService } from '../services/resumeAnalysis.service';
import { ATSScoreCard } from '../components/resume-analysis/ATSScoreCard';
import { SkillsSection } from '../components/resume-analysis/SkillsSection';
import { StrengthsCard } from '../components/resume-analysis/StrengthsCard';
import { WeaknessCard } from '../components/resume-analysis/WeaknessCard';
import { SuggestionsCard } from '../components/resume-analysis/SuggestionsCard';
import { HiringRecommendation } from '../components/resume-analysis/HiringRecommendation';
import { OverallFeedback } from '../components/resume-analysis/OverallFeedback';

// ─── Skeleton Loader ─────────────────────────────────────────────────────────
const AnalysisSkeleton: React.FC = () => (
  <div className="space-y-6 shimmer">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="h-72 rounded-3xl bg-white/5 border border-white/10" />
      <div className="lg:col-span-2 space-y-4 p-6 rounded-3xl bg-white/5 border border-white/10">
        <div className="h-10 w-1/3 rounded-xl bg-white/10" />
        <div className="h-4 w-full rounded-lg bg-white/5" />
        <div className="h-4 w-5/6 rounded-lg bg-white/5" />
        <div className="h-4 w-4/6 rounded-lg bg-white/5" />
      </div>
    </div>
    {[...Array(3)].map((_, i) => (
      <div key={i} className="h-48 rounded-3xl bg-white/5 border border-white/10" />
    ))}
  </div>
);

// ─── Error State ─────────────────────────────────────────────────────────────
const ErrorState: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-3xl border border-rose-500/20 p-8">
    <div className="h-14 w-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-4">
      <AlertCircle className="h-7 w-7 text-rose-400" />
    </div>
    <h3 className="text-lg font-bold text-white mb-1 font-display">Analysis Failed</h3>
    <p className="text-sm text-zinc-400 max-w-sm mb-6">{message}</p>
    <Button variant="outline" onClick={onRetry} className="border-white/10 bg-white/5 text-white">
      <RefreshCw className="h-4 w-4 mr-2" />
      Try Again
    </Button>
  </div>
);

// ─── Empty State ─────────────────────────────────────────────────────────────
const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-3xl border border-white/10 p-8">
    <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/10">
      <FileCheck className="h-8 w-8 text-indigo-400" />
    </div>
    <h3 className="text-xl font-extrabold text-white mb-2 font-display">No Resume Analyzed Yet</h3>
    <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
      Upload your resume first to get a detailed AI-powered analysis with ATS score, skill gaps, and career recommendations.
    </p>
    <Link to="/resumes/upload">
      <Button variant="primary" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-extrabold rounded-xl shadow-lg shadow-indigo-500/25">
        <Upload className="h-4 w-4 mr-2" />
        Upload Resume
      </Button>
    </Link>
  </div>
);

// ─── Resume Text Preview ──────────────────────────────────────────────────────
const ExtractedTextPreview: React.FC<{ text: string }> = ({ text }) => {
  const [expanded, setExpanded] = React.useState(false);
  const preview = text.slice(0, 400);

  return (
    <div className="glass-card rounded-3xl border border-white/10 p-6">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="h-4 w-4 text-indigo-400" />
        <h3 className="text-xs font-extrabold text-indigo-200 uppercase tracking-widest">
          Extracted Resume Content
        </h3>
      </div>
      <div className="relative">
        <pre className="text-xs text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed bg-black/40 rounded-2xl p-4 overflow-hidden border border-white/10">
          {expanded ? text : preview + (text.length > 400 ? '…' : '')}
        </pre>
        {text.length > 400 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-semibold"
          >
            {expanded ? <><ChevronUp className="h-3.5 w-3.5" />Show less</> : <><ChevronDown className="h-3.5 w-3.5" />Show full text</>}
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────
export const ResumeAnalysis: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const {
    data: analysis,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['resume-analysis'],
    queryFn: () => resumeAnalysisService.analyzeResume(),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const errorMessage = (() => {
    const err = error as any;
    const msg = err?.response?.data?.message || err?.message || '';
    if (msg.toLowerCase().includes('resume not found') || err?.response?.status === 403) {
      return '__NO_RESUME__';
    }
    return msg || 'Something went wrong. Please try again.';
  })();

  const showNoResume = isError && errorMessage === '__NO_RESUME__';
  const showError = isError && errorMessage !== '__NO_RESUME__';

  return (
    <div className="space-y-6 pb-12">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Brain className="h-5 w-5 animate-pulse" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight font-display">
              AI Resume Analysis
            </h1>
          </div>
          <p className="text-sm text-zinc-400 font-normal">
            Powered by Gemini AI — ATS score, skill gaps, strengths & career recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            id="btn-re-analyze"
            className="border-white/10 bg-white/5 hover:bg-white/10 text-zinc-200 rounded-xl"
          >
            {isFetching ? (
              <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5 mr-1.5 text-indigo-400" />
            )}
            {isFetching ? 'Analyzing…' : 'Re-analyze'}
          </Button>

          <Link to="/resumes/jd-match">
            <Button size="sm" id="btn-jd-match" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold rounded-xl shadow-lg shadow-indigo-500/25">
              JD Matcher
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Loading ── */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-3 p-4 mb-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium backdrop-blur-xl">
              <Loader2 className="h-4 w-4 animate-spin shrink-0 text-indigo-400" />
              <span>Gemini AI is analyzing your resume. Generating ATS breakdown…</span>
            </div>
            <AnalysisSkeleton />
          </motion.div>
        )}

        {/* ── No Resume ── */}
        {showNoResume && (
          <motion.div key="no-resume" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <EmptyState />
          </motion.div>
        )}

        {/* ── Error ── */}
        {showError && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ErrorState message={errorMessage} onRetry={() => refetch()} />
          </motion.div>
        )}

        {/* ── Analysis Results ── */}
        {analysis && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            ref={printRef}
            id="analysis-results"
            className="space-y-6"
          >
            {/* Row 1: ATS Score + Hiring Recommendation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ATSScoreCard score={analysis.atsScore} />
              <div className="lg:col-span-2 flex flex-col gap-6">
                <HiringRecommendation
                  recommendation={
                    analysis.atsScore >= 80
                      ? 'Strong Hire — This candidate demonstrates excellent technical skills and strong ATS optimization. Highly recommended for interviews.'
                      : analysis.atsScore >= 60
                      ? 'Consider — The candidate has solid foundational skills but the resume needs targeted improvement to fully pass ATS screening.'
                      : 'Needs Improvement — Resume requires significant enhancement to meet ATS standards. Focus on keyword optimization and skill gap filling.'
                  }
                  professionalSummary={analysis.aiReview?.professionalSummary}
                />
              </div>
            </div>

            {/* Row 2: Skills */}
            <SkillsSection skills={analysis.skills} missingSkills={analysis.missingSkills} />

            {/* Row 3: Strengths + Weaknesses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StrengthsCard strengths={analysis.aiReview?.strengths ?? []} />
              <WeaknessCard weaknesses={analysis.aiReview?.weaknesses ?? []} />
            </div>

            {/* Row 4: AI Suggestions */}
            <SuggestionsCard
              suggestions={analysis.suggestions}
              atsTips={analysis.aiReview?.atsTips}
              projectImprovements={analysis.aiReview?.projectImprovements}
              grammarSuggestions={analysis.aiReview?.grammarSuggestions}
            />

            {/* Row 5: Overall AI Feedback */}
            <OverallFeedback
              feedback={
                analysis.aiReview?.professionalSummary
                  ? `Professional Summary: ${analysis.aiReview.professionalSummary}\n\nBased on a comprehensive analysis of your resume, your ATS score is ${analysis.atsScore}/100. ${analysis.aiReview.strengths?.length ? `Key strengths include: ${analysis.aiReview.strengths.slice(0, 2).join(', ')}.` : ''} ${analysis.aiReview.weaknesses?.length ? `Areas to improve: ${analysis.aiReview.weaknesses.slice(0, 2).join(', ')}.` : ''}`
                  : `Your resume received an ATS score of ${analysis.atsScore}/100. ${analysis.suggestions.slice(0, 3).join(' ')}`
              }
            />

            {/* Row 6: Extracted Text (Collapsed) */}
            {analysis.extractedText && (
              <ExtractedTextPreview text={analysis.extractedText} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeAnalysis;
