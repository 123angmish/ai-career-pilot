import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Code, Copy, HelpCircle, Lightbulb, Loader2, User, Bookmark, Check, Search, Sparkles, Filter, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { aiService, getResumeContext, type InterviewResult } from '../services/ai.service';

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-2.5 font-bold text-sm text-slate-900">
          {icon}
          {title}
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
      </button>
      {open && <div className="p-5 space-y-4">{children}</div>}
    </div>
  );
};

const QuestionCard: React.FC<{ q: string; answer?: string; extra?: React.ReactNode; indexNum?: number }> = ({ q, answer, extra, indexNum }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`Q: ${q}\nA: ${answer ?? ''}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-slate-200 p-4 space-y-3 bg-slate-50/50 hover:border-indigo-200 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          {indexNum && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 shrink-0 mt-0.5 font-mono">
              Q{indexNum}
            </span>
          )}
          <p className="text-sm font-semibold text-slate-900 leading-snug">{q}</p>
        </div>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`p-1 rounded-md transition-colors shrink-0 ${bookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'}`}
          title={bookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
        >
          <Bookmark className="h-4 w-4 fill-current" />
        </button>
      </div>

      {extra}

      <div className="flex items-center gap-3 pt-1 border-t border-slate-100">
        {answer && (
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            {showAnswer ? 'Hide Solution' : 'Reveal Model Answer'}
          </button>
        )}
        <button
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-slate-600 ml-auto flex items-center gap-1 cursor-pointer"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <AnimatePresence>
        {showAnswer && answer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-slate-800 bg-white rounded-xl p-4 leading-relaxed font-sans border border-slate-200 shadow-inner whitespace-pre-wrap"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const InterviewQuestions: React.FC = () => {
  const [jobRole, setJobRole] = useState(() => {
    try {
      const profileExt = JSON.parse(localStorage.getItem('cp_profile_ext') || '{}');
      const uploadedResume = JSON.parse(localStorage.getItem('cp_uploaded_resume') || '{}');
      return profileExt.currentRole || uploadedResume.targetRole || 'Software Engineer';
    } catch {
      return 'Software Engineer';
    }
  });
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<InterviewResult | null>(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'TECH' | 'HR' | 'CODING'>('ALL');

  const resumeCtx = getResumeContext();

  const handleGenerate = async () => {
    if (!jobRole.trim()) return;
    setIsGenerating(true);
    setError('');
    setResult(null);
    try {
      const data = await aiService.generateInterviewQuestions({
        jobRole: jobRole.trim(),
        experienceLevel,
      });
      setResult(data);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Failed to generate questions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const filterQuestions = <T extends { question: string }>(items: T[]) => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter((item) => item.question.toLowerCase().includes(q));
  };

  const totalCount = result
    ? (result.technicalQuestions?.length || 0) + (result.hrQuestions?.length || 0) + (result.codingQuestions?.length || 0)
    : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            AI Resume-Tailored Question Bank
          </h1>
        </div>
        <p className="text-slate-500 mt-1 text-sm font-medium">
          Generates technical, behavioral, and practical questions tailored directly to your uploaded resume & target role.
        </p>
      </div>

      {resumeCtx && (
        <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between text-xs text-indigo-700 font-bold">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-indigo-600" />
            <span>Active Resume Profile Loaded: <strong>{resumeCtx}</strong></span>
          </div>
          <span className="px-2.5 py-0.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase">
            Auto-Synced
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Config */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-base font-extrabold font-display">Target Role & Level</CardTitle>
              <CardDescription className="text-xs">Questions will be generated for your resume skills.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Job Role *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Data Analyst, Fullstack Engineer"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white text-slate-900 text-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white text-slate-900 text-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option>Fresher / Graduate</option>
                  <option>Junior (1-2 yrs)</option>
                  <option>Mid-Level (3-5 yrs)</option>
                  <option>Senior (5-8 yrs)</option>
                  <option>Lead / Architect (8+ yrs)</option>
                </select>
              </div>

              <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 text-xs text-indigo-700 flex items-center gap-2 font-medium">
                <Sparkles className="h-4 w-4 shrink-0 text-indigo-600" />
                <span>Uses your uploaded resume skills & experience for authentic question modeling.</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="primary"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
                disabled={!jobRole.trim() || isGenerating}
                isLoading={isGenerating}
                onClick={handleGenerate}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating Resume Questions…' : 'Generate Resume Questions'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-2 space-y-6">
          {isGenerating && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold animate-pulse border border-indigo-100">
              <Loader2 className="h-4 w-4 animate-spin shrink-0" />
              <span>AI is analyzing your resume profile and preparing technical, HR, and coding questions for {jobRole}...</span>
            </div>
          )}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 font-medium">
              {error}
            </div>
          )}
          {!result && !isGenerating && !error && (
            <Card className="border-slate-200">
              <CardContent className="flex flex-col items-center justify-center py-24 text-center">
                <div className="h-14 w-14 rounded-full border border-slate-200 flex items-center justify-center bg-slate-50 mb-3">
                  <HelpCircle className="h-6 w-6 text-slate-400" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm font-display">Resume Question Engine Ready</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed font-medium">
                  Click 'Generate Resume Questions' to get technical, HR, and coding questions tailored to your active resume.
                </p>
              </CardContent>
            </Card>
          )}

          {result && !isGenerating && (
            <div className="space-y-6">
              {/* Header Info & Search Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 font-display">
                    <span>{totalCount} Questions Tailored</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                      {jobRole}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Filtered by your resume tech stack and target role.</p>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('ALL')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'ALL'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Questions ({totalCount})
                </button>
                <button
                  onClick={() => setActiveTab('TECH')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    activeTab === 'TECH'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Filter className="h-3 w-3" /> Technical ({result.technicalQuestions?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('HR')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    activeTab === 'HR'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <User className="h-3 w-3" /> Behavioral & HR ({result.hrQuestions?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('CODING')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    activeTab === 'CODING'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Code className="h-3 w-3" /> Coding / SQL ({result.codingQuestions?.length || 0})
                </button>
              </div>

              {/* Render Question Cards */}
              {(activeTab === 'ALL' || activeTab === 'TECH') && (result.technicalQuestions?.length > 0) && (
                <Section title={`Technical Questions (${filterQuestions(result.technicalQuestions).length})`} icon={<HelpCircle className="h-5 w-5 text-indigo-600" />}>
                  {filterQuestions(result.technicalQuestions).map((q, i) => (
                    <QuestionCard key={i} indexNum={i + 1} q={q.question} answer={q.answer} />
                  ))}
                </Section>
              )}

              {(activeTab === 'ALL' || activeTab === 'HR') && (result.hrQuestions?.length > 0) && (
                <Section title={`Behavioral & HR Questions (${filterQuestions(result.hrQuestions).length})`} icon={<User className="h-5 w-5 text-purple-600" />}>
                  {filterQuestions(result.hrQuestions).map((q, i) => (
                    <QuestionCard key={i} indexNum={i + 1} q={q.question} answer={q.answer} />
                  ))}
                </Section>
              )}

              {(activeTab === 'ALL' || activeTab === 'CODING') && (result.codingQuestions?.length > 0) && (
                <Section title={`Coding, SQL & Practical Questions (${filterQuestions(result.codingQuestions).length})`} icon={<Code className="h-5 w-5 text-emerald-600" />}>
                  {filterQuestions(result.codingQuestions).map((q, i) => (
                    <QuestionCard
                      key={i}
                      indexNum={i + 1}
                      q={q.question}
                      answer={q.solution}
                      extra={q.approach ? <p className="text-xs text-slate-600 italic bg-slate-100 p-2 rounded-lg font-medium">Approach: {q.approach}</p> : undefined}
                    />
                  ))}
                </Section>
              )}

              {result.interviewTips?.length > 0 && (
                <Section title="Pro Resume Interview Strategy Tips" icon={<Lightbulb className="h-5 w-5 text-amber-500" />}>
                  <ul className="space-y-2">
                    {result.interviewTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <span className="mt-1 h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestions;
