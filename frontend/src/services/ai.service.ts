import api from './api';
import type { ApiResponse } from '../types/common';

// Helper to extract full resume and profile context from client state
export function getResumeContext(): string {
  try {
    const uploadedResume = JSON.parse(localStorage.getItem('cp_uploaded_resume') || '{}');
    const profileExt = JSON.parse(localStorage.getItem('cp_profile_ext') || '{}');
    const user = JSON.parse(localStorage.getItem('cp_user') || '{}');

    const parts: string[] = [];

    if (user.fullName || user.firstName) {
      parts.push(`Candidate Name: ${user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim()}`);
    }

    const currentRole = profileExt.currentRole || uploadedResume.targetRole || uploadedResume.fileName?.replace(/\.[^/.]+$/, "") || '';
    if (currentRole) {
      parts.push(`Target/Current Role: ${currentRole}`);
    }

    const skills = profileExt.skills?.length ? profileExt.skills : uploadedResume.skills;
    if (skills) {
      const skillsStr = Array.isArray(skills) ? skills.join(', ') : String(skills);
      parts.push(`Resume Technical Skills: ${skillsStr}`);
    }

    if (profileExt.degree || profileExt.college) {
      parts.push(`Education: ${profileExt.degree || ''} at ${profileExt.college || ''}`);
    }

    if (profileExt.experience) {
      parts.push(`Experience: ${profileExt.experience}`);
    }

    if (uploadedResume.summary || uploadedResume.extractedText) {
      parts.push(`Resume Summary/Content: ${uploadedResume.summary || uploadedResume.extractedText}`);
    }

    return parts.join(' | ');
  } catch {
    return '';
  }
}

// ── Cover Letter ─────────────────────────────────────────────────────────────
export interface CoverLetterPayload {
  companyName: string;
  jobRole: string;
  tone?: 'Professional' | 'Enthusiastic' | 'Executive' | 'Creative';
}

export interface CoverLetterResult {
  coverLetter: string;
}

// ── Interview Questions ───────────────────────────────────────────────────────
export interface InterviewPayload {
  jobRole: string;
  experienceLevel: string;
}

export interface TechnicalQuestion { question: string; answer: string; }
export interface HRQuestion { question: string; answer: string; }
export interface CodingQuestion { question: string; approach: string; solution: string; }

export interface InterviewResult {
  technicalQuestions: TechnicalQuestion[];
  hrQuestions: HRQuestion[];
  codingQuestions: CodingQuestion[];
  interviewTips: string[];
  commonMistakes: string[];
}

// ── Mock Interview ────────────────────────────────────────────────────────────
export interface MockInterviewPayload {
  question: string;
  userAnswer: string;
  jobRole: string;
}

export interface MockInterviewResult {
  score: number;
  strengths: string;
  weaknesses: string;
  improvedAnswer: string;
  confidenceLevel: string;
}

// ── AI Chat ───────────────────────────────────────────────────────────────────
export interface ChatPayload { prompt: string; }
export interface ChatResult { reply: string; }

function getModelAnswerForQuestion(question: string, role: string): string {
  const resumeCtx = getResumeContext();
  const q = question.toLowerCase();

  if (q.includes('yourself') || q.includes('technical stack') || q.includes('achievements')) {
    return `"Hi! I am a ${role} with hands-on experience building scalable applications. ${resumeCtx ? `My background includes: ${resumeCtx}.` : ''}\n\nRecently, I led a major project that processed high-volume transactions. By optimizing database queries and caching layers, I reduced latency by 40%. I thrive in collaborative engineering environments and love solving complex analytical challenges."`;
  }
  if (q.includes('rest') || q.includes('graphql') || q.includes('grpc')) {
    return `"I choose protocol based on client needs and system topology:\n1. REST: Best for public-facing web APIs using standard HTTP verbs and JSON.\n2. GraphQL: Ideal for frontends where clients need flexible, tailored queries to prevent over-fetching.\n3. gRPC: Best for high-performance microservice communication with low latency."`;
  }
  if (q.includes('debt') || q.includes('urgent') || q.includes('deadlines')) {
    return `"I manage technical debt using a balanced 80/20 strategy. During active feature development, 80% of sprint capacity goes to user features, while 20% is dedicated to refactoring, automated testing, and infrastructure improvements."`;
  }
  if (q.includes('bug') || q.includes('failure') || q.includes('debugging')) {
    return `"During a high-traffic release, API latency spiked. I isolated the issue using metrics and APM tracing, identifying an unindexed database query exhausting connection pools.\n\nI created a composite index, tuned connection pool settings, and deployed a hotfix within 20 minutes, bringing latency down to 45ms."`;
  }
  return `"For a ${role} position, an optimal response follows the STAR method:\n1. Context: 'In my project work, we faced a key technical challenge...'\n2. Action: 'I implemented solutions based on my technical stack...'\n3. Result: 'This achieved a 35% reduction in runtime and smooth production deployment.'"`;
}

export const aiService = {
  async generateCoverLetter(payload: CoverLetterPayload): Promise<CoverLetterResult> {
    const customKey = localStorage.getItem('cp_custom_gemini_key');
    const resumeContextStr = getResumeContext();
    const uploadedResume = JSON.parse(localStorage.getItem('cp_uploaded_resume') || '{}');
    const resumeText = uploadedResume?.extractedText || uploadedResume?.summary || '';
    const resumeSkills = Array.isArray(uploadedResume?.skills) ? uploadedResume.skills.join(', ') : (uploadedResume?.skills || '');

    if (customKey) {
      try {
        const prompt = `Write a compelling, highly professional cover letter for a ${payload.jobRole} position at ${payload.companyName} with a ${payload.tone || 'Professional'} tone. Resume context: ${resumeContextStr} ${resumeSkills} ${resumeText}. Include applicant achievements, tech stack depth for ${payload.jobRole}, and passion for the company.`;
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${customKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        });
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return { coverLetter: text };
      } catch (err) {
        console.warn('Direct Gemini API cover letter generation error:', err);
      }
    }

    try {
      const response = await api.post<ApiResponse<CoverLetterResult>>('/api/ai/cover-letter', {
        ...payload,
        resumeContext: resumeContextStr
      });
      if (response.data?.data) {
        const text = (response.data.data as any).coverLetter || (response.data.data as any).reply || String(response.data.data);
        if (text && !text.includes('An error occurred') && text.length > 100) {
          return { coverLetter: text };
        }
      }
    } catch (e) {
      console.warn('Backend cover letter service unavailable, using client-side generator.', e);
    }

    const user = JSON.parse(localStorage.getItem('cp_user') || '{}');
    const name = uploadedResume?.fullName || user?.fullName || `${user?.firstName || 'Candidate'} ${user?.lastName || ''}`.trim() || 'Candidate';
    const email = uploadedResume?.email || user?.email || 'candidate@careerpilot.dev';
    const phone = uploadedResume?.phone || '+91 9876543210';
    const role = payload.jobRole || 'Software Engineer';
    const lowerRole = role.toLowerCase();
    const company = payload.companyName || 'Target Company';
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    let roleSkillsStr = resumeSkills || getResumeContext();
    let roleAchievement = '';
    let roleSummary = '';

    if (lowerRole.includes('data analyst') || lowerRole.includes('analytics') || lowerRole.includes('bi analyst')) {
      if (!roleSkillsStr) roleSkillsStr = 'Advanced SQL, Python (Pandas/NumPy), Tableau, PowerBI, ETL Pipelines';
      roleSummary = 'performing data modeling, optimizing SQL queries, executing A/B testing statistical analyses, and designing C-level BI dashboards';
      roleAchievement = 'In my recent analytical project, I refactored complex SQL aggregate queries on multi-million row datasets—reducing report generation runtime by 45%.';
    } else if (lowerRole.includes('frontend') || lowerRole.includes('react') || lowerRole.includes('web')) {
      if (!roleSkillsStr) roleSkillsStr = 'React 18/19, TypeScript, Next.js, Tailwind CSS, Web Vitals';
      roleSummary = 'building modern, high-performance web user interfaces and architecting reusable design systems';
      roleAchievement = 'I led the frontend redesign of our core web application, reducing Largest Contentful Paint (LCP) and boosting user engagement by 32%.';
    } else {
      if (!roleSkillsStr) roleSkillsStr = 'Full Stack Development, React, TypeScript, Java/Node.js, PostgreSQL, Docker';
      roleSummary = 'leading end-to-end software development, database schema design, and cloud deployments';
      roleAchievement = 'I successfully delivered an enterprise analytics dashboard that streamlined team workflows and reduced manual data processing time by 40%.';
    }

    const letter = `${name}\nEmail: ${email} | Phone: ${phone}\nDate: ${dateStr}\n\nDear Hiring Manager at ${company},\n\nI am writing to express my strong interest in the ${role} position at ${company}. With a solid background in ${roleSummary}, I am confident in my ability to make an immediate, positive impact on your team.\n\nThroughout my work as a ${role}, I have consistently focused on delivering robust, high-quality technical outcomes. My core technical skills include: ${roleSkillsStr}.\n\n${roleAchievement}\n\nI am particularly drawn to ${company} because of your reputation for product quality and technical innovation. I look forward to discussing how my experience, skill set, and dedication to excellence align with the goals of ${company}.\n\nThank you for reviewing my application.\n\nSincerely,\n\n${name}\n${role}`;

    return { coverLetter: letter };
  },

  async generateInterviewQuestions(payload: InterviewPayload): Promise<InterviewResult> {
    const roleInput = (payload.jobRole || 'Software Engineer').toLowerCase();
    const exp = payload.experienceLevel || 'Mid-Level';
    const resumeContextStr = getResumeContext();

    const customKey = localStorage.getItem('cp_custom_gemini_key');
    if (customKey) {
      try {
        const prompt = `Generate 50 interview questions specifically tailored to candidate's resume and role ${payload.jobRole} (${exp} level). Candidate Resume Details: ${resumeContextStr}. Return strictly valid JSON matching: {"technicalQuestions":[{"question":"...","answer":"..."}],"hrQuestions":[{"question":"...","answer":"..."}],"codingQuestions":[{"question":"...","approach":"...","solution":"..."}],"interviewTips":["..."],"commonMistakes":["..."]}`;
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${customKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        });
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          if (parsed && Array.isArray(parsed.technicalQuestions) && parsed.technicalQuestions.length >= 5) {
            return parsed;
          }
        }
      } catch (err) {
        console.warn('Direct Gemini API question generation error:', err);
      }
    }

    try {
      const response = await api.post<ApiResponse<InterviewResult>>('/api/ai/interview', {
        ...payload,
        resumeContext: resumeContextStr
      });
      if (response.data?.data && Array.isArray(response.data.data.technicalQuestions) && response.data.data.technicalQuestions.length >= 10) {
        return response.data.data;
      }
    } catch (e) {
      console.warn('Backend interview service fallback triggered.', e);
    }

    if (roleInput.includes('data analyst') || roleInput.includes('analytics') || roleInput.includes('business intelligence')) {
      return generateDataAnalystQuestions();
    } else if (roleInput.includes('frontend') || roleInput.includes('react') || roleInput.includes('web')) {
      return generateFrontendQuestions();
    } else if (roleInput.includes('backend') || roleInput.includes('java') || roleInput.includes('python') || roleInput.includes('node')) {
      return generateBackendQuestions();
    } else {
      return generateBackendQuestions();
    }
  },

  async evaluateMockInterview(payload: MockInterviewPayload): Promise<MockInterviewResult> {
    const customKey = localStorage.getItem('cp_custom_gemini_key');
    const resumeContextStr = getResumeContext();

    if (customKey) {
      try {
        const prompt = `Evaluate candidate answer for ${payload.jobRole} role based on candidate's resume context: ${resumeContextStr}. Return strictly valid JSON only: {"score":8,"confidenceLevel":"High","strengths":"...","weaknesses":"...","improvedAnswer":"..."}\nQuestion: ${payload.question}\nAnswer: ${payload.userAnswer}`;
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${customKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        });
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          if (parsed && parsed.score) return parsed;
        }
      } catch (err) {
        console.warn('Direct Gemini mock interview evaluation error:', err);
      }
    }

    try {
      const response = await api.post<ApiResponse<MockInterviewResult>>('/api/ai/mock-interview', {
        ...payload,
        resumeContext: resumeContextStr
      });
      if (response.data?.data && typeof response.data.data.score === 'number') {
        return response.data.data;
      }
    } catch (e) {
      console.warn('Backend mock interview fallback triggered.', e);
    }

    const ans = payload.userAnswer ? payload.userAnswer.trim() : '';
    const lowerAns = ans.toLowerCase();
    const wordCount = ans.length === 0 ? 0 : ans.split(/\s+/).filter(Boolean).length;
    const role = payload.jobRole || 'Professional';

    const offTopicPhrases = ['dead', 'dunno', 'idk', 'dont know', "don't know", 'no idea', 'pass', 'nothing', 'test'];
    const isOffTopic = wordCount < 4 || offTopicPhrases.some((p) => lowerAns.includes(p));

    if (isOffTopic) {
      return {
        score: 1,
        confidenceLevel: 'Unsatisfactory (Off-Topic / Non-Responsive)',
        strengths: `None identified. The response provided ("${ans}") contains no relevant technical experience.`,
        weaknesses: `The response is non-responsive for a ${role} position.`,
        improvedAnswer: getModelAnswerForQuestion(payload.question, role),
      };
    }

    const score = Math.min(10, Math.max(4, Math.floor(wordCount / 4) + 3));
    const confidenceLevel = score >= 8 ? 'High (Strong Mastery)' : score >= 6 ? 'Moderate (Proficient)' : 'Developing (Needs Depth)';

    const strengths = `Demonstrated relevant candidate knowledge for ${role}.`;
    const weaknesses = `To reach top-tier rating: quantify business results (e.g. 'reduced latency by 35%').`;
    const improvedAnswer = getModelAnswerForQuestion(payload.question, role);

    return { score, confidenceLevel, strengths, weaknesses, improvedAnswer };
  },

  async chat(prompt: string): Promise<string> {
    const customKey = localStorage.getItem('cp_custom_gemini_key');
    const resumeContextStr = getResumeContext();

    if (customKey) {
      try {
        const fullPrompt = `You are an expert AI Career & Senior Software Engineering Mentor. You are mentoring a candidate with the following uploaded resume and profile context: ${resumeContextStr}.\nAnswer the candidate's question specifically tailored to their resume, skills, and goals:\nQuestion: ${prompt}`;
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${customKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] }),
        });
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } catch (err) {
        console.warn('Direct Gemini API call error:', err);
      }
    }

    try {
      const response = await api.post<ApiResponse<{ response: string }>>('/api/ai/chat', { 
        prompt,
        resumeContext: resumeContextStr
      });
      const text = response.data?.data?.response ?? (response.data as any)?.response;
      if (text && !text.includes('An error occurred')) {
        return text;
      }
    } catch (e) {
      console.warn('Backend AI chat fallback.', e);
    }

    const p = prompt.trim().toLowerCase();

    if (p === 'hi' || p === 'hello' || p === 'hey' || p === 'namaste' || p === 'who are you' || p === 'help') {
      return `Hello! 👋 I am your **AI Career & Senior Technical Engineering Mentor** on CareerPilot.\n\n${resumeContextStr ? `I have loaded your active resume context: **${resumeContextStr}**` : ''}\n\nHow can I help with your interview and career strategy today? Ask me about your resume strengths, technical interview questions, or system design!`;
    }

    return `Based on your target career goals and resume profile context${resumeContextStr ? ` (${resumeContextStr})` : ''}:\n\n- **Technical Strategy**: Align your project bullet points with measurable impact (e.g. latency, user conversion, memory efficiency).\n- **Interview Guidance**: Focus on STAR method structure (Situation, Task, Action, Result).\n- **Core Recommendation**: Practice 1-on-1 AI mock interviews and ATS resume scans to maximize recruiter response rate.`;
  }
};

// Internal Fallback Generators
function generateDataAnalystQuestions(): InterviewResult {
  return {
    technicalQuestions: [
      { question: 'What is the difference between RANK(), DENSE_RANK(), and ROW_NUMBER() in SQL?', answer: 'ROW_NUMBER() yields unique sequential integers. RANK() leaves gaps after ties. DENSE_RANK() does not leave gaps.' },
      { question: 'How do you handle missing values or null data during ETL preprocessing?', answer: 'Use COALESCE() or mean/median imputation depending on domain sensitivity.' },
      { question: 'What are CTEs (Common Table Expressions) and when should you use them over Subqueries?', answer: 'CTEs improve code readability, reusability, and allow recursive queries.' }
    ],
    hrQuestions: [
      { question: 'Tell me about a time you identified an unexpected insight from data.', answer: 'Walk through STAR story showing initial hypothesis, data analysis, and business revenue impact.' },
      { question: 'How do you explain complex technical dashboard metrics to non-technical C-level executives?', answer: 'Focus on high-level business KPIs, conversion rates, and revenue impact rather than query mechanics.' }
    ],
    codingQuestions: [
      { question: 'Write a SQL query to find the 2nd highest salary from an Employee table.', solution: 'SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);', approach: 'Use subquery or DENSE_RANK().' }
    ],
    interviewTips: ['Always clarify metric definitions before answering analytical queries.', 'Use STAR method for HR questions.'],
    commonMistakes: ['Not asking clarifying questions on sample data edge cases.']
  };
}

function generateFrontendQuestions(): InterviewResult {
  return {
    technicalQuestions: [
      { question: 'Explain how React Virtual DOM and Reconciliation algorithm work.', answer: 'React creates an in-memory Virtual DOM tree diffing it against current state to calculate minimal real DOM updates.' },
      { question: 'What is the difference between useEffect and useLayoutEffect?', answer: 'useEffect runs asynchronously after paint. useLayoutEffect runs synchronously before browser paint.' }
    ],
    hrQuestions: [
      { question: 'How do you handle disagreement with a UX designer regarding component specs?', answer: 'Discuss user research, performance impact, and find technical compromise.' }
    ],
    codingQuestions: [
      { question: 'Implement a custom useDebounce hook in React.', solution: 'const useDebounce = (val, delay) => { ... }', approach: 'Use useEffect with setTimeout and clearTimeout cleanup.' }
    ],
    interviewTips: ['Mention web vitals (LCP, CLS, FID) when discussing performance optimizations.'],
    commonMistakes: ['Mutating React state directly instead of using immutability patterns.']
  };
}

function generateBackendQuestions(): InterviewResult {
  return {
    technicalQuestions: [
      { question: 'How does HashMap handle collisions internally in Java 8+?', answer: 'Uses linked list chaining, converting to Red-Black Tree when bucket size exceeds 8.' },
      { question: 'Explain @Transactional annotation rollback rules in Spring Boot.', answer: 'By default, rolls back on unchecked RuntimeExceptions and Errors. Use rollbackFor for checked exceptions.' }
    ],
    hrQuestions: [
      { question: 'Describe a production incident outage you resolved under pressure.', answer: 'Detail monitoring metrics, root cause isolation, hotfix deployment, and post-mortem post-processing.' }
    ],
    codingQuestions: [
      { question: 'Design a LRU Cache data structure with O(1) get and put time complexity.', solution: 'Use HashMap + Doubly LinkedList.', approach: 'HashMap for O(1) lookups, Doubly LinkedList for O(1) evictions.' }
    ],
    interviewTips: ['Emphasize thread safety, database indexing, and API response time optimization.'],
    commonMistakes: ['Ignoring database connection pooling limits under high concurrency.']
  };
}
