import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext'; // Adjust path as needed
import Header from '../../components/dashboard.bod.components/Header';
import Sidebar from '../../components/dashboard.bod.components/Sidebar';
import ResolutionList from '../../components/dashboard.bod.components/ResolutionList';
import ResolutionFilter from '../../components/dashboard.bod.components/ResolutionFilter';
import NewResolutionModal from '../../components/dashboard.bod.components/NewResolutionModal';

const Resolutions: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const { isDarkMode, toggleTheme } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
          color: isDarkMode ? 'white' : 'black'
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
              Resolutions <span style={{ color: '#10b981' }}>📋</span>
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
            <ResolutionFilter filter={filter} setFilter={setFilter} />
            <button
              onClick={toggleModal}
              style={{
                backgroundColor: '#9333ea',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              <span role="img" aria-label="plus">➕</span> New Resolution
            </button>
          </div>
          <ResolutionList isDarkMode={isDarkMode} filter={filter} />
          {isModalOpen && <NewResolutionModal isDarkMode={isDarkMode} onClose={toggleModal} />}
        </main>
      </div>
    </div>
  );
};

export default Resolutions;