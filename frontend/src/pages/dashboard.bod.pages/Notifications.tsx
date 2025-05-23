import React, { useState } from 'react';
import { useTheme } from './ThemeContext'; // Adjust path as needed
import Header from '../../components/dashboard.bod.components/Header';
import Sidebar from '../../components/dashboard.bod.components/Sidebar';
import NotificationsList from '../../components/dashboard.bod.components/NotificationsList';

const Notifications: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const notifications = [
    '🚨 Board meeting scheduled for next week (2 hours ago)',
    '🚨 Annual report review pending (5 hours ago)'
  ];
  const notificationCount = notifications.length;

  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
  const isDesktop = window.innerWidth > 1024;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header
        style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        notificationCount={notificationCount}
      />
      <div style={{ display: 'flex', flex: '1' }}>
        <Sidebar
          style={{ boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)' }}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main style={{
          flex: '1',
          padding: isMobile ? '8px' : (isTablet ? '10px' : (isDesktop ? '20px' : '12px')),
          backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
          color: isDarkMode ? 'white' : 'black'
        }}>
          <h1 style={{ fontSize: isMobile ? '18px' : (isTablet ? '20px' : '24px'), fontWeight: 'bold', marginBottom: isMobile ? '8px' : (isTablet ? '10px' : '16px') }}>Notifications</h1>
          <NotificationsList isDarkMode={isDarkMode} />
        </main>
      </div>
    </div>
  );
};

export default Notifications;