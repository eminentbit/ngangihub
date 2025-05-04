import React, { useState, useEffect } from 'react';
import { FaBars, FaBell, FaCheckCircle, FaTimesCircle, FaUserCircle } from 'react-icons/fa';
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

  // Simulate fetching notifications
  useEffect(() => {
    const fetchData = async () => {
      const data: Notification[] = [
        { id: 1, user: { name: 'Alice Johnson' }, message: 'New member joined your Njangi', time: '5m ago', isRead: false },
        { id: 2, user: { name: 'Michael Smith' }, message: 'Monthly contribution due tomorrow', time: '2h ago', isRead: false },
        { id: 3, user: { name: 'System' }, message: 'Group settings updated', time: '1d ago', isRead: true },
      ];
      setNotifications(data);
    };
    fetchData();
  }, []);

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const handleTabChange = (tab: string) => setActiveTab(tab);
  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  const markAsRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 text-gray-700 lg:hidden z-40"
        aria-label="Toggle Sidebar"
      >
        <FaBars size={24} />
      </button>

      <Sidebar
        isOpen={isOpen}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        notifications={notifications}
        onToggle={toggleSidebar}
        onClose={() => setIsOpen(false)}
      />

      <main className={`flex-1 transition-all duration-300 p-4 sm:p-6 md:p-8 overflow-auto lg:ml-${isOpen ? '64' : '0'}`}>
        <div className="max-w-full lg:max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <h1 className="flex items-center text-2xl sm:text-3xl font-semibold text-blue-700">
              <FaBell className="mr-2 text-indigo-600 " /> Notifications
            </h1>
            <button
              onClick={markAllAsRead}
              className="mt-4 sm:mt-0 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Mark all as read
            </button>
          </div>

          {/* Notification list */}
          <div className="grid gap-4">
            {notifications.length === 0 && (
              <p className="text-gray-600">You have no notifications.</p>
            )}
            {notifications.map(n => (
              <div
                key={n.id}
                className={`flex items-start space-x-4 p-4 rounded-lg shadow transition-colors ${
                  n.isRead ? 'bg-white' : 'bg-indigo-50'
                }`}
              >
                {/* User avatar */}
                <div className="flex-shrink-0">
                  {n.user.avatarUrl ? (
                    <img src={n.user.avatarUrl} alt={n.user.name} className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    <FaUserCircle className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                {/* Message content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-gray-800 ${n.isRead ? '' : 'font-medium'}`}>{n.message}</p>
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="text-gray-400 hover:text-gray-600 ml-2"
                      title={n.isRead ? 'Read' : 'Mark as read'}
                    >
                      {n.isRead ? <FaCheckCircle /> : <FaTimesCircle />}
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
