import React, { useState, useEffect } from 'react';
import { FaChartLine, FaBars, FaSun, FaMoon, FaUsers, FaMoneyBillWave, FaChartPie } from 'react-icons/fa';
import Sidebar from '../../components/dashboard.admin.components/Sidebar';
import ActivityChart from '../../components/dashboard.admin.components/ActivityChart';
import ContributionChart from '../../components/dashboard.admin.components/ContributionChart';

const StatisticsPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('/statistics');
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const summary = [
    {
      icon: <FaUsers className="text-blue-500" size={28} />,
      label: 'Active Members',
      value: 124,
    },
    {
      icon: <FaMoneyBillWave className="text-green-500" size={28} />,
      label: 'Total Contributions',
      value: "₦1,250,000",
    },
    {
      icon: <FaChartPie className="text-purple-500" size={28} />,
      label: 'Monthly Growth',
      value: '8.2%',
    },
  ];

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        onToggle={toggleSidebar}
        onTabChange={setActiveTab}
      />

      {/* Mobile toggles */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow text-gray-700 dark:text-gray-200 lg:hidden z-30 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
        title="Toggle Sidebar"
      >
        <FaBars size={20} />
      </button>
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 text-gray-700 dark:text-gray-200 z-30 hover:text-blue-500 dark:hover:text-yellow-400 transition"
        title="Toggle Dark Mode"
      >
        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      <main className={`flex-1 p-4 md:p-8 transition-all duration-200 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>        
        <div className="max-w-7xl mx-auto">

          {/* Page Meta/Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-tracking-tight text-blue-700 dark:text-white flex items-center">
                <FaChartLine className="mr-3 text-blue-600 dark:text-blue-400" size={30} />
                Statistics Dashboard
              </h1>
              <p className="mt-2 text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
                Gain insights into the financial and activity trends of your <b>Njangi circle</b>. Explore real-time analytics and make data-driven decisions for your community.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 text-xs font-semibold">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Summary Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {summary.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-5 border-b-4 border-blue-100 dark:border-blue-900">
                <div className="bg-blue-50 dark:bg-gray-700 rounded-full p-3">
                  {item.icon}
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-7 transition hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 tracking-tight">
                📈 Activity Over Time
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Track the participation and engagement levels of your members over various timeframes.
              </p>
              <ActivityChart />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-7 transition hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 tracking-tight">
                💰 Contributions Breakdown
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Analyze the sources and distribution of contributions for deeper financial insights.
              </p>
              <ContributionChart />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default StatisticsPage;