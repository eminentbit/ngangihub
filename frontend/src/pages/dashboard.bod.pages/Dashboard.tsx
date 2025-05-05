import React from 'react';
import Header from '../../components/dashboard.bod.components/Header';
import Sidebar from '../../components/dashboard.bod.components/Sidebar';
import BoardOverview from '../../components/dashboard.bod.components/BoardOverview';
import ResolutionVoting from '../../components/dashboard.bod.components/ResolutionVoting';
import AttendanceRate from '../../components/dashboard.bod.components/AttendanceRate';
import RecentResolutions from '../../components/dashboard.bod.components/RecentResolutions';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Board Dashboard</h1>
          <p className="text-gray-600 mb-4">Monitor board activities and make informed decisions.</p>
          <div className="flex space-x-4">
            <button className="bg-purple-600 text-white p-2 rounded">+ New Resolution</button>
            <button className="bg-purple-600 text-white p-2 rounded">📅 Schedule Meeting</button>
          </div>
          <BoardOverview />
          <div className="grid grid-cols-3 gap-4 mt-6">
            <ResolutionVoting />
            <AttendanceRate />
            <RecentResolutions />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;