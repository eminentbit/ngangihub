import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaUsers, FaCalendarAlt, FaCogs, FaSun, FaMoon, FaBars } from 'react-icons/fa';
import Sidebar from '../../components/dashboard.admin.components/Sidebar';
import MemberRow from '../../components/dashboard.admin.components/MemberRow';

interface Member {
  id: number;
  initials: string;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map(n => n[0]?.toUpperCase() ?? '')
    .join('');

const GroupInfoPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('/group');
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  // Sample group data
  const group = {
    name: 'Njangi Circle',
    description: 'A trusted community savings group for mutual financial support and social bonding among friends and family.',
    createdOn: 'January 10, 2024',
    membersCount: 12,
    nextMeeting: 'May 15, 2025',
  };

  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: 'John Doe', role: 'Organizer', status: 'Active', initials: '' },
    { id: 2, name: 'Alice Smith', role: 'Treasurer', status: 'Active', initials: '' },
    { id: 3, name: 'Michael Brown', role: 'Member', status: 'Active', initials: '' },
    { id: 4, name: 'Linda Carter', role: 'Member', status: 'Inactive', initials: '' },
    // ... more members
  ]);

  // Initialize initials on mount
  useEffect(() => {
    setMembers(ms =>
      ms.map(m => ({ ...m, initials: getInitials(m.name) }))
    );
  }, []);

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        onToggle={toggleSidebar}
        onTabChange={setActiveTab}
      />

      {/* Mobile toggles */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-full p-2 text-gray-700 dark:text-gray-200 lg:hidden z-30"
        title="Toggle Sidebar"
      >
        <FaBars size={20} />
      </button>
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 text-gray-700 dark:text-gray-200 z-30"
        title="Toggle Dark Mode"
      >
        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      <main className={`flex-1 p-4 md:p-8 transition-all duration-200 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>        
        <div className="max-w-4xl mx-auto">
          {/* Group Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-blue-700 dark:text-gray-100 flex items-center">
                  <FaInfoCircle className="mr-2" /> {group.name}
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{group.description}</p>
              </div>
              <button className="mt-4 md:mt-0 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600">
                Join Group
              </button>
            </div>
            {/* Stats */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center p-4 bg-white dark:bg-gray-700 rounded">
                <FaUsers className="text-blue-500 text-2xl mr-3" />
                <div>
                  <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">{group.membersCount}</p>
                  <p className="text-sm text-blue-400 dark:text-blue-300">Members</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-green-50 dark:bg-gray-700 rounded">
                <FaCalendarAlt className="text-green-500 text-2xl mr-3" />
                <div>
                  <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">{group.nextMeeting}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Next Meeting</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-green-50 dark:bg-gray-700 rounded">
                <FaCalendarAlt className="text-blue-500 text-2xl mr-3" />
                <div>
                  <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">{group.createdOn}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Created On</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-green-50 dark:bg-gray-700 rounded">
                <FaCogs className="text-blue-500 text-2xl mr-3" />
                <div className='text-green-500'>
                  <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">Settings</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Manage Settings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Members List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
            <h2 className="text-2xl font-bold text-green-700 dark:text-gray-100 mb-4">Members</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                  <tr className="border-b border-gray-200 dark:border-gray-700 block md:table-row">
                    {['Initials','Name','Role','Status'].map(col => (
                      <th key={col} className="px-4 py-2 text-left block md:table-cell text-sm font-medium text-gray-600 dark:text-gray-300">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="block md:table-row-group">
                  {members.map(member => (
                    <MemberRow key={member.id} member={member} onDelete={(id) => setMembers(members.filter(m => m.id !== id))} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GroupInfoPage;
