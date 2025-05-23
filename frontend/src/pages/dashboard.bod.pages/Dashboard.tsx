import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext'; 
import Header from '../../components/dashboard.bod.components/Header';
import Sidebar from '../../components/dashboard.bod.components/Sidebar';
import BoardOverview from '../../components/dashboard.bod.components/BoardOverview';
import ResolutionVoting from '../../components/dashboard.bod.components/ResolutionVoting';
import AttendanceRate from '../../components/dashboard.bod.components/AttendanceRate';
import RecentResolutions from '../../components/dashboard.bod.components/RecentResolutions';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6' }}>
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
          padding: isMobile ? '8px' : (isTablet ? '12px' : (isDesktop ? '20px' : '16px')),
          backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          color: isDarkMode ? 'white' : 'black',
          transition: 'flex 0.3s ease, padding 0.3s ease',
          width: isSidebarOpen ? 'auto' : '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : (isTablet ? '12px' : '16px') }}>
            {!isSidebarOpen && (
              <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: isDarkMode ? 'white' : '#5b1a89', cursor: 'pointer', fontSize: isMobile ? '20px' : (isTablet ? '22px' : '24px') }}>
                ☰
              </button>
            )}
            <h1 style={{
              fontSize: isMobile ? '18px' : (isTablet ? '20px' : '24px'),
              fontWeight: 'bold',
              marginBottom: isMobile ? '8px' : (isTablet ? '12px' : '16px'),
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              padding: isMobile ? '4px' : (isTablet ? '6px' : '8px'),
              backgroundColor: isDarkMode ? '#4b5563' : '#ffffff',
              borderRadius: '4px',
              display: 'inline-block'
            }}>
              Board Dashboard <span style={{ color: '#10b981' }}>📊</span>
            </h1>
          </div>
          <p style={{
            color: isDarkMode ? '#d1d5db' : '#6b7280',
            marginBottom: isMobile ? '8px' : (isTablet ? '12px' : '16px'),
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '4px' : (isTablet ? '6px' : '8px'),
            backgroundColor: isDarkMode ? '#4b5563' : '#ffffff',
            borderRadius: '4px',
            display: 'inline-block',
            fontSize: isMobile ? '12px' : (isTablet ? '14px' : '16px')
          }}>
            Monitor board activities and make informed decisions.
          </p>
          <div style={{ display: 'flex', gap: isMobile ? '8px' : (isTablet ? '12px' : '16px'), marginBottom: isMobile ? '8px' : (isTablet ? '12px' : '16px') }}>
            <Link
              to="/board/resolutions/"
              style={{
                backgroundColor: '#9333ea',
                color: 'white',
                padding: isMobile ? '6px 12px' : (isTablet ? '7px 14px' : '8px 16px'),
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: isMobile ? '12px' : (isTablet ? '13px' : '14px')
              }}
            >
              <span role="img" aria-label="plus">➕</span> New Resolution
            </Link>
            <Link
              to="/board/schedule/"
              style={{
                backgroundColor: '#9333ea',
                color: 'white',
                padding: isMobile ? '6px 12px' : (isTablet ? '7px 14px' : '8px 16px'),
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: isMobile ? '12px' : (isTablet ? '13px' : '14px')
              }}
            >
              <span role="img" aria-label="calendar">📅</span> Schedule Meeting
            </Link>
          </div>
          <BoardOverview style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} isDarkMode={isDarkMode} />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '1fr 1fr' : 'repeat(3, 1fr)'), gap: isMobile ? '8px' : (isTablet ? '12px' : '16px'), marginTop: isMobile ? '12px' : (isTablet ? '18px' : '24px') }}>
            <ResolutionVoting style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} isDarkMode={isDarkMode} />
            <AttendanceRate style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} isDarkMode={isDarkMode} />
            <RecentResolutions style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} isDarkMode={isDarkMode} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;