import React, { useEffect } from 'react';
import { JobTracker } from '../components/dashboard/JobTracker';

export const JobTrackerPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Job Application Tracker | CareerPilot';
    return () => { document.title = 'CareerPilot'; };
  }, []);

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">Job Application Tracker</h1>
        <p className="text-slate-500 mt-1 font-medium">Track your active applications across LinkedIn, Indeed, Naukri & Wellfound.</p>
      </div>

      <JobTracker />
    </div>
  );
};

export default JobTrackerPage;
