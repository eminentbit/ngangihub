import React, { useState, useEffect } from 'react';
import { FaUsers, FaCalendarAlt, FaMoneyBillWave, FaSun, FaMoon, FaBars, FaRegClock } from 'react-icons/fa';
import Sidebar from '../../components/dashboard.admin.components/Sidebar';

const groupInfo = {
  name: "Njangi Legends",
  description: "A professional Njangi circle for business networking and mutual support.",
  createdAt: "2022-03-15",
  totalFunds: 420000,
  nextMeeting: "2025-05-20T18:00:00Z",
  membersCount: 16,
  rules: [
    "Monthly contributions are due every 15th.",
    "Late payment penalty is 5%.",
    "Meetings are held every 3rd Saturday.",
    "Absence without notice incurs a fine."
  ]
};

const recentActivities = [
  { id: 1, type: "Contribution", user: "John Doe", date: "2025-04-15T10:30:00Z", amount: 25000, note: "Monthly contribution received." },
  { id: 2, type: "Meeting",      user: "Group",    date: "2025-04-20T18:00:00Z", amount: null, note: "Monthly meeting held at City Center." },
  { id: 3, type: "Withdrawal",   user: "Alice Smith", date: "2025-03-29T13:45:00Z", amount: 40000, note: "Emergency funds disbursed." },
  { id: 4, type: "New Member",   user: "Samuel B.", date: "2025-03-10T09:00:00Z", amount: null, note: "Joined the group." },
];

function formatDate(dateStr: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

const GroupOverviewPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('/overview');
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
  }, [isSidebarOpen]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900 relative">
      {/* Sidebar (responsive) */}
      <div
        className={
          `fixed inset-y-0 left-0 z-40 transition-transform duration-300
           ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
           lg:static lg:translate-x-0 w-64`
        }
        style={{ maxWidth: '16rem' }}
      >
        <Sidebar
          isOpen={isSidebarOpen || window.innerWidth >= 1024}
          activeTab={activeTab}
          onToggle={toggleSidebar}
          onTabChange={setActiveTab}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Topbar */}
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow">
        <button onClick={toggleSidebar} className="text-gray-700 dark:text-gray-200" aria-label="Toggle Sidebar">
          <FaBars size={20} />
        </button>
        <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-200" aria-label="Toggle Dark Mode">
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 pt-20 px-2 sm:px-4 md:px-8 transition-all duration-200">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <header className="mb-6 sm:mb-8 px-1 sm:px-0">
            <h1 className="text-2xl sm:text-3xl text-blue-700 font-bold mb-1 ">Group Overview</h1>
            <p className="text-black dark:text-gray-300 text-xs sm:text-base">Summary and recent activities for your Njangi circle</p>
          </header>

          {/* Group Info Cards */}
          <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 mb-6 md:mb-8 px-1 md:px-0">
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 flex flex-col gap-2 sm:gap-3">
              <div className="flex items-center gap-3 mb-1 sm:mb-2">
                <FaUsers className="text-blue-500 text-xl sm:text-2xl" />
                <h2 className="text-base sm:text-xl font-bold text-blue-800 dark:text-gray-100">{groupInfo.name}</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{groupInfo.description}</p>
              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
                <span className="flex items-center gap-1"><FaCalendarAlt className="text-blue-400" /> Created: {new Date(groupInfo.createdAt).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><FaUsers className="text-blue-400" /> Members: {groupInfo.membersCount}</span>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 flex flex-col gap-3 sm:gap-6">
              <div className="flex items-center gap-3">
                <FaMoneyBillWave className="text-green-500 text-lg sm:text-xl" />
                <span className="text-base sm:text-lg font-semibold text-green-700 dark:text-green-300">₦{groupInfo.totalFunds.toLocaleString()}</span>
                <span className="ml-2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Total Funds</span>
              </div>
              <div className="flex items-center gap-3 mt-1 sm:mt-2">
                <FaRegClock className="text-indigo-500 text-lg sm:text-xl" />
                <span className="text-base sm:text-lg font-semibold text-indigo-700 dark:text-indigo-300">{formatDate(groupInfo.nextMeeting)}</span>
                <span className="ml-2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Next Meeting</span>
              </div>
            </div>
          </div>

          {/* Rules */}
          <div className="mb-8 sm:mb-10 px-1 sm:px-0">
            <h3 className="text-sm sm:text-lg font-bold text-blue-700 dark:text-gray-100 mb-1 sm:mb-2">Group Rules</h3>
            <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-xs sm:text-base">
              {groupInfo.rules.map((rule, idx) => <li key={idx}>{rule}</li>)}
            </ul>
          </div>

          {/* Activities */}
          <section>
            <h3 className="text-sm sm:text-lg font-bold text-blue-700 dark:text-gray-100 mb-3 sm:mb-4 px-1 sm:px-0">Recent Activities</h3>
            {/* Desktop */}
            <div className="hidden sm:block overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-blue-100 dark:border-gray-700">
                    <th className="py-3 px-4 sm:px-6 text-xs font-bold text-blue-500 dark:text-gray-400 uppercase text-left">Date</th>
                    <th className="py-3 px-4 sm:px-6 text-xs font-bold text-blue-500 dark:text-gray-400 uppercase text-left">Type</th>
                    <th className="py-3 px-4 sm:px-6 text-xs font-bold text-blue-500 dark:text-gray-400 uppercase text-left">Member</th>
                    <th className="py-3 px-4 sm:px-6 text-xs font-bold text-blue-500 dark:text-gray-400 uppercase text-left">Amount</th>
                    <th className="py-3 px-4 sm:px-6 text-xs font-bold text-blue-500 dark:text-gray-400 uppercase text-left">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map(act => (
                    <tr key={act.id} className="hover:bg-blue-50 dark:hover:bg-gray-700 transition">
                      <td className="py-3 px-4 sm:px-6 text-xs sm:text-base">{formatDate(act.date)}</td>
                      <td className="py-3 px-4 sm:px-6 text-xs sm:text-base">{act.type}</td>
                      <td className="py-3 px-4 sm:px-6 text-xs sm:text-base">{act.user}</td>
                      <td className="py-3 px-4 sm:px-6 text-xs sm:text-base">
                        {act.amount ? <span className={act.type === 'Withdrawal' ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-green-700 dark:text-green-300 font-semibold'}>₦{act.amount.toLocaleString()}</span> : '--'}
                      </td>
                      <td className="py-3 px-4 sm:px-6 text-xs sm:text-base">{act.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile */}
            <div className="sm:hidden space-y-3">
              {recentActivities.map(act => (
                <div key={act.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-300">{act.type}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(act.date)}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">By: {act.user}</span>
                  {act.amount && <span className={act.type === 'Withdrawal' ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-green-700 dark:text-green-300 font-semibold'}>₦{act.amount.toLocaleString()}</span>}
                  <span className="text-xs text-gray-500 dark:text-gray-400">{act.note}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default GroupOverviewPage;
