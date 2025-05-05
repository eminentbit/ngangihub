import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext'; // Adjust path as needed
import Header from '../../components/dashboard.bod.components/Header';
import Sidebar from '../../components/dashboard.bod.components/Sidebar';
import ReportOverview from '../../components/dashboard.bod.components/ReportOverview';
import ReportList from '../../components/dashboard.bod.components/ReportList';
import ReportFilter from '../../components/dashboard.bod.components/ReportFilter';
import ReportDetails from '../../components/dashboard.bod.components/ReportDetails';

const Reports: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filter, setFilter] = useState({ type: 'All', status: 'All' });
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
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
          padding: isMobile ? '16px' : (isSidebarOpen ? '24px' : '24px 0'),
          backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
          color: isDarkMode ? 'white' : 'black',
          overflowY: 'auto',
          transition: 'flex 0.3s ease, padding 0.3s ease'
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
              Reports <span style={{ color: '#10b981' }}>📊</span>
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
            <ReportFilter filter={filter} setFilter={setFilter} />
          </div>
          {selectedReportId ? (
            <ReportDetails
              reportId={selectedReportId}
              isDarkMode={isDarkMode}
              onBack={() => setSelectedReportId(null)}
            />
          ) : (
            <>
              <ReportOverview isDarkMode={isDarkMode} filter={filter} />
              <ReportList
                isDarkMode={isDarkMode}
                filter={filter}
                onSelectReport={setSelectedReportId}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Reports;