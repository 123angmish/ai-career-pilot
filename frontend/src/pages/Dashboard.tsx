import React from 'react';
import { useAuth } from '../context/AuthContext';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { StatisticsCards } from '../components/dashboard/StatisticsCards';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { AISuggestions } from '../components/dashboard/AISuggestions';
import { JobTracker } from '../components/dashboard/JobTracker';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const firstName = user?.firstName || 'Developer';

  React.useEffect(() => {
    document.title = 'Dashboard | CareerPilot';
    return () => { document.title = 'CareerPilot'; };
  }, []);

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      {/* 1. Welcome Banner */}
      <WelcomeBanner firstName={firstName} />

      {/* 2. Quick Actions Grid */}
      <QuickActions />

      {/* 3. Interactive Job Tracker Kanban */}
      <JobTracker />

      {/* 4. Statistics Section */}
      <StatisticsCards />

      {/* 5. Timeline and Recommendations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Timeline */}
        <RecentActivity />

        {/* AI Recommendations */}
        <AISuggestions />
      </div>
    </div>
  );
};

export default Dashboard;
