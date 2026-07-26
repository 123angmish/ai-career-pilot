import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Plus, Trash2, CheckCircle2, Copy, Eye, Wand2, FileText, Printer
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: { company: string; role: string; duration: string; description: string }[];
  education: { school: string; degree: string; year: string }[];
  projects: { title: string; tech: string; description: string }[];
}

const TEMPLATES: Record<string, ResumeData> = {
  software_engineer: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@tech.dev',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    summary: 'Full-stack software engineer with 4+ years of experience building high-concurrency microservices, responsive web applications, and cloud-native REST APIs.',
    skills: ['TypeScript', 'React', 'Node.js', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS', 'Git'],
    experience: [
      {
        company: 'Nexus Software Systems',
        role: 'Senior Software Engineer',
        duration: '2023 - Present',
        description: 'Architected scalable microservices serving 1M+ daily active users. Reduced P99 API latency by 35% using Redis caching.',
      },
      {
        company: 'CloudScale Labs',
        role: 'Full Stack Engineer',
        duration: '2021 - 2023',
        description: 'Built React/TypeScript single-page applications and integrated OAuth2 security pipelines across 12 product modules.',
      },
    ],
    education: [
      {
        school: 'University of California, Berkeley',
        degree: 'B.S. in Computer Science',
        year: '2021',
      },
    ],
    projects: [
      {
        title: 'CareerPilot AI Engine',
        tech: 'React, Java Spring Boot, Gemini API',
        description: 'Built automated resume parser, ATS compatibility evaluator, and real-time interview simulator.',
      },
    ],
  },
  data_scientist: {
    fullName: 'Elena Rostova',
    email: 'elena.rostova@data.ai',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    summary: 'Data Scientist specializing in Machine Learning, Predictive Modeling, and NLP algorithms for high-growth tech platforms.',
    skills: ['Python', 'PyTorch', 'Scikit-Learn', 'SQL', 'Pandas', 'Spark', 'FastAPI', 'Tableau'],
    experience: [
      {
        company: 'Analytics AI Corp',
        role: 'Lead Data Scientist',
        duration: '2022 - Present',
        description: 'Trained predictive customer churn models achieving 92% precision. Reduced false positive alerts by 45%.',
      },
    ],
    education: [
      {
        school: 'Columbia University',
        degree: 'M.S. in Data Science',
        year: '2022',
      },
    ],
    projects: [
      {
        title: 'Automated Sentiment Analyzer',
        tech: 'Python, BERT, Transformer Models',
        description: 'Fine-tuned HuggingFace transformers for real-time sentiment scoring on customer support tickets.',
      },
    ],
  },
};

export const ResumeBuilder: React.FC = () => {
  const [data, setData] = useState<ResumeData>(TEMPLATES.software_engineer);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [copied, setCopied] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleApplyTemplate = (key: string) => {
    if (TEMPLATES[key]) {
      setData(TEMPLATES[key]);
      showNotification(`Applied ${key.replace('_', ' ')} template!`);
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      setData((prev) => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  // 📄 High-Definition Printable PDF Resume Downloader
  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups in your browser to download your PDF resume.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${data.fullName} - Resume</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #111; line-height: 1.5; background: #fff; }
          h1 { font-size: 26px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px; color: #000; font-weight: 800; }
          .contact { font-size: 13px; color: #444; margin-bottom: 24px; border-bottom: 2px solid #222; padding-bottom: 12px; }
          .section-title { font-size: 13px; font-weight: 800; text-transform: uppercase; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-top: 22px; margin-bottom: 10px; letter-spacing: 0.8px; }
          .summary { font-size: 13px; color: #333; margin-bottom: 16px; leading-relaxed; }
          .skills { font-size: 12px; font-weight: bold; background: #f3f4f6; padding: 10px; border-radius: 6px; color: #111; font-family: monospace; }
          .job { margin-bottom: 14px; }
          .job-header { display: flex; justify-content: space-between; font-size: 13px; font-weight: bold; }
          .job-company { font-size: 13px; color: #2563eb; font-weight: 700; }
          .job-duration { font-size: 12px; color: #666; float: right; font-weight: normal; }
          .job-desc { font-size: 13px; color: #333; margin-top: 4px; }
          @media print { 
            body { padding: 0; }
            @page { margin: 1.5cm; }
          }
        </style>
      </head>
      <body>
        <h1>${data.fullName}</h1>
        <div class="contact">${data.email} • ${data.phone} • ${data.location}</div>
        
        <div class="section-title">Professional Summary</div>
        <div class="summary">${data.summary}</div>
        
        <div class="section-title">Core Technical Competencies</div>
        <div class="skills">${data.skills.join(' • ')}</div>
        
        <div class="section-title">Work Experience</div>
        ${data.experience.map(e => `
          <div class="job">
            <span class="job-duration">${e.duration}</span>
            <div class="job-header">${e.role}</div>
            <div class="job-company">${e.company}</div>
            <div class="job-desc">• ${e.description}</div>
          </div>
        `).join('')}
        
        <div class="section-title">Education & Certifications</div>
        ${data.education.map(ed => `
          <div style="font-size:13px; font-weight:bold; margin-bottom:6px;">
            ${ed.degree} — ${ed.school} <span style="font-weight:normal; color:#666; float:right;">${ed.year}</span>
          </div>
        `).join('')}

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    showNotification('PDF Download & Print Dialog Ready!');
  };

  const handleDownloadText = () => {
    const formatted = `
===================================================================
${data.fullName.toUpperCase()}
Email: ${data.email} | Phone: ${data.phone} | Location: ${data.location}
===================================================================

PROFESSIONAL SUMMARY
${data.summary}

TECHNICAL SKILLS
${data.skills.join(', ')}

WORK EXPERIENCE
${data.experience.map((e) => `${e.role} @ ${e.company} (${e.duration})\n- ${e.description}`).join('\n\n')}

EDUCATION
${data.education.map((ed) => `${ed.degree} - ${ed.school} (${ed.year})`).join('\n')}

PROJECTS
${data.projects.map((p) => `${p.title} [Tech: ${p.tech}]\n- ${p.description}`).join('\n')}
    `.trim();

    const blob = new Blob([formatted], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.fullName.toLowerCase().replace(/\s+/g, '_')}_resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Downloaded text resume!');
  };

  const handleCopyText = async () => {
    const text = `${data.fullName}\n${data.email} | ${data.phone}\n\nSUMMARY:\n${data.summary}\n\nSKILLS:\n${data.skills.join(', ')}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="h-4 w-4" />
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
              <Wand2 className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Interactive AI Resume Builder
            </h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Build, edit, preview, and download your ATS-optimized resume directly in PDF or Text.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={activeTab === 'edit' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('edit')}
          >
            <Wand2 className="h-3.5 w-3.5 mr-1.5" /> Edit Resume
          </Button>
          <Button
            variant={activeTab === 'preview' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('preview')}
          >
            <Eye className="h-3.5 w-3.5 mr-1.5" /> Preview Document
          </Button>
          <Button variant="primary" size="sm" onClick={handleDownloadPDF} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">
            <Printer className="h-3.5 w-3.5 mr-1.5" /> Download PDF Resume
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadText}>
            <FileText className="h-3.5 w-3.5 mr-1.5" /> Export Text
          </Button>
        </div>
      </div>

      {/* Template Quick Selection */}
      <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-x-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 shrink-0">
          Load Preset Template:
        </span>
        <button
          onClick={() => handleApplyTemplate('software_engineer')}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300 border border-brand-200 dark:border-brand-800 hover:scale-105 transition-transform"
        >
          ⚡ Software Engineer
        </button>
        <button
          onClick={() => handleApplyTemplate('data_scientist')}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:scale-105 transition-transform"
        >
          📊 Data Scientist / AI
        </button>
      </div>

      {/* Content Body */}
      {activeTab === 'edit' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Personal Details</CardTitle>
                <CardDescription>Basic contact details displayed at the top.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={data.fullName}
                    onChange={(e) => setData({ ...data, fullName: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Email</label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Phone</label>
                    <input
                      type="text"
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={data.location}
                    onChange={(e) => setData({ ...data, location: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Professional Summary</CardTitle>
                <CardDescription>A concise high-impact summary statement.</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  rows={4}
                  value={data.summary}
                  onChange={(e) => setData({ ...data, summary: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-brand-500 focus:outline-none resize-none"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Technical Skills</CardTitle>
                <CardDescription>Core skills evaluated by ATS parsers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add skill (e.g., Python, Docker)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
                    className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-brand-500 focus:outline-none"
                  />
                  <Button size="sm" onClick={handleAddSkill}>
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {data.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
                    >
                      {skill}
                      <button onClick={() => handleRemoveSkill(skill)} className="text-zinc-400 hover:text-red-500 ml-1">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Live Preview Panel */}
          <div>
            <Card className="h-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
              <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" /> Live Document Render
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleDownloadPDF} className="text-emerald-600 border-emerald-300 dark:text-emerald-400 font-bold">
                      <Printer className="h-3.5 w-3.5 mr-1" /> PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCopyText}>
                      <Copy className="h-3.5 w-3.5 mr-1" /> {copied ? 'Copied!' : 'Copy Raw'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 font-sans space-y-6 text-zinc-900 dark:text-zinc-100">
                {/* Header */}
                <div className="border-b border-zinc-200 dark:border-zinc-700 pb-4 text-center">
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{data.fullName}</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {data.email} • {data.phone} • {data.location}
                  </p>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 border-b border-zinc-100 dark:border-zinc-800 pb-1 mb-2">
                    Professional Summary
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">{data.summary}</p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 border-b border-zinc-100 dark:border-zinc-800 pb-1 mb-2">
                    Core Technical Competencies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-zinc-800 dark:text-zinc-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 border-b border-zinc-100 dark:border-zinc-800 pb-1 mb-2">
                    Work Experience
                  </h3>
                  <div className="space-y-3">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="text-xs space-y-1">
                        <div className="flex justify-between font-semibold">
                          <span>{exp.role} — {exp.company}</span>
                          <span className="text-zinc-500 font-normal">{exp.duration}</span>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">• {exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 border-b border-zinc-100 dark:border-zinc-800 pb-1 mb-2">
                    Education & Certifications
                  </h3>
                  {data.education.map((ed, i) => (
                    <div key={i} className="text-xs flex justify-between">
                      <span className="font-semibold">{ed.degree} — {ed.school}</span>
                      <span className="text-zinc-500">{ed.year}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Full Preview Tab */
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <Card className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
            <div className="text-center border-b border-zinc-200 dark:border-zinc-800 pb-6">
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">{data.fullName}</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {data.email} | {data.phone} | {data.location}
              </p>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">Professional Summary</h2>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{data.summary}</p>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">Skills & Technologies</h2>
              <p className="text-sm text-zinc-800 dark:text-zinc-200 font-mono bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700">
                {data.skills.join(' • ')}
              </p>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3">Work History</h2>
              {data.experience.map((exp, i) => (
                <div key={i} className="mb-4 space-y-1">
                  <div className="flex justify-between text-sm font-bold">
                    <span>{exp.role}</span>
                    <span className="text-zinc-400 text-xs font-normal">{exp.duration}</span>
                  </div>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">{exp.company}</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">{exp.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <Button variant="primary" onClick={handleDownloadPDF} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                <Printer className="h-4 w-4 mr-2" /> Download PDF Resume
              </Button>
              <Button variant="outline" onClick={handleDownloadText}>
                <FileText className="h-4 w-4 mr-2" /> Export Plain Text (.txt)
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ResumeBuilder;
