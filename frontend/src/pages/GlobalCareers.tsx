import React, { useState } from 'react';
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
    <div className="space-y-8 pb-12 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-8 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white shadow-xl overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-sky-200">
            <Globe className="h-3.5 w-3.5" /> International Study & Global Careers Hub
          </div>
          <h1 className="text-3xl font-black tracking-tight">International Study & Global Remote Careers</h1>
          <p className="text-sky-100/90 text-sm max-w-2xl leading-relaxed">
            Official government immigration portals, top international study abroad networks, and live global tech recruitment agencies.
          </p>
        </div>
      </div>

      {/* Global Salary Converter Calculator */}
      <Card className="border border-zinc-200/80 dark:border-zinc-800 rounded-3xl shadow-sm bg-gradient-to-br from-zinc-50 to-sky-50/30 dark:from-zinc-900 dark:to-sky-950/20">
        <CardHeader>
          <CardTitle className="text-base font-black flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-sky-600" /> Global Purchasing Power Parity (PPP) Salary Calculator
          </CardTitle>
          <CardDescription className="text-xs">Convert your current compensation to international global tech standards.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-zinc-500 uppercase mb-1">Your Current Salary (LPA INR)</label>
              <input
                type="number"
                value={indiaSalaryLPA}
                onChange={(e) => setIndiaSalaryLPA(Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2.5 text-sm font-black focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-zinc-500 uppercase mb-1">Target Global Benchmark</label>
              <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-sm font-black text-sky-600 dark:text-sky-400">
                {convertGlobalSalary()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Destinations Grid with Official Government Visa Portals */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-sky-500" /> Official Visa Pathways & Relocation Hubs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GLOBAL_DESTINATIONS.map((dest, idx) => (
            <Card key={idx} className="border border-zinc-200/80 dark:border-zinc-800 rounded-3xl shadow-sm hover:shadow-xl hover:border-sky-500/40 transition-all flex flex-col justify-between p-5">
              <CardHeader className="space-y-2 p-0 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{dest.flag}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    {dest.avgSalaryUSD}
                  </span>
                </div>
                <CardTitle className="text-base font-black flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-sky-500" /> {dest.country}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-0 pt-1">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-zinc-400 uppercase">Visa Pathway:</span>
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{dest.visaType}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-zinc-400 uppercase">Top Sponsoring Tech Companies:</span>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {dest.topSponsors.map((comp, cIdx) => (
                      <span key={cIdx} className="px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                    <Plane className="h-3.5 w-3.5" /> {dest.relocationPackage}
                  </span>
                  <a
                    href={dest.officialVisaLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-extrabold shadow-sm transition-all shrink-0"
                  >
                    Official Visa Portal <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Global Tech Recruitment Agencies */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-blue-500" /> Top Global Remote Tech Recruitment Agencies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GLOBAL_AGENCIES.map((agency, aIdx) => (
            <Card key={aIdx} className="border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-4 hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <h4 className="text-sm font-black text-zinc-900 dark:text-zinc-100">{agency.name}</h4>
                <p className="text-xs font-medium text-zinc-500 line-clamp-2">{agency.desc}</p>
                <a
                  href={agency.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:underline pt-1"
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
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-indigo-500" /> Official International Study Abroad Portals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STUDY_ABROAD_PORTALS.map((portal, pIdx) => (
            <Card key={pIdx} className="border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-zinc-900 dark:text-zinc-100">{portal.country}</h4>
                  <p className="text-xs font-medium text-zinc-500">{portal.desc}</p>
                </div>
                <a
                  href={portal.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-sm transition-all shrink-0"
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
