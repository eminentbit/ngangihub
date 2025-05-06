import React, { useState, useEffect } from 'react';
import {
  FaChartLine,
  FaBars,
  FaSun,
  FaMoon,
  FaUsers,
  FaMoneyBillWave,
  FaChartPie,
} from 'react-icons/fa';
import Sidebar from '../../components/dashboard.admin.components/Sidebar';
import ActivityChart from '../../components/dashboard.admin.components/ActivityChart';
import ContributionChart from '../../components/dashboard.admin.components/ContributionChart';

const StatisticsPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('/statistics');
  const [isDarkMode, setDarkMode] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
  }, [isSidebarOpen]);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const summary = [
    { icon: <FaUsers size={28} />,       label: 'Active Members',       value: 124 },
    { icon: <FaMoneyBillWave size={28} />, label: 'Total Contributions',  value: '₦1,250,000' },
    { icon: <FaChartPie size={28} />,      label: 'Monthly Growth',      value: '8.2%' },
  ];

  const toggleSidebar = () => setSidebarOpen(v => !v);
  const toggleDarkMode = () => setDarkMode(v => !v);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0
          w-64
        `}
        style={{ maxWidth: '16rem' }}
      >
        <Sidebar
          isOpen={isSidebarOpen || isDesktop}
          activeTab={activeTab}
          onToggle={toggleSidebar}
          onTabChange={setActiveTab}
          onClose={toggleSidebar}
        />
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Topbar */}
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow">
        {/* add type="button" to avoid default submit behavior */}
        <button type="button" onClick={toggleSidebar} className="text-gray-700 dark:text-gray-200">
          <FaBars size={20} />
        </button>
        <button type="button" onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-200">
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      {/* MAIN */}
      <main className="flex-1 pt-20 px-2 sm:px-4 md:px-8 transition-all duration-200">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-3xl tracking-tight text-blue-700 font-bold dark:text-white flex items-center">
                <FaChartLine className="mr-3 text-2xl sm:text-4xl text-blue-700 font-bold mb-1 " size={30} />
                Statistics Dashboard
              </h1>
              <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
                Gain insights into the financial and activity trends of your <b>Njangi circle</b>. Explore real-time analytics and make data-driven decisions for your community.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 text-xs font-semibold">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>

          {/* Summary Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {summary.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-4 sm:p-5 border-b-4 border-blue-100 dark:border-blue-900"
              >
                <div className="bg-blue-50 dark:bg-gray-700 rounded-full p-2 sm:p-3">
                  {item.icon}
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-7 transition hover:shadow-xl mb-4 lg:mb-0">
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 tracking-tight">
                📈 Activity Over Time
              </h2>
              <ActivityChart />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-7 transition hover:shadow-xl">
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 tracking-tight">
                💰 Contributions Breakdown
              </h2>
              <ContributionChart />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default StatisticsPage;
