import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Code, Copy, HelpCircle, Lightbulb, Loader2, User, Bookmark, Check, Search, Sparkles, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { aiService, type InterviewResult } from '../services/ai.service';

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-zinc-50 dark:bg-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-2.5 font-bold text-sm text-zinc-900 dark:text-zinc-50">
          {icon}
          {title}
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-zinc-500" /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
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
      className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-3 bg-zinc-50/50 dark:bg-zinc-900/50 hover:border-brand-200 dark:hover:border-brand-900/60 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          {indexNum && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shrink-0 mt-0.5">
              Q{indexNum}
            </span>
          )}
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">{q}</p>
        </div>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`p-1 rounded-md transition-colors shrink-0 ${bookmarked ? 'text-amber-500' : 'text-zinc-400 hover:text-zinc-600'}`}
          title={bookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
        >
          <Bookmark className="h-4 w-4 fill-current" />
        </button>
      </div>

      {extra}

      <div className="flex items-center gap-3 pt-1 border-t border-zinc-100 dark:border-zinc-800">
        {answer && (
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            {showAnswer ? 'Hide Solution' : 'Reveal Model Answer'}
          </button>
        )}
        <button
          onClick={handleCopy}
          className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 ml-auto flex items-center gap-1"
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
            className="text-xs text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800/90 rounded-xl p-4 leading-relaxed font-sans border border-zinc-200 dark:border-zinc-700 shadow-inner whitespace-pre-wrap"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const InterviewQuestions: React.FC = () => {
  const [jobRole, setJobRole] = useState('Data Analyst');
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<InterviewResult | null>(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'TECH' | 'HR' | 'CODING'>('ALL');

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
          <div className="p-2 rounded-xl bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            AI 50-Question Interview Bank
          </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
          Generate 50 role-authentic technical, behavioral, and practical questions with complete model answers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Config */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Target Role & Level</CardTitle>
              <CardDescription>Specify the target position to generate 50 real questions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                  Target Job Role *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Data Analyst, Software Engineer"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm p-3 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                  Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm p-3 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  <option>Fresher / Graduate</option>
                  <option>Junior (1-2 yrs)</option>
                  <option>Mid-Level (3-5 yrs)</option>
                  <option>Senior (5-8 yrs)</option>
                  <option>Lead / Architect (8+ yrs)</option>
                </select>
              </div>

              <div className="p-3 bg-brand-50 dark:bg-brand-950/40 rounded-xl border border-brand-200 dark:border-brand-900/60 text-xs text-brand-700 dark:text-brand-300 flex items-center gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-brand-500" />
                <span>Generates 25 Technical, 15 Behavioral/HR, and 10 Coding/SQL questions.</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="primary"
                className="w-full py-3"
                disabled={!jobRole.trim() || isGenerating}
                isLoading={isGenerating}
                onClick={handleGenerate}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating 50 Questions…' : 'Generate 50 Questions'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-2 space-y-6">
          {isGenerating && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 text-xs font-semibold animate-pulse">
              <Loader2 className="h-4 w-4 animate-spin shrink-0" />
              <span>Gemini AI is assembling 50 technical, HR, and coding questions for {jobRole}...</span>
            </div>
          )}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20 p-4 text-xs text-red-700 dark:text-red-400">
              {error}
            </div>
          )}
          {!result && !isGenerating && !error && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-24 text-center">
                <div className="h-14 w-14 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 mb-3">
                  <HelpCircle className="h-6 w-6 text-zinc-400" />
                </div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">50-Question Bank Ready</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs leading-relaxed">
                  Click 'Generate 50 Questions' to generate technical, HR, and coding questions.
                </p>
              </CardContent>
            </Card>
          )}

          {result && !isGenerating && (
            <div className="space-y-6">
              {/* Header Info & Search Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div>
                  <h3 className="text-sm font-extrabold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                    <span>{totalCount} Questions Ready</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                      {jobRole}
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Filter by category or search by keywords below.</p>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('ALL')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'ALL'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                  }`}
                >
                  All Questions ({totalCount})
                </button>
                <button
                  onClick={() => setActiveTab('TECH')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    activeTab === 'TECH'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                  }`}
                >
                  <Filter className="h-3 w-3" /> Technical ({result.technicalQuestions?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('HR')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    activeTab === 'HR'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                  }`}
                >
                  <User className="h-3 w-3" /> Behavioral & HR ({result.hrQuestions?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('CODING')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    activeTab === 'CODING'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                  }`}
                >
                  <Code className="h-3 w-3" /> Coding / SQL ({result.codingQuestions?.length || 0})
                </button>
              </div>

              {/* Render Question Cards */}
              {(activeTab === 'ALL' || activeTab === 'TECH') && (result.technicalQuestions?.length > 0) && (
                <Section title={`Technical Questions (${filterQuestions(result.technicalQuestions).length})`} icon={<HelpCircle className="h-5 w-5 text-brand-600 dark:text-brand-400" />}>
                  {filterQuestions(result.technicalQuestions).map((q, i) => (
                    <QuestionCard key={i} indexNum={i + 1} q={q.question} answer={q.answer} />
                  ))}
                </Section>
              )}

              {(activeTab === 'ALL' || activeTab === 'HR') && (result.hrQuestions?.length > 0) && (
                <Section title={`Behavioral & HR Questions (${filterQuestions(result.hrQuestions).length})`} icon={<User className="h-5 w-5 text-purple-600 dark:text-purple-400" />}>
                  {filterQuestions(result.hrQuestions).map((q, i) => (
                    <QuestionCard key={i} indexNum={i + 1} q={q.question} answer={q.answer} />
                  ))}
                </Section>
              )}

              {(activeTab === 'ALL' || activeTab === 'CODING') && (result.codingQuestions?.length > 0) && (
                <Section title={`Coding, SQL & Practical Questions (${filterQuestions(result.codingQuestions).length})`} icon={<Code className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}>
                  {filterQuestions(result.codingQuestions).map((q, i) => (
                    <QuestionCard
                      key={i}
                      indexNum={i + 1}
                      q={q.question}
                      answer={q.solution}
                      extra={q.approach ? <p className="text-xs text-zinc-500 italic bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg">Approach: {q.approach}</p> : undefined}
                    />
                  ))}
                </Section>
              )}

              {result.interviewTips?.length > 0 && (
                <Section title="Pro Interview Strategy Tips" icon={<Lightbulb className="h-5 w-5 text-amber-500" />}>
                  <ul className="space-y-2">
                    {result.interviewTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
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
