import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  style?: React.CSSProperties;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ style, toggleTheme, isDarkMode }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header style={{
      backgroundColor: isDarkMode ? '#1f2937' : '#6b21a8',
      color: 'white',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...style
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="Logo" style={{ height: '40px', marginRight: '16px' }} />
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: '8px',
            borderRadius: '8px',
            color: isDarkMode ? 'white' : 'black',
            backgroundColor: isDarkMode ? '#374151' : 'white',
            border: 'none'
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '24px' }}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <span style={{ marginRight: '8px' }}>👤 Robert Johnson</span>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowNotifications(!showNotifications)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '24px' }}>
            🔔
          </button>
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '40px',
              right: '0',
              backgroundColor: isDarkMode ? '#374151' : 'white',
              color: isDarkMode ? 'white' : 'black',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
              padding: '8px',
              width: '300px',
              zIndex: 10
            }}>
              <h4 style={{ margin: '0 0 8px 0' }}>Notifications</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ padding: '8px', backgroundColor: isDarkMode ? '#4b5563' : '#e9d5ff', borderRadius: '4px', marginBottom: '4px' }}>
                  🚨 Board meeting scheduled for next week (2 hours ago)
                </li>
                <li style={{ padding: '8px', backgroundColor: isDarkMode ? '#4b5563' : '#e9d5ff', borderRadius: '4px', marginBottom: '4px' }}>
                  🚨 Annual report review pending (5 hours ago)
                </li>
                <li><Link to="/board/notifications" style={{ display: 'block', padding: '8px', color: isDarkMode ? '#93c5fd' : '#2563eb', textDecoration: 'none' }}>View all notifications</Link></li>
              </ul>
            </div>
          )}
        </div>
        
        <span style={{ backgroundColor: '#ef4444', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
      </div>
    </header>
  );
};

export default Header;