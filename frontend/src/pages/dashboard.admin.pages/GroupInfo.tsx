import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaUsers, FaCalendarAlt, FaCogs } from 'react-icons/fa';
import Sidebar from '../../components/dashboard.admin.components/Sidebar';
import MemberRow from '../../components/dashboard.admin.components/MemberRow';
import MemberCard from '../../components/dashboard.admin.components/MemberCard';
import Header from '../../components/dashboard.admin.components/Header';

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
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('');

const group = {
  name: 'Njangi Circle',
  description:
    'A trusted community savings group for mutual financial support and social bonding among friends and family.',
  createdOn: 'January 10, 2024',
  membersCount: 12,
  nextMeeting: 'May 15, 2025',
};

const GroupInfoPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('/group');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: 'John Doe', role: 'Organizer', status: 'Active', initials: '' },
    { id: 2, name: 'Alice Smith', role: 'Treasurer', status: 'Active', initials: '' },
    { id: 3, name: 'Michael Brown', role: 'Member', status: 'Active', initials: '' },
    { id: 4, name: 'Linda Carter', role: 'Member', status: 'Inactive', initials: '' },
  ]);

  // Initialize initials
  useEffect(() => {
    setMembers(prev => prev.map(m => ({ ...m, initials: getInitials(m.name) })));
  }, []);

  // Lock scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto';
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div
      className={`flex min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200 ${
        isDarkMode ? 'dark' : ''
      }`}
    >
      {document.documentElement.classList.toggle('dark', isDarkMode)}

      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onToggle={toggleSidebar}
          notifications={[]}
          onClose={toggleSidebar}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header darkMode={isDarkMode} setDarkMode={setIsDarkMode} />

        <main className="flex-1 pt-20 px-4 sm:px-6 md:px-8 lg:px-12 transition-all duration-200">
          <div className="max-w-4xl mx-auto">
            {/* Group Header */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="flex items-center text-3xl font-bold text-blue-700 dark:text-gray-100 mb-2">
                    <FaInfoCircle className="mr-2" /> {group.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">{group.description}</p>
                </div>
                <button className="mt-4 md:mt-0 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
                  Join Group
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center p-4 bg-white dark:bg-gray-700 rounded">
                  <FaUsers className="text-blue-500 text-2xl mr-3" />
                  <div>
                    <p className="text-xl font-semibold dark:text-gray-100">
                      {group.membersCount}
                    </p>
                    <p className="text-sm text-blue-400 dark:text-blue-300">Members</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-white dark:bg-gray-700 rounded">
                  <FaCalendarAlt className="text-green-500 text-2xl mr-3" />
                  <div>
                    <p className="text-xl font-semibold dark:text-gray-100">
                      {group.nextMeeting}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Next Meeting</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-white dark:bg-gray-700 rounded">
                  <FaCalendarAlt className="text-blue-500 text-2xl mr-3" />
                  <div>
                    <p className="text-xl font-semibold dark:text-gray-100">
                      {group.createdOn}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Created On</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-white dark:bg-gray-700 rounded">
                  <FaCogs className="text-blue-500 text-2xl mr-3" />
                  <div>
                    <p className="text-xl font-semibold dark:text-gray-100">Settings</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Manage Settings</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Members List */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-green-700 dark:text-gray-100 mb-4">
                Members
              </h2>

              {/* Table (Desktop) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      {['Initials', 'Name', 'Role', 'Status', 'Actions'].map(col => (
                        <th
                          key={col}
                          className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {members.map(member => (
                      <MemberRow
                        key={member.id}
                        member={member}
                        onDelete={id => setMembers(prev => prev.filter(m => m.id !== id))}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cards (Mobile) */}
              <div className="md:hidden space-y-4">
                {members.map(member => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    onDelete={(id: number) => setMembers(prev => prev.filter(m => m.id !== id))}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GroupInfoPage;
