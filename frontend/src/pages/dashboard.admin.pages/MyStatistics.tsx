import React, { useState, useEffect } from 'react';
import {
  FaChartLine,
  FaUsers,
  FaMoneyBillWave,
  FaChartPie,
} from 'react-icons/fa';
import Sidebar from '../../components/dashboard.admin.components/Sidebar';
import ActivityChart from '../../components/dashboard.admin.components/ActivityChart';
import ContributionChart from '../../components/dashboard.admin.components/ContributionChart';
import Header from '../../components/dashboard.admin.components/Header';

const StatisticsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [, setActiveTab] = useState<string>('/statistics');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Toggle Tailwind dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const summary = [
    { icon: <FaUsers size={28} />,       label: 'Active Members',       value: 124 },
    { icon: <FaMoneyBillWave size={28} />, label: 'Total Contributions',  value: 'CFA 1,250,000' },
    { icon: <FaChartPie size={28} />,      label: 'Monthly Growth',      value: '8.2%' },
  ];

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="flex h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200 overflow-hidden">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onTabChange={setActiveTab}
        onToggle={toggleSidebar}
        notifications={[]}
        onClose={toggleSidebar}
      />

      {/* Content panel */}
      <div
        className={`
          flex flex-col flex-1 h-full
          ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}
          transition-all duration-300
          overflow-y-auto
        `}
      >
        {/* Sticky Header */}
        <Header
          darkMode={isDarkMode}
          setDarkMode={setIsDarkMode}
          someStyles={`${!isSidebarOpen ? "ml-10" : "ml-0"}`}
        />

        {/* Scrollable Main */}
        <main className="flex-1 pt-20 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Page Title */}
            <section className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
              <div>
                <h1 className="flex items-center text-3xl font-bold text-blue-700 dark:text-gray-100">
                  <FaChartLine className="mr-2" size={30} /> Statistics Dashboard
                </h1>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Gain insights into your Njangi circle’s performance with real-time metrics and charts.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 text-xs font-semibold">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </section>

            {/* Summary Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {summary.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-lg shadow p-5 hover:shadow-lg transition"
                >
                  <div className="p-2 bg-blue-50 dark:bg-gray-700 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xl font-semibold dark:text-gray-100">{item.value}</p>
                    <p className="text-sm text-blue-400 dark:text-blue-300">{item.label}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* Charts */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold dark:text-gray-100 mb-4">
                  📈 Activity Over Time
                </h2>
                <ActivityChart />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold dark:text-gray-100 mb-4">
                  💰 Contributions Breakdown
                </h2>
                <ContributionChart />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StatisticsPage;
