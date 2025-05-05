import React, { useContext } from 'react';
import Header from '../../components/dashboard.bod.components/Header';
import Sidebar from '../../components/dashboard.bod.components/Sidebar';
import NotificationsList from '../../components/dashboard.bod.components/NotificationsList';
import { ThemeContext } from './ThemeContext'; // Assuming a context for theme management

const Notifications: React.FC = () => {
  const { isDarkMode } = useContext(ThemeContext); // Use context to get dark mode state

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: '1' }}>
        <Sidebar />
        <main style={{
          flex: '1',
          padding: '20px',
          backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
          color: isDarkMode ? 'white' : 'black'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Notifications</h1>
          <NotificationsList isDarkMode={isDarkMode} />
        </main>
      </div>
    </div>
  );
};

export default Notifications;