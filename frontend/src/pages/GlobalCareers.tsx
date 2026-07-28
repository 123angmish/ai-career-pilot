import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, DollarSign, Plane, MapPin, ExternalLink, Building2, GraduationCap, Briefcase } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';

interface GlobalOpportunity {
  country: string;
  flag: string;
  visaType: string;
  avgSalaryUSD: string;
  topSponsors: string[];
  officialVisaLink: string;
  relocationPackage: string;
}

const GLOBAL_DESTINATIONS: GlobalOpportunity[] = [
  {
    country: 'United States (Silicon Valley & NYC)',
    flag: '🇺🇸',
    visaType: 'H-1B / O-1 Extraordinary Ability / L-1 Intracompany',
    avgSalaryUSD: '$160,000 - $280,000 / yr',
    topSponsors: ['Google', 'Meta', 'Amazon AWS', 'Apple', 'Microsoft', 'Stripe'],
    officialVisaLink: 'https://www.uscis.gov/working-in-the-united-states',
    relocationPackage: 'Full Legal Visa & Flight Relocation Covered'
  },
  {
    country: 'Germany & European Union',
    flag: '🇩🇪',
    visaType: 'EU Blue Card (Fast-track Permanent Residency in 21 months)',
    avgSalaryUSD: '€85,000 - €140,000 / yr',
    topSponsors: ['Zalando', 'Delivery Hero', 'SAP', 'N26', 'BMW Tech'],
    officialVisaLink: 'https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card',
    relocationPackage: '€10,000 Relocation Allowance + Housing Support'
  },
  {
    country: 'United Kingdom (London)',
    flag: '🇬🇧',
    visaType: 'UK Skilled Worker Visa & Global Talent Tech Nation Visa',
    avgSalaryUSD: '£90,000 - £160,000 / yr',
    topSponsors: ['Revolut', 'Monzo', 'Bloomberg', 'DeepMind', 'Meta UK'],
    officialVisaLink: 'https://www.gov.uk/skilled-worker-visa',
    relocationPackage: 'Visa Fee Reimbursement + Temporary Flat Stay'
  },
  {
    country: 'Canada (Toronto & Vancouver)',
    flag: '🇨🇦',
    visaType: 'Global Skills Strategy (2-Week Work Permit) & Express Entry PR',
    avgSalaryUSD: '$120,000 - $190,000 CAD / yr',
    topSponsors: ['Shopify', 'Amazon Canada', 'Microsoft Vancouver', 'RBC Tech'],
    officialVisaLink: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html',
    relocationPackage: 'PR Fast-Track + Family Relocation Coverage'
  }
];

const GLOBAL_AGENCIES = [
  { name: 'Toptal Remote Network', desc: 'Top 3% Freelance & Full-time Engineers', link: 'https://www.toptal.com/' },
  { name: 'Turing US Remote', desc: 'Silicon Valley Remote Jobs for Global Talent', link: 'https://www.turing.com/' },
  { name: 'Wellfound Startups', desc: 'Vetted Startup Roles with Visa Sponsorship', link: 'https://wellfound.com/jobs' },
  { name: 'We Work Remotely', desc: 'Largest Global Remote Engineering Portal', link: 'https://weworkremotely.com/' },
  { name: 'Arc.dev Developer Jobs', desc: 'Remote Software Developer Network', link: 'https://arc.dev/' }
];

const STUDY_ABROAD_PORTALS = [
  { country: 'Germany (DAAD)', desc: 'Official German Higher Education & tuition-free MS', link: 'https://www.daad.de/en/' },
  { country: 'USA (EducationUSA)', desc: 'Official State Dept Higher Education Portal', link: 'https://educationusa.state.gov/' },
  { country: 'UK (British Council)', desc: 'Official British Council Study UK Network', link: 'https://study-uk.britishcouncil.org/' },
  { country: 'US News University Rankings', desc: 'World CS & AI University Ranking Database', link: 'https://www.usnews.com/education/best-global-universities/computer-science' }
];

export const GlobalCareers: React.FC = () => {
  const [indiaSalaryLPA, setIndiaSalaryLPA] = useState<number>(25);

  const convertGlobalSalary = () => {
    const baseUSD = Math.round(indiaSalaryLPA * 3500);
    return `$${baseUSD.toLocaleString()} USD / yr`;
  };

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl p-8 bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 text-white border border-slate-200 shadow-xl overflow-hidden"
      >
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-extrabold uppercase tracking-widest text-sky-100">
            <Globe className="h-3.5 w-3.5" /> International Study & Global Careers Hub
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight font-display text-white">
            International Study & Global Remote Careers
          </h1>
          <p className="text-sky-100 text-sm max-w-2xl leading-relaxed font-medium">
            Official government immigration portals, top international study abroad networks, and live global tech recruitment agencies.
          </p>
        </div>
      </motion.div>

      {/* Global Salary Converter Calculator */}
      <Card className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-base font-extrabold flex items-center gap-2.5 text-slate-900 font-display">
            <div className="p-2 rounded-xl bg-sky-50 border border-sky-100 text-sky-600">
              <DollarSign className="h-4 w-4" />
            </div>
            Global Purchasing Power Parity (PPP) Salary Calculator
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">Convert your current compensation to international global tech benchmarks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1.5">Your Current Salary (LPA INR)</label>
              <input
                type="number"
                value={indiaSalaryLPA}
                onChange={(e) => setIndiaSalaryLPA(Number(e.target.value))}
                className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm font-extrabold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1.5">Target Global Benchmark</label>
              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100 text-sm font-extrabold text-sky-700">
                {convertGlobalSalary()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Destinations Grid with Official Government Visa Portals */}
      <div className="space-y-4">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-sky-600" /> Official Visa Pathways & Relocation Hubs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GLOBAL_DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <Card className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="space-y-3 p-0 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{dest.flag}</span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
                      {dest.avgSalaryUSD}
                    </span>
                  </div>
                  <CardTitle className="text-base font-extrabold flex items-center gap-2 text-slate-900 font-display">
                    <MapPin className="h-4 w-4 text-sky-600" /> {dest.country}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-0 pt-1">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Visa Pathway:</span>
                    <p className="text-xs font-bold text-slate-800">{dest.visaType}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Top Sponsoring Tech Companies:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {dest.topSponsors.map((comp, cIdx) => (
                        <span key={cIdx} className="px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-sky-700 flex items-center gap-1.5">
                      <Plane className="h-3.5 w-3.5" /> {dest.relocationPackage}
                    </span>
                    <a
                      href={dest.officialVisaLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-extrabold shadow-sm transition-all shrink-0"
                    >
                      Official Visa Portal <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Global Tech Recruitment Agencies */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-indigo-600" /> Top Global Remote Tech Recruitment Agencies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GLOBAL_AGENCIES.map((agency, aIdx) => (
            <Card key={aIdx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="space-y-2">
                <h4 className="text-sm font-extrabold text-slate-900 font-display">{agency.name}</h4>
                <p className="text-xs font-medium text-slate-500 line-clamp-2">{agency.desc}</p>
                <a
                  href={agency.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 pt-1 transition-colors"
                >
                  Visit Portal <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Study Abroad University Networks */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-purple-600" /> Official International Study Abroad Portals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STUDY_ABROAD_PORTALS.map((portal, pIdx) => (
            <Card key={pIdx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-slate-900 font-display">{portal.country}</h4>
                  <p className="text-xs font-medium text-slate-500">{portal.desc}</p>
                </div>
                <a
                  href={portal.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold shadow-sm transition-all shrink-0"
                >
                  Apply Portal <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalCareers;
