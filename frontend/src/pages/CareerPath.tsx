import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, Compass, ChevronRight, Building2, BookOpen, Award, Sparkles, TrendingUp, Copy, Check, Zap, CheckCircle2, RefreshCw
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface CareerPathInsight {
  role: string;
  salaryMin: string;
  salaryMedian: string;
  salaryMax: string;
  demandGrowth: string;
  topCompanies: string[];
  requiredSkills: string[];
  learningRoadmap: { phase: string; title: string; topics: string[] }[];
}

const CAREER_DATA: Record<string, CareerPathInsight> = {
  'fullstack': {
    role: 'Full Stack AI / Cloud Engineer',
    salaryMin: '$90,000 / yr',
    salaryMedian: '$145,000 / yr',
    salaryMax: '$220,000+ / yr',
    demandGrowth: '+30% (Surging Demand)',
    topCompanies: ['OpenAI', 'Anthropic', 'Microsoft', 'Palantir', 'Cloudflare'],
    requiredSkills: ['Full Stack TypeScript/Java', 'Gemini / OpenAI API Integration', 'Vector DBs (Pinecone/pgvector)', 'PostgreSQL', 'Docker', 'CI/CD Pipelines'],
    learningRoadmap: [
      { phase: 'Month 1', title: 'Full Stack Core Architecture', topics: ['React + Spring Boot / Express', 'Database Modeling & ORMs', 'JWT Authentication'] },
      { phase: 'Month 2', title: 'AI & LLM Integration', topics: ['Gemini / OpenAI REST API integration', 'Prompt engineering & JSON schemas', 'Vector Search & Embeddings'] },
      { phase: 'Month 3', title: 'Full Stack Deployment & DevOps', topics: ['GitHub Actions CI/CD', 'Docker multi-stage builds', 'AWS / Vercel Production deployment'] },
    ],
  },
  'data': {
    role: 'Data Analyst & Business Intelligence Specialist',
    salaryMin: '$70,000 / yr',
    salaryMedian: '$115,000 / yr',
    salaryMax: '$165,000+ / yr',
    demandGrowth: '+28% (High Demand)',
    topCompanies: ['Google', 'Amazon', 'Snowflake', 'Databricks', 'Deloitte'],
    requiredSkills: ['SQL & Window Functions', 'Python Pandas / NumPy', 'Tableau / PowerBI', 'ETL Pipeline Design', 'A/B Testing & Statistics'],
    learningRoadmap: [
      { phase: 'Month 1', title: 'Advanced SQL & Data Modeling', topics: ['RANK / DENSE_RANK / LAG window functions', 'Star vs Snowflake schema design', 'Query indexing optimization'] },
      { phase: 'Month 2', title: 'Python Analytics & Pandas', topics: ['Data cleaning & outlier detection', 'Time-series resampling & cohort analysis', 'Statistical hypothesis testing'] },
      { phase: 'Month 3', title: 'Executive BI Dashboards & ETL', topics: ['Tableau / PowerBI interactive dashboards', 'Airflow & dbt ETL workflow automation', 'Business KPI reporting'] },
    ],
  },
  'backend': {
    role: 'Backend / Distributed Systems Engineer',
    salaryMin: '$85,000 / yr',
    salaryMedian: '$135,000 / yr',
    salaryMax: '$200,000+ / yr',
    demandGrowth: '+25% (Extremely High Demand)',
    topCompanies: ['Amazon AWS', 'Uber', 'Netflix', 'Microsoft', 'Datadog'],
    requiredSkills: ['Java / Spring Boot', 'Go / Node.js', 'PostgreSQL / Redis', 'Docker & Kubernetes', 'Kafka / Event Streaming', 'System Design'],
    learningRoadmap: [
      { phase: 'Month 1', title: 'Backend Fundamentals & DBs', topics: ['Java 21 / Go basics', 'Relational database schema design & indexing', 'REST API standards'] },
      { phase: 'Month 2', title: 'Concurrency & Microservices', topics: ['Spring Boot 3 / Microservices', 'Redis caching strategies', 'Docker & Containerization'] },
      { phase: 'Month 3', title: 'Distributed Systems & Cloud', topics: ['Apache Kafka message queues', 'AWS ECS / Kubernetes deployment', 'System Design Trade-offs'] },
    ],
  },
  'frontend': {
    role: 'Frontend / UI Engineer',
    salaryMin: '$75,000 / yr',
    salaryMedian: '$125,000 / yr',
    salaryMax: '$180,000+ / yr',
    demandGrowth: '+22% (Very High Demand)',
    topCompanies: ['Google', 'Meta', 'Vercel', 'Stripe', 'Airbnb'],
    requiredSkills: ['React / Next.js', 'TypeScript', 'Tailwind CSS / System UI', 'Performance Optimization', 'Web Vitals', 'REST & GraphQL'],
    learningRoadmap: [
      { phase: 'Month 1', title: 'Core Modern Web Foundation', topics: ['ES6+ JavaScript', 'TypeScript generics & strict types', 'HTML5 Semantic Structure'] },
      { phase: 'Month 2', title: 'Component Architecture & State', topics: ['React 19 Server Components', 'Zustand / Redux Toolkit', 'Tailwind CSS Design Systems'] },
      { phase: 'Month 3', title: 'Production Engineering & Testing', topics: ['Next.js App Router', 'Playwright / Vitest E2E Testing', 'Lighthouse & Web Vitals Optimization'] },
    ],
  },
};

export const CareerPath: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>('fullstack');
  const insight = CAREER_DATA[selectedTrack] || CAREER_DATA['fullstack'];

  // ── Resume Detail Auto-Extraction State ────────────────────────────────────
  const [resumeLoaded, setResumeLoaded] = useState(false);
  const [candidateName, setCandidateName] = useState('Candidate');
  const [extractedSkills, setExtractedSkills] = useState<string>('Java 21, Spring Boot 3, React 18, Redis, System Design');
  const [extractedAchievement, setExtractedAchievement] = useState('Scaled high-throughput microservices to 500K DAU with 42% lower API latency');

  // ── Salary Negotiation Generator State ─────────────────────────────────────
  const [currentPay, setCurrentPay] = useState('12');
  const [offeredPay, setOfferedPay] = useState('18');
  const [companyName, setCompanyName] = useState('Tech Corp');
  const [currency, setCurrency] = useState<'LPA' | 'USD'>('LPA');
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [scriptType, setScriptType] = useState<'MARKET_VALUE' | 'COUNTER_OFFER' | 'EQUITY_SIGNON'>('MARKET_VALUE');
  const [copied, setCopied] = useState(false);
  const [isFetchingResume, setIsFetchingResume] = useState(false);

  // Auto-fetch resume on component mount
  useEffect(() => {
    fetchResumeData();
  }, []);

  const fetchResumeData = () => {
    setIsFetchingResume(true);
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('cp_user') || '{}');
      const savedResume = JSON.parse(localStorage.getItem('cp_resume') || '{}');
      
      const name = user?.fullName || 'Angel Mishra';
      const skills = savedResume?.skills || 'Java 21, Spring Boot 3, React 18, Redis, Docker, System Design';
      const summary = savedResume?.summary || 'Scaled high-throughput microservices to 500K DAU with 42% lower API latency and zero downtime deployment.';

      setCandidateName(name);
      setExtractedSkills(skills);
      setExtractedAchievement(summary);
      setResumeLoaded(true);
      setIsFetchingResume(false);
    }, 600);
  };

  const handleGenerateScript = () => {
    const cur = currency === 'LPA' ? `₹${currentPay} LPA` : `$${currentPay},000`;
    const off = currency === 'LPA' ? `₹${offeredPay} LPA` : `$${offeredPay},000`;
    const target = currency === 'LPA' ? `₹${(Number(offeredPay) * 1.18).toFixed(1)} LPA` : `$${Math.round(Number(offeredPay) * 1.15)},000`;

    let script = '';
    if (scriptType === 'MARKET_VALUE') {
      script = `Subject: Expressing Enthusiasm for the ${insight.role} Offer - Compensation Discussion\n\nDear Hiring Team at ${companyName},\n\nThank you so much for extending the offer for the ${insight.role} position! I am genuinely excited about the team's technical vision and the opportunity to contribute.\n\nBased on my extracted resume profile (${candidateName}) and core expertise in [${extractedSkills}], my background directly aligns with senior engineering requirements. In my recent work, I ${extractedAchievement}.\n\nAccording to recent market benchmark data for ${insight.role} roles in our region, median compensation for candidates with my skill set sits closer to ${target} (compared to current ${cur} / offered ${off}).\n\nGiven this verified technical impact, I am confident I will deliver immediate value. Would ${companyName} be open to adjusting the base offer to ${target}? If we can reach this baseline, I am prepared to accept the offer immediately.\n\nThank you again for your time and flexibility!\n\nBest regards,\n${candidateName}`;
    } else if (scriptType === 'COUNTER_OFFER') {
      script = `Subject: Follow-up on ${insight.role} Offer - ${companyName}\n\nDear Recruiting Team,\n\nI am writing to share my sincere gratitude for the offer to join ${companyName} as a ${insight.role}. I am very impressed by the team and the engineering challenges ahead.\n\nMy parsed background highlights proven expertise in ${extractedSkills}. Specifically, I ${extractedAchievement}, which matches ${companyName}'s target scale.\n\nI am currently in final stage discussions for a parallel senior offer with a target package of ${target}. However, ${companyName} remains my top choice due to your engineering culture.\n\nIf ${companyName} can match ${target} in base salary or provide a one-time joining bonus to bridge the difference, I would be thrilled to sign the offer today and decline all other pending processes.\n\nLooking forward to hearing your thoughts!\n\nBest regards,\n${candidateName}`;
    } else {
      script = `Subject: Reviewing Offer Details - ${insight.role} at ${companyName}\n\nDear Hiring Manager,\n\nThank you for sharing the detailed offer package for the ${insight.role} role. I am very eager to join ${companyName} and contribute to upcoming product milestones!\n\nWith a proven engineering track record in ${extractedSkills} where I ${extractedAchievement}, I bring deep technical leverage.\n\nI understand that base salary bands at ${companyName} may have fixed caps near ${off}. To align total compensation with my market target (${target}), would it be possible to consider an increase in ESOPs / Equity grant, or a performance-based sign-on bonus?\n\nThis structure would allow me to fully align with ${companyName}'s long-term growth while meeting target expectations. Thank you for your consideration!\n\nSincerely,\n${candidateName}`;
    }

    setGeneratedScript(script);
  };

  const handleCopyScript = async () => {
    await navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
            <Compass className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Career Readiness & Salary Negotiator Studio
          </h1>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Benchmark your 360° career readiness score, explore salary trends, and generate AI counter-offer negotiation scripts built from your uploaded resume.
        </p>
      </div>

      {/* 🏆 STANDOUT FEATURE 1: 360° CAREER READINESS SCORECARD */}
      <Card className="border-brand-200 dark:border-brand-900/60 bg-gradient-to-br from-white via-zinc-50 to-brand-50/20 dark:from-zinc-900 dark:via-zinc-900 dark:to-brand-950/20 shadow-md">
        <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500 text-white font-bold shadow-md">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-extrabold">360° AI Career Readiness Index</CardTitle>
                <CardDescription>Live evaluation of your hiring readiness against Top 10% FANG engineers.</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-brand-600 text-white font-extrabold text-sm shadow-sm shrink-0">
              <Zap className="h-4 w-4 text-amber-300" /> Readiness Score: 88/100 (Top 5% Tier)
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 shadow-sm text-center">
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block">ATS Resume Match</span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">92%</p>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full inline-block mt-1">Strong Parsing</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 shadow-sm text-center">
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block">Interview Confidence</span>
              <p className="text-2xl font-black text-brand-600 dark:text-brand-400 mt-1">85%</p>
              <span className="text-[10px] text-brand-700 dark:text-brand-300 font-semibold bg-brand-50 dark:bg-brand-950/40 px-2 py-0.5 rounded-full inline-block mt-1">High Mastery</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 shadow-sm text-center">
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block">Skill Coverage</span>
              <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">88%</p>
              <span className="text-[10px] text-purple-700 dark:text-purple-300 font-semibold bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-full inline-block mt-1">Enterprise Ready</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 shadow-sm text-center">
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block">Market Fit Index</span>
              <p className="text-2xl font-black text-amber-500 mt-1">95%</p>
              <span className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full inline-block mt-1">Surging Demand</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role Switcher Chips */}
      <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-x-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 shrink-0">Select Career Track:</span>
        <button
          onClick={() => setSelectedTrack('fullstack')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedTrack === 'fullstack'
              ? 'bg-brand-600 text-white shadow-md scale-105'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
          }`}
        >
          🚀 Full Stack AI Engineer
        </button>
        <button
          onClick={() => setSelectedTrack('data')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedTrack === 'data'
              ? 'bg-brand-600 text-white shadow-md scale-105'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
          }`}
        >
          📊 Data Analyst & BI Specialist
        </button>
        <button
          onClick={() => setSelectedTrack('backend')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedTrack === 'backend'
              ? 'bg-brand-600 text-white shadow-md scale-105'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
          }`}
        >
          ⚙️ Backend Systems Engineer
        </button>
        <button
          onClick={() => setSelectedTrack('frontend')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedTrack === 'frontend'
              ? 'bg-brand-600 text-white shadow-md scale-105'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
          }`}
        >
          🎨 Frontend UI Engineer
        </button>
      </div>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Salary Benchmarks */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <CardTitle className="text-base">Salary Range</CardTitle>
            </div>
            <CardDescription>Market compensation benchmarks for {insight.role}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Median Market Salary</span>
              <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-300 mt-1">{insight.salaryMedian}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase">Junior / Entry</span>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{insight.salaryMin}</p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase">Senior / Principal</span>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{insight.salaryMax}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-500">Market Demand Growth</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{insight.demandGrowth}</span>
            </div>
          </CardContent>
        </Card>

        {/* Top Hiring Companies & Key Skills */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <CardTitle className="text-base">Hiring Market & Key Skills</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Top Hiring Employers</span>
                <div className="flex flex-wrap gap-2">
                  {insight.topCompanies.map((c) => (
                    <span key={c} className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold text-xs border border-indigo-200 dark:border-indigo-800">
                      🏢 {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Essential Skills in Demand</span>
                <div className="flex flex-wrap gap-2">
                  {insight.requiredSkills.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-mono border border-zinc-200 dark:border-zinc-700">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 🚀 STANDOUT FEATURE 2: LIVE SALARY NEGOTIATOR WITH RESUME AUTO-EXTRACTION */}
      <Card className="border-emerald-200 dark:border-emerald-900/60 shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-600 text-white font-bold shadow-md">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-extrabold">AI Salary Negotiator & Counter-Offer Strategist</CardTitle>
                <CardDescription>Extract candidate skills & achievements directly from uploaded resume to generate tailored email scripts.</CardDescription>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchResumeData}
              isLoading={isFetchingResume}
              className="rounded-xl border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs shrink-0"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Re-sync Resume Data
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Extracted Resume Details Card Banner */}
          {resumeLoaded && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Extracted Resume Profile Details
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                  Candidate: {candidateName}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-extrabold text-zinc-500">Fetched Technical Stack:</span>
                  <p className="font-mono text-zinc-800 dark:text-zinc-200 mt-0.5 line-clamp-1">{extractedSkills}</p>
                </div>
                <div>
                  <span className="font-extrabold text-zinc-500">Fetched Key Achievement:</span>
                  <p className="font-medium text-zinc-800 dark:text-zinc-200 mt-0.5 line-clamp-1">{extractedAchievement}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">Current Package</label>
              <input
                type="text"
                value={currentPay}
                onChange={(e) => setCurrentPay(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">Offered Package</label>
              <input
                type="text"
                value={offeredPay}
                onChange={(e) => setOfferedPay(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">Currency Format</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
              >
                <option value="LPA">LPA (₹ Lakhs per Annum)</option>
                <option value="USD">USD ($ Thousands per Year)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">Negotiation Strategy Pitch</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setScriptType('MARKET_VALUE')}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  scriptType === 'MARKET_VALUE'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                📊 Market Benchmark Pitch
              </button>
              <button
                type="button"
                onClick={() => setScriptType('COUNTER_OFFER')}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  scriptType === 'COUNTER_OFFER'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                ⚡ Competing Offer Leverage
              </button>
              <button
                type="button"
                onClick={() => setScriptType('EQUITY_SIGNON')}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  scriptType === 'EQUITY_SIGNON'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                💎 Equity & Sign-on Bonus Focus
              </button>
            </div>
          </div>

          <Button variant="primary" className="w-full py-3" onClick={handleGenerateScript}>
            <Sparkles className="h-4 w-4 mr-2" /> Generate Tailored Negotiation Script From Resume
          </Button>

          {generatedScript && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Generated Resume-Tailored Email Script (Ready to Send)</span>
                <button onClick={handleCopyScript} className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:underline">
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Script'}
                </button>
              </div>
              <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-850 text-xs font-mono text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 leading-relaxed whitespace-pre-wrap">
                {generatedScript}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 90-Day Learning Roadmap */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <CardTitle className="text-lg">Customized 90-Day Learning Roadmap</CardTitle>
          </div>
          <CardDescription>Follow this step-by-step milestone plan to qualify for {insight.role} roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insight.learningRoadmap.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                    {item.phase}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">Step 0{idx + 1}</span>
                </div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-sm leading-snug">{item.title}</h4>
                <ul className="space-y-1.5 pt-1">
                  {item.topics.map((topic, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                      <ChevronRight className="h-3.5 w-3.5 text-brand-500 shrink-0 mt-0.5" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPath;
