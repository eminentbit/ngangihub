import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Sidebar from '../../components/dashboard.admin.components/Sidebar';
import Header from '../../components/dashboard.admin.components/Header';

interface UserProfile {
  name: string;
  avatarUrl?: string;
}

interface Notification {
  id: number;
  user: UserProfile;
  message: string;
  time: string;
  isRead: boolean;
}

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Unread', value: 'unread' },
  { label: 'Read', value: 'read' },
];

const sampleNotifications: Notification[] = [
  { id: 1, user: { name: 'Alice Johnson' }, message: 'New member joined your Njangi', time: '5m ago', isRead: false },
  { id: 2, user: { name: 'Michael Smith' }, message: 'Monthly contribution due tomorrow', time: '2h ago', isRead: false },
  { id: 3, user: { name: 'System' }, message: 'Group settings updated', time: '1d ago', isRead: true },
  // Add more as needed
];

const NotificationsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('notifications');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filter, setFilter] = useState('all');

  // Fetch notifications (simulate API)
  useEffect(() => {
    setNotifications(sampleNotifications);
  }, []);

  // Theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("dark-mode", "true");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("dark-mode", "false");
    }
  }, [isDarkMode]);

  // Filtered notifications
  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.isRead;
    if (filter === 'read') return n.isRead;
    return true;
  });

  // Actions
  const markAllAsRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));

  const markAsRead = (id: number) =>
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );

  const markAsUnread = (id: number) =>
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: false } : n))
    );

  // Sidebar toggle
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="flex h-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onToggle={toggleSidebar}
        notifications={[]}
        onClose={toggleSidebar}
      />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>

        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
            onClick={toggleSidebar}
            aria-label="Close sidebar overlay"
          />
        )}

        {/* Header */}
        <Header darkMode={isDarkMode} setDarkMode={setIsDarkMode} />

        {/* Content */}
        <main className="pt-20 pb-8 px-2 md:px-6 overflow-auto min-h-[80vh]">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 md:p-8 mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                Notifications
              </h2>
              <div className="flex items-center mt-4 sm:mt-0 gap-2">
                {FILTERS.map(f => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold border transition 
                      ${filter === f.value
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-900'
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
                <button
                  onClick={markAllAsRead}
                  className="ml-2 px-3 py-1 rounded-full text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-800 transition"
                >
                  Mark all as read
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredNotifications.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                  No notifications.
                </div>
              )}
              {filteredNotifications.map(n => (
                <div
                  key={n.id}
                  className={`flex items-start space-x-4 p-4 rounded-xl shadow-sm transition-colors group relative overflow-hidden
                    ${n.isRead
                      ? 'bg-white dark:bg-gray-700'
                      : 'bg-indigo-50 dark:bg-indigo-900 border-l-4 border-blue-500'
                    } animate-fadein`}
                >
                  <div className="flex-shrink-0">
                    {n.user.avatarUrl ? (
                      <img
                        src={n.user.avatarUrl}
                        alt={n.user.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`text-gray-800 dark:text-gray-100 ${n.isRead ? '' : 'font-semibold'}`}>
                          {n.message}
                        </span>
                        <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                          — {n.user.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 ml-1">
                        {n.isRead ? (
                          <button
                            onClick={() => markAsUnread(n.id)}
                            className="text-yellow-500 hover:text-yellow-700 transition"
                            title="Mark as unread"
                          >
                            <FaCheckCircle />
                          </button>
                        ) : (
                          <button
                            onClick={() => markAsRead(n.id)}
                            className="text-blue-600 hover:text-blue-800 transition"
                            title="Mark as read"
                          >
                            <FaTimesCircle />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <style>{`
        .animate-fadein {
          animation: fadeIn .25s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

export default NotificationsPage;