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
  {
    id: 1,
    type: "Contribution",
    user: "John Doe",
    date: "2025-04-15T10:30:00Z",
    amount: 25000,
    note: "Monthly contribution received."
  },
  {
    id: 2,
    type: "Meeting",
    user: "Group",
    date: "2025-04-20T18:00:00Z",
    amount: null,
    note: "Monthly meeting held at City Center."
  },
  {
    id: 3,
    type: "Withdrawal",
    user: "Alice Smith",
    date: "2025-03-29T13:45:00Z",
    amount: 40000,
    note: "Emergency funds disbursed."
  },
  {
    id: 4,
    type: "New Member",
    user: "Samuel B.",
    date: "2025-03-10T09:00:00Z",
    amount: null,
    note: "Joined the group."
  },
];

function formatDate(dateStr: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

const GroupOverviewPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('/overview');
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        onToggle={toggleSidebar}
        onTabChange={setActiveTab}
      />

      {/* Mobile toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-full p-2 text-gray-700 dark:text-gray-200 lg:hidden z-30"
        aria-label="Toggle Sidebar"
      >
        <FaBars size={20} />
      </button>
      <div className={`fixed inset-0 bg-black bg-opacity-50  transition-opacity duration-200 ${!isSidebarOpen ? 'opacity-100' : 'opacity-0'} lg:hidden z-20`} onClick={toggleSidebar} />
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0  bg-white dark:bg-gray-800 shadow-md transition-transform duration-200 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-20`}>
        <div className="flex items-center justify-between p-4 h-10 max-w-5xl mx-auto">
          <button onClick={toggleSidebar} className="lg:hidden text-gray-700 dark:text-gray-200" aria-label="Toggle Sidebar">
            <FaBars size={20} />
          </button>
        </div>
      </header>
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 text-gray-700 dark:text-gray-200 z-30"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      <main className={`flex-1 p-2 sm:p-4 md:p-8 transition-all duration-200 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <div className="max-w-5xl mx-auto">
          <header className="mb-6 sm:mb-8 px-2 sm:px-0">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-gray-100">Group Overview</h1>
            <p className="text-black dark:text-gray-300 text-sm sm:text-base">Summary and recent activities for your Njangi circle</p>
          </header>

          {/* Group Info Cards */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 mb-6 sm:mb-8 px-2 sm:px-0">
            {/* Group Profile */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center gap-3 mb-1 sm:mb-2">
                <FaUsers className="text-blue-500 text-xl sm:text-2xl" />
                <h2 className="text-lg sm:text-xl font-bold text-blue-800 dark:text-gray-100">{groupInfo.name}</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{groupInfo.description}</p>
              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
                <span className="flex items-center gap-1"><FaCalendarAlt className="text-blue-400" /> Created: {formatDate(groupInfo.createdAt)}</span>
                <span className="flex items-center gap-1"><FaUsers className="text-blue-400" /> Members: {groupInfo.membersCount}</span>
              </div>
            </div>
            {/* Group Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
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

          {/* Group Rules */}
          <div className="mb-8 sm:mb-10 px-2 sm:px-0">
            <h3 className="text-base sm:text-lg font-bold text-blue-700 dark:text-gray-100 mb-1 sm:mb-2">Group Rules</h3>
            <ul className="list-disc pl-5 sm:pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              {groupInfo.rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>

          {/* Recent Activities */}
          <section className="px-0">
            <h3 className="text-base sm:text-lg font-bold text-blue-700 dark:text-gray-100 mb-3 sm:mb-4 px-2 sm:px-0">Recent Activities</h3>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-blue-100 dark:border-gray-700">
                    <th className="py-3 px-4 sm:px-6 text-xs font-bold text-blue-500 dark:text-gray-400 uppercase tracking-widest text-left">Date</th>
                    <th className="py-3 px-4 sm:px-6 text-xs font-bold text-blue-500 dark:text-gray-400 uppercase tracking-widest text-left">Type</th>
                    <th className="py-3 px-4 sm:px-6 text-xs font-bold text-blue-500 dark:text-gray-400 uppercase tracking-widest text-left">Member</th>
                    <th className="py-3 px-4 sm:px-6 text-xs font-bold text-blue-500 dark:text-gray-400 uppercase tracking-widest text-left">Amount</th>
                    <th className="py-3 px-4 sm:px-6 text-xs font-bold text-blue-500 dark:text-gray-400 uppercase tracking-widest text-left">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 px-6 text-center text-blue-400 dark:text-gray-500">
                        No recent activities.
                      </td>
                    </tr>
                  ) : recentActivities.map(act => (
                    <tr key={act.id} className="hover:bg-blue-50 dark:hover:bg-gray-700 transition">
                      <td className="py-3 px-4 sm:px-6 text-xs sm:text-base">{formatDate(act.date)}</td>
                      <td className="py-3 px-4 sm:px-6 text-xs sm:text-base">{act.type}</td>
                      <td className="py-3 px-4 sm:px-6 text-xs sm:text-base">{act.user}</td>
                      <td className="py-3 px-4 sm:px-6 text-xs sm:text-base">
                        {act.amount
                          ? <span className={`font-semibold ${act.type === "Withdrawal" ? "text-red-600 dark:text-red-400" : "text-green-700 dark:text-green-300"}`}>
                              ₦{act.amount.toLocaleString()}
                            </span>
                          : "--"}
                      </td>
                      <td className="py-3 px-4 sm:px-6 text-xs sm:text-base">{act.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Card List */}
            <div className="sm:hidden space-y-3">
              {recentActivities.length === 0 ? (
                <div className="py-6 px-4 rounded-lg bg-white dark:bg-gray-800 text-center text-blue-400 dark:text-gray-500 shadow">
                  No recent activities.
                </div>
              ) : recentActivities.map(act => (
                <div key={act.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-300">{act.type}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(act.date)}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-200">By: {act.user}</div>
                  {act.amount && (
                    <div className={`text-sm ${act.type === "Withdrawal" ? "text-red-600 dark:text-red-400" : "text-green-700 dark:text-green-300"} font-semibold`}>
                      ₦{act.amount.toLocaleString()}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 dark:text-gray-400">{act.note}</div>
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