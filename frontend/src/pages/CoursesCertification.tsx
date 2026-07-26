import React, { useState } from 'react';
import { Award, ExternalLink, TrendingUp, Filter, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';

interface CertificationTrack {
  id: string;
  title: string;
  provider: string;
  domain: 'Cloud & DevOps' | 'Full Stack & Java' | 'AI & Machine Learning' | 'Data Analytics & SQL' | 'Cybersecurity & Systems';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  salaryBoost: string;
  duration: string;
  skills: string[];
  link: string;
}

const CERTIFICATIONS: CertificationTrack[] = [
  {
    id: '1',
    title: 'AWS Certified Solutions Architect – Associate',
    provider: 'Amazon Web Services (AWS)',
    domain: 'Cloud & DevOps',
    level: 'Intermediate',
    salaryBoost: '+35% Salary Boost',
    duration: '4-6 Weeks',
    skills: ['EC2', 'S3', 'VPC', 'DynamoDB', 'IAM Security', 'Serverless Lambda'],
    link: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
  },
  {
    id: '2',
    title: 'Certified Kubernetes Administrator (CKA)',
    provider: 'Cloud Native Computing Foundation (CNCF)',
    domain: 'Cloud & DevOps',
    level: 'Advanced',
    salaryBoost: '+42% Salary Boost',
    duration: '6-8 Weeks',
    skills: ['Kubernetes Architecture', 'Cluster Setup', 'Storage Classes', 'Ingress Control', 'Troubleshooting'],
    link: 'https://www.cncf.io/certification/cka/'
  },
  {
    id: '3',
    title: 'Google Professional Cloud Architect',
    provider: 'Google Cloud Platform (GCP)',
    domain: 'Cloud & DevOps',
    level: 'Expert',
    salaryBoost: '+45% Salary Boost',
    duration: '8-10 Weeks',
    skills: ['GCP Infrastructure', 'BigQuery', 'GKE Containers', 'Cloud IAM', 'Disaster Recovery'],
    link: 'https://cloud.google.com/learn/certification/cloud-architect'
  },
  {
    id: '4',
    title: 'Meta Front-End Developer Professional Certificate',
    provider: 'Meta (Coursera)',
    domain: 'Full Stack & Java',
    level: 'Intermediate',
    salaryBoost: '+28% Salary Boost',
    duration: '4 Weeks',
    skills: ['React 18', 'JavaScript ES6', 'CSS Grid', 'REST APIs', 'Version Control Git'],
    link: 'https://www.coursera.org/professional-certificates/meta-front-end-developer'
  },
  {
    id: '5',
    title: 'Oracle Certified Professional: Java SE 21 Developer',
    provider: 'Oracle Corporation',
    domain: 'Full Stack & Java',
    level: 'Advanced',
    salaryBoost: '+32% Salary Boost',
    duration: '6 Weeks',
    skills: ['Virtual Threads', 'Spring Framework', 'JVM Garbage Collection', 'Concurrency API', 'JDBC'],
    link: 'https://education.oracle.com/java-se-21-developer/pexam_1Z0-830'
  },
  {
    id: '6',
    title: 'Spring Boot 3 & Spring Cloud Microservices Mastery',
    provider: 'Baeldung & VMware Spring',
    domain: 'Full Stack & Java',
    level: 'Advanced',
    salaryBoost: '+38% Salary Boost',
    duration: '5 Weeks',
    skills: ['Spring Boot 3', 'Spring Data JPA', 'Kafka Event Streaming', 'Spring Security JWT', 'Resilience4j'],
    link: 'https://www.baeldung.com/'
  },
  {
    id: '7',
    title: 'Deep Learning & LLM Fine-Tuning Specialization',
    provider: 'DeepLearning.AI (Andrew Ng)',
    domain: 'AI & Machine Learning',
    level: 'Advanced',
    salaryBoost: '+50% Salary Boost',
    duration: '8 Weeks',
    skills: ['PyTorch', 'Transformers', 'PEFT/LoRA', 'LangChain', 'Vector DBs (Pinecone)', 'RAG Pipelines'],
    link: 'https://www.deeplearning.ai/'
  },
  {
    id: '8',
    title: 'Google Machine Learning Engineer Certificate',
    provider: 'Google Cloud Platform',
    domain: 'AI & Machine Learning',
    level: 'Expert',
    salaryBoost: '+48% Salary Boost',
    duration: '8 Weeks',
    skills: ['TensorFlow', 'Vertex AI', 'Model Serving', 'Feature Store', 'MLOps Pipelines'],
    link: 'https://cloud.google.com/learn/certification/machine-learning-engineer'
  },
  {
    id: '9',
    title: 'Google Data Analytics Professional Certificate',
    provider: 'Google (Coursera)',
    domain: 'Data Analytics & SQL',
    level: 'Beginner',
    salaryBoost: '+25% Salary Boost',
    duration: '4-6 Weeks',
    skills: ['Advanced SQL', 'Pandas Data Cleaning', 'Tableau Dashboards', 'R Programming', 'Data Storytelling'],
    link: 'https://www.coursera.org/professional-certificates/google-data-analytics'
  },
  {
    id: '10',
    title: 'Data Engineering with Apache Spark & Snowflake',
    provider: 'DataCamp & Databricks',
    domain: 'Data Analytics & SQL',
    level: 'Advanced',
    salaryBoost: '+40% Salary Boost',
    duration: '6 Weeks',
    skills: ['PySpark', 'Apache Airflow', 'Snowflake DW', 'dbt Data Modeling', 'ETL Pipelines'],
    link: 'https://www.datacamp.com/tracks/data-engineer-with-python'
  },
  {
    id: '11',
    title: 'Grokking the System Design & Architecture Masterclass',
    provider: 'Design Gurus & ByteByteGo',
    domain: 'Cybersecurity & Systems',
    level: 'Expert',
    salaryBoost: '+45% Salary Boost',
    duration: '6 Weeks',
    skills: ['Distributed Systems', 'Load Balancers', 'CAP Theorem', 'Database Sharding', 'Redis Caching'],
    link: 'https://www.designgurus.io/course/grokking-the-system-design-interview'
  },
  {
    id: '12',
    title: 'Google Cybersecurity & Ethical Hacking Certificate',
    provider: 'Google & CompTIA',
    domain: 'Cybersecurity & Systems',
    level: 'Intermediate',
    salaryBoost: '+30% Salary Boost',
    duration: '5 Weeks',
    skills: ['Network Security', 'Linux Shell', 'Python Auditing', 'SIEM Tools (Splunk)', 'OWASP Top 10'],
    link: 'https://www.coursera.org/professional-certificates/google-cybersecurity'
  }
];

export const CoursesCertification: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  const filteredCerts = selectedDomain === 'All' 
    ? CERTIFICATIONS 
    : CERTIFICATIONS.filter(c => c.domain === selectedDomain);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Banner */}
      <div className="relative rounded-3xl p-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white shadow-xl overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-emerald-200">
            <Award className="h-3.5 w-3.5" /> Authentic Industry Courses & Certification Hub
          </div>
          <h1 className="text-3xl font-black tracking-tight">Real-World Tech Courses & Certifications</h1>
          <p className="text-emerald-100/90 text-sm max-w-2xl leading-relaxed">
            Direct enrollment links to official certifications and industry courses across Cloud, Full Stack Java, AI/ML, Data Analytics, System Design & Cybersecurity.
          </p>
        </div>
      </div>

      {/* Domain Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider flex items-center gap-1 mr-2">
          <Filter className="h-3.5 w-3.5" /> Domain:
        </span>
        {['All', 'Cloud & DevOps', 'Full Stack & Java', 'AI & Machine Learning', 'Data Analytics & SQL', 'Cybersecurity & Systems'].map((domain) => (
          <button
            key={domain}
            onClick={() => setSelectedDomain(domain)}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all shrink-0 ${
              selectedDomain === domain
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50'
            }`}
          >
            {domain}
          </button>
        ))}
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert) => (
          <Card key={cert.id} className="border border-zinc-200/80 dark:border-zinc-800 rounded-3xl shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between p-5">
            <CardHeader className="space-y-3 p-0 pb-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {cert.domain}
                </span>
                <span className="text-xs font-black text-amber-500 flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" /> {cert.salaryBoost}
                </span>
              </div>
              <div>
                <CardTitle className="text-base font-black leading-snug">{cert.title}</CardTitle>
                <CardDescription className="text-xs font-semibold text-zinc-500 mt-1 flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-emerald-500" /> {cert.provider}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 p-0 pt-2">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-zinc-400">Core Syllabus Topics:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400">Est. Prep: {cert.duration}</span>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition-all"
                >
                  Enroll Now <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesCertification;
