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

const MemberCard: React.FC<{ member: Member; onDelete: (id: number) => void }> = ({ member, onDelete }) => (
  <div className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg shadow p-3 mb-2">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold">
        {member.initials}
      </div>
      <div>
        <div className="font-semibold">{member.name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-300">{member.role}</div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold mt-1 inline-block ${
          member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>{member.status}</span>
      </div>
    </div>
    <button onClick={() => onDelete(member.id)} className="text-red-600 hover:text-red-800">Remove</button>
  </div>
);

const getInitials = (name: string): string =>
  name.split(' ').map(n => n[0]?.toUpperCase() ?? '').join('');

const GroupInfoPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('/group');
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
  }, [isSidebarOpen]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

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
  ]);

  useEffect(() => {
    setMembers(ms => ms.map(m => ({ ...m, initials: getInitials(m.name) })));
  }, []);

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900 relative">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:translate-x-0 w-64`}
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
          className="fixed inset-0 z-30 bg-black bg-opacity-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Topbar */}
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow">
        <button onClick={toggleSidebar} className="text-gray-700 dark:text-gray-200" aria-label="Toggle sidebar">
          <FaBars size={20} />
        </button>
        <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-200" aria-label="Toggle dark mode">
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 pt-16 px-4 sm:px-6 md:px-10 lg:px-12 transition-all duration-200">
        <div className="max-w-4xl mx-auto">
          {/* Group Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-gray-100 flex items-center">
                  <FaInfoCircle className="mr-2" /> {group.name}
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{group.description}</p>
              </div>
              <button className="mt-4 md:mt-0 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
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
                <div>
                  <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">Settings</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Manage Settings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Members List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
            <h2 className="text-2xl font-bold text-green-700 dark:text-gray-100 mb-4">Members</h2>
            <div>
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Initials</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Name</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Role</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Status</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map(member => (
                      <MemberRow key={member.id} member={member} onDelete={id => setMembers(members.filter(m => m.id !== id))} />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden">
                {members.map(member => (
                  <MemberCard key={member.id} member={member} onDelete={id => setMembers(members.filter(m => m.id !== id))} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GroupInfoPage;
