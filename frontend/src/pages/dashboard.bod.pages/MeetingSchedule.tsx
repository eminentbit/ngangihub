import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext'; 
import Header from '../../components/dashboard.bod.components/Header';
import Sidebar from '../../components/dashboard.bod.components/Sidebar';
import MeetingList from '../../components/dashboard.bod.components/MeetingList';
import MeetingFilter from '../../components/dashboard.bod.components/MeetingFilter';
import ScheduleMeetingForm from '../../components/dashboard.bod.components/ScheduleMeetingForm';

const MeetingSchedule: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filter, setFilter] = useState('All');
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Sync sidebar state with window width for mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false); // Auto-close sidebar on mobile
      } else {
        setIsSidebarOpen(true); // Open sidebar on desktop
      }
    };
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample notification count for Header
  const notifications = [
    '🚨 Board meeting scheduled for next week (2 hours ago)',
    '🚨 Annual report review pending (5 hours ago)'
  ];
  const notificationCount = notifications.length;

  const isMobile = window.innerWidth < 768;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header
        style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        notificationCount={notificationCount}
      />
      <div style={{ display: 'flex', flex: '1', flexDirection: isMobile ? 'column' : 'row' }}>
        <Sidebar
          style={{
            boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
            width: isMobile && !isSidebarOpen ? '0' : (isMobile ? '100%' : '256px'),
            minWidth: isMobile && isSidebarOpen ? '100%' : undefined
          }}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main style={{
          flex: '1',
          padding: isMobile ? '16px' : '24px',
          backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
          color: isDarkMode ? 'white' : 'black',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            {!isSidebarOpen && (
              <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: isDarkMode ? 'white' : '#5b1a89', cursor: 'pointer', fontSize: '24px' }}>
                ☰
              </button>
            )}
            <h1 style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              padding: '8px',
              backgroundColor: isDarkMode ? '#4b5563' : '#ffffff',
              borderRadius: '4px',
              display: 'inline-block'
            }}>
              Meeting Schedule <span style={{ color: '#10b981' }}>📅</span>
            </h1>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'stretch' : 'center',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <MeetingFilter filter={filter} setFilter={setFilter} />
            <ScheduleMeetingForm isDarkMode={isDarkMode} />
          </div>
          <MeetingList isDarkMode={isDarkMode} filter={filter} />
        </main>
      </div>
    </div>
  );
};

export default MeetingSchedule;