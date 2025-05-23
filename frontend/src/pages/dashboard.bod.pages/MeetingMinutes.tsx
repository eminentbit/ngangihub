import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext'; // Adjust path as needed
import Header from '../../components/dashboard.bod.components/Header';
import Sidebar from '../../components/dashboard.bod.components/Sidebar';
import MinutesList from '../../components/dashboard.bod.components/MinutesList';
import MinutesFilter from '../../components/dashboard.bod.components/MinutesFilter';
import AddMinutesForm from '../../components/dashboard.bod.components/AddMinutesForm';
import MinutesDetails from '../../components/dashboard.bod.components/MinutesDetails';

const MeetingMinutes: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedMinutesId, setSelectedMinutesId] = useState<number | null>(null);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <div style={{ display: 'flex', flex: '1', flexDirection: isMobile ? 'column' : 'row', transition: 'all 0.3s ease' }}>
        <Sidebar
          style={{ boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)' }}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main style={{
          flex: isSidebarOpen ? '1' : '100%',
          padding: isMobile ? '8px' : (isTablet ? '12px' : (isDesktop ? '24px' : '16px')),
          backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
          color: isDarkMode ? 'white' : 'black',
          overflowY: 'auto',
          transition: 'flex 0.3s ease, padding 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : (isTablet ? '12px' : '16px'), marginBottom: isMobile ? '8px' : (isTablet ? '12px' : '16px') }}>
            {!isSidebarOpen && (
              <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: isDarkMode ? 'white' : '#5b1a89', cursor: 'pointer', fontSize: isMobile ? '20px' : (isTablet ? '22px' : '24px') }}>
                ☰
              </button>
            )}
            <h1 style={{
              fontSize: isMobile ? '18px' : (isTablet ? '20px' : '24px'),
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              padding: isMobile ? '4px' : (isTablet ? '6px' : '8px'),
              backgroundColor: isDarkMode ? '#4b5563' : '#ffffff',
              borderRadius: '4px',
              display: 'inline-block'
            }}>
              Meeting Minutes <span style={{ color: '#10b981' }}>📝</span>
            </h1>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'stretch' : 'center',
            gap: isMobile ? '8px' : (isTablet ? '12px' : '16px'),
            marginBottom: isMobile ? '8px' : (isTablet ? '12px' : '16px')
          }}>
            <MinutesFilter filter={filter} setFilter={setFilter} />
            <AddMinutesForm isDarkMode={isDarkMode} />
          </div>
          {selectedMinutesId ? (
            <MinutesDetails
              minutesId={selectedMinutesId}
              isDarkMode={isDarkMode}
              onBack={() => setSelectedMinutesId(null)}
            />
          ) : (
            <MinutesList
              isDarkMode={isDarkMode}
              filter={filter}
              onSelectMinutes={setSelectedMinutesId}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default MeetingMinutes;