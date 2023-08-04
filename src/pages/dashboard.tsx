import { DashboardCard } from '@/components/dashboard';
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <div className="h-screen mx-auto">
        <div className="flex items-center justify-center h-full">
          <DashboardCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;