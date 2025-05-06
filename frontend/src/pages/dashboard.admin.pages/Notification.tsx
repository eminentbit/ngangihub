import React, { useState, useEffect } from 'react';
import { FaBars, FaBell, FaCheckCircle, FaTimesCircle, FaUserCircle, FaSun, FaMoon } from 'react-icons/fa';
import Sidebar from '../../components/dashboard.admin.components/Sidebar';

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

const NotificationsPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('notifications');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fetch sample notifications
  useEffect(() => {
    setNotifications([
      { id: 1, user: { name: 'Alice Johnson' }, message: 'New member joined your Njangi', time: '5m ago', isRead: false },
      { id: 2, user: { name: 'Michael Smith' }, message: 'Monthly contribution due tomorrow', time: '2h ago', isRead: false },
      { id: 3, user: { name: 'System' }, message: 'Group settings updated', time: '1d ago', isRead: true },
    ]);
  }, []);

  // Toggle sidebar and dark mode
  const toggleSidebar = () => setIsOpen(prev => !prev);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Apply theme class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  const markAsRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));

  return (
    <div className="flex h-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-56 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:translate-x-0`}
      >
        <Sidebar
          isOpen={isOpen}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          notifications={notifications}
          onToggle={toggleSidebar}
          onClose={() => setIsOpen(false)}
        />
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-50">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-20 bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
                aria-label="Toggle sidebar"
              >
                <FaBars size={20} className="text-gray-700 dark:text-gray-200" />
              </button>
              <h1 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 flex items-center">
                <FaBell className="mr-2" /> Notifications
              </h1>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <FaSun size={20} className="text-yellow-400" />
              ) : (
                <FaMoon size={20} className="text-gray-700" />
              )}
            </button>
          </div>
        </header>

        {/* Content area */}
        <main className="pt-20 pb-8 px-6 overflow-auto">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                All Notifications
              </h2>
              <button
                onClick={markAllAsRead}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Mark all as read
              </button>
            </div>

            <div className="space-y-4">
              {notifications.map(n => (
                <div
                  key={n.id}
                  className={`flex items-start space-x-4 p-4 rounded-lg shadow-sm transition-colors ${
                    n.isRead ? 'bg-white dark:bg-gray-700' : 'bg-indigo-50 dark:bg-indigo-900'
                  }`}
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
                      <p className={`text-gray-800 dark:text-gray-200 ${n.isRead ? '' : 'font-medium'}`}>{n.message}</p>
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 ml-2"
                        title={n.isRead ? 'Read' : 'Mark as read'}
                      >
                        {n.isRead ? <FaCheckCircle /> : <FaTimesCircle />}
                      </button>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;
