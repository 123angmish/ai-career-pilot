import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Zap, 
  ChevronRight, 
  Bot, 
  Compass, 
  HelpCircle, 
  Video, 
  Check, 
  Plus, 
  Minus 
} from 'lucide-react';
import { PublicNavbar } from '../components/PublicNavbar';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  // Changing text rotator phrases
  const rotatingPhrases = [
    'Build ATS-friendly resumes',
    'Find high-match job roles',
    'Prepare for technical interviews',
    'Bridge your skill gaps',
    'Track your placement journey',
  ];
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIdx((prev) => (prev + 1) % rotatingPhrases.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [rotatingPhrases.length]);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the ATS Resume Analyzer score my resume?',
      a: 'CareerPilot parses your uploaded PDF resume using optical keyword extraction and measures syntactic alignment against actual ATS filters used by recruiters at Google, Microsoft, and Amazon.'
    },
    {
      q: 'Can I use CareerPilot without a paid plan?',
      a: 'Yes! The Free Tier includes complete access to the AI Resume Builder, basic ATS scans, and initial career roadmap generation.'
    },
    {
      q: 'How accurate are the AI Mock Interview feedback reports?',
      a: 'Our AI Mock Interview engine is calibrated using real rubric data from FAANG interview loops, assessing speech confidence, code complexity, and technical terminology relevance.'
    },
    {
      q: 'Does CareerPilot support international job searches?',
      a: 'Absolutely! Our Global Careers hub converts salaries across PPP currencies and filters visa-sponsored Software Engineering & Data Science positions worldwide.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Public Navbar */}
      <PublicNavbar />

      {/* ── 1. HERO SECTION ────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 max-w-7xl mx-auto">
        {/* Soft Ambient Mesh Background Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
          
          {/* Top Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold shadow-2xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>2026 AI Career SaaS Platform for Engineering & Placement Success</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-display"
          >
            Plan your career. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
              Crack your placement.
            </span>
          </motion.h1>

          {/* Rotating Text Subheadline */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-10 flex items-center justify-center text-lg sm:text-2xl font-bold text-slate-700 font-display"
          >
            <span className="mr-2">Designed to help you</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentPhraseIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-indigo-600 underline decoration-indigo-300 underline-offset-4"
              >
                {rotatingPhrases[currentPhraseIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed"
          >
            The all-in-one placement co-pilot that audits your resume against ATS algorithms, identifies skill gaps, and prepares you for real technical interview loops.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Start Placement Prep Free
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-sm rounded-2xl border border-slate-200 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Explore AI Features
            </a>
          </motion.div>

          {/* Trust Metrics Pill */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-semibold"
          >
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Free Tier Available</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 100% Recruiter Compliance</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> No Credit Card Required</span>
          </motion.div>

        </div>

      </section>

      {/* ── 2. TRUSTED METRICS BAR ──────────────────────────────────────────── */}
      <section className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4 rounded-2xl hover:bg-slate-50 transition-colors">
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">45,000+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Students Placed</p>
          </div>
          <div className="p-4 rounded-2xl hover:bg-slate-50 transition-colors">
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">98.4%</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">ATS Pass Rate</p>
          </div>
          <div className="p-4 rounded-2xl hover:bg-slate-50 transition-colors">
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">₹14.2 LPA</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Avg CTC Package</p>
          </div>
          <div className="p-4 rounded-2xl hover:bg-slate-50 transition-colors">
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">500+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Hiring Partners</p>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURE SHOWCASE SECTION ───────────────────────────────────── */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100">
            End-To-End Career Suite
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            Everything you need to land your dream placement.
          </h2>
          <p className="text-slate-600 text-base font-medium">
            AI-driven tools built specifically for students, fresh graduates, and career switchers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <Link to="/resumes/builder" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group block cursor-pointer">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 font-display">AI Resume Builder</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
              Create professional, single-page A4 resumes styled with recruiter-approved typography and real-time live preview.
            </p>
            <span className="inline-flex items-center text-xs font-extrabold text-indigo-600 hover:text-indigo-700 gap-1">
              Build Resume Now <ChevronRight className="h-4 w-4" />
            </span>
          </Link>

          {/* Feature 2 */}
          <Link to="/resumes/analysis" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group block cursor-pointer">
            <div className="h-12 w-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 font-display">ATS Resume Analyzer</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
              Upload your PDF and get instant ATS pass scores, keyword gap audits, and action verb suggestions.
            </p>
            <span className="inline-flex items-center text-xs font-extrabold text-purple-600 hover:text-purple-700 gap-1">
              Audit Resume <ChevronRight className="h-4 w-4" />
            </span>
          </Link>

          {/* Feature 3 */}
          <Link to="/career-path" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group block cursor-pointer">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 font-display">AI Career Roadmap</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
              Generate step-by-step learning roadmaps tailored to SDE, Fullstack, Frontend, Data Science, and DevOps target roles.
            </p>
            <span className="inline-flex items-center text-xs font-extrabold text-amber-600 hover:text-amber-700 gap-1">
              View Roadmap <ChevronRight className="h-4 w-4" />
            </span>
          </Link>

          {/* Feature 4 */}
          <Link to="/interview/mock" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group block cursor-pointer">
            <div className="h-12 w-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Video className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 font-display">Mock Interview Loops</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
              Practice real-time technical interviews with AI analysis on clarity, domain terminology, and problem-solving.
            </p>
            <span className="inline-flex items-center text-xs font-extrabold text-cyan-600 hover:text-cyan-700 gap-1">
              Start Mock Interview <ChevronRight className="h-4 w-4" />
            </span>
          </Link>

          {/* Feature 5 */}
          <Link to="/interview/questions" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group block cursor-pointer">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 font-display">Interview Question Bank</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
              Curated database of Indian & global tech interview questions with structured AI answer guidance.
            </p>
            <span className="inline-flex items-center text-xs font-extrabold text-rose-600 hover:text-rose-700 gap-1">
              Practice Questions <ChevronRight className="h-4 w-4" />
            </span>
          </Link>

          {/* Feature 6 */}
          <Link to="/chat" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group block cursor-pointer">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Bot className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 font-display">24/7 AI Career Mentor</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
              Ask anything about placement prep, salary negotiations, project ideas, and resume summaries in real-time chat.
            </p>
            <span className="inline-flex items-center text-xs font-extrabold text-emerald-600 hover:text-emerald-700 gap-1">
              Ask AI Assistant <ChevronRight className="h-4 w-4" />
            </span>
          </Link>

        </div>
      </section>

      {/* ── 4. HOW IT WORKS ───────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-slate-100/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-white px-3.5 py-1 rounded-full border border-slate-200 shadow-2xs">
              4 Simple Steps
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
              How CareerPilot Works
            </h2>
            <p className="text-slate-600 text-base font-medium">
              From college freshman to senior software engineer offer in 4 structured steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Upload Profile', desc: 'Import your existing resume or fill in education & target job roles.', path: '/resumes/builder' },
              { num: '02', title: 'Run ATS Audit', desc: 'Get real-time feedback on keyword coverage, formatting, and skill gap score.', path: '/resumes/analysis' },
              { num: '03', title: 'Practice Mocks', desc: 'Answer AI technical questions & receive instant communication feedback.', path: '/interview/mock' },
              { num: '04', title: 'Get Placed', desc: 'Apply with high confidence to matching jobs with tailored cover letters.', path: '/job-tracker' },
            ].map((step, idx) => (
              <Link key={idx} to={step.path} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-lg transition-all space-y-3 relative block cursor-pointer group">
                <span className="text-4xl font-extrabold text-indigo-200 group-hover:text-indigo-600 transition-colors font-display">{step.num}</span>
                <h4 className="text-lg font-extrabold text-slate-900 font-display">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{step.desc}</p>
                <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 pt-1">Try Step <ChevronRight className="h-3.5 w-3.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PRICING SECTION ────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100">
            Student-Friendly Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            Transparent plans for every student.
          </h2>
          <p className="text-slate-600 text-base font-medium">
            Start for free. Upgrade when you are ready for intensive campus placement prep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Free Tier */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900 font-display">Starter Free</h3>
              <p className="text-xs text-slate-500 font-medium">Perfect for creating your first ATS resume.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900 font-display">₹0</span>
                <span className="text-xs text-slate-500 font-medium">/ forever</span>
              </div>

              <ul className="space-y-3 text-xs font-bold text-slate-700 pt-4 border-t border-slate-100">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Basic AI Resume Builder</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> 3 ATS Resume Scans</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Public Job Recommendation Hub</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Standard Career Roadmap</li>
              </ul>
            </div>

            <Link to="/register" className="w-full mt-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl text-center transition-colors cursor-pointer">
              Get Started Free
            </Link>
          </div>

          {/* Pro Monthly Tier */}
          <div className="bg-gradient-to-b from-indigo-50/90 to-white p-8 rounded-3xl border-2 border-indigo-600 shadow-xl flex flex-col justify-between relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-widest">
              Most Popular
            </span>

            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900 font-display">Placement Pro</h3>
              <p className="text-xs text-slate-500 font-medium">For students in active placement drive season.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900 font-display">₹199</span>
                <span className="text-xs text-slate-500 font-medium">/ month</span>
              </div>

              <ul className="space-y-3 text-xs font-bold text-slate-800 pt-4 border-t border-slate-200">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> Unlimited AI Resume Exports</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> Unlimited ATS Audits & JD Matching</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> Unlimited AI Mock Interview Loops</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> 24/7 AI Career Mentor Access</li>
              </ul>
            </div>

            <Link to="/register" className="w-full mt-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl text-center shadow-md shadow-indigo-500/25 transition-all cursor-pointer">
              Upgrade to Pro
            </Link>
          </div>

          {/* Yearly Tier */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900 font-display">Annual Pass</h3>
              <p className="text-xs text-slate-500 font-medium">Complete degree tenure preparation pass.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900 font-display">₹999</span>
                <span className="text-xs text-slate-500 font-medium">/ year</span>
              </div>

              <ul className="space-y-3 text-xs font-bold text-slate-700 pt-4 border-t border-slate-100">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> All Pro Features Included</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Priority 1-on-1 Mentor Guidance</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> LinkedIn Profile Optimization</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Global Visa & Salary Calculator</li>
              </ul>
            </div>

            <Link to="/register" className="w-full mt-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl text-center transition-colors cursor-pointer">
              Get Annual Pass
            </Link>
          </div>

        </div>
      </section>

      {/* ── 6. FAQ ACCORDION ──────────────────────────────────────────────── */}
      <section id="faq" className="py-24 bg-slate-100/60 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-white px-3.5 py-1 rounded-full border border-slate-200">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <Minus className="h-4 w-4 text-indigo-600" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FINAL HERO CTA ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 rounded-3xl p-10 sm:p-16 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Ready to land your dream career offer?
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Join thousands of engineering students who use CareerPilot to build ATS resumes and pass technical interviews.
          </p>

          <div className="pt-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 hover:bg-slate-50 font-extrabold text-sm rounded-2xl shadow-xl transition-transform hover:scale-105 cursor-pointer"
            >
              Create Free Account Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
