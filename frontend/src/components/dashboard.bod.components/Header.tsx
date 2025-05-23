import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  style?: React.CSSProperties;
  toggleTheme: () => void;
  isDarkMode: boolean;
  notificationCount: number;
}

const Header: React.FC<HeaderProps> = ({ style, toggleTheme, isDarkMode, notificationCount }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;

  return (
    <header style={{
      backgroundColor: isDarkMode ? '#1f2937' : '#6b21a8',
      color: 'white',
      padding: isMobile ? '8px' : (isTablet ? '12px' : '16px'),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      ...style
    }}>
      {/* Left Section: Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="Logo" style={{ 
          height: isMobile ? '32px' : (isTablet ? '36px' : '40px'), 
          marginRight: isMobile ? '8px' : (isTablet ? '12px' : '16px') 
        }} />
      </div>

      {/* Center Section: Search Bar */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: isMobile ? '6px' : (isTablet ? '7px' : '8px'),
            borderRadius: '8px',
            color: isDarkMode ? 'white' : 'black',
            backgroundColor: isDarkMode ? '#374151' : 'white',
            border: 'none',
            width: isMobile ? '60%' : (isTablet ? '50%' : '40%'), // Desktop (> 1024px) uses 40%
            fontSize: isMobile ? '12px' : (isTablet ? '14px' : '16px')
          }}
        />
      </div>

      {/* Right Section: Notifications, Theme Toggle, User */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: isMobile ? '8px' : (isTablet ? '12px' : '16px'), 
        position: 'relative' 
      }}>
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer', 
              fontSize: isMobile ? '20px' : (isTablet ? '22px' : '24px'), 
              position: 'relative' 
            }}
          >
            🔔
            {notificationCount > 0 && (
              <span style={{
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: isMobile ? '16px' : (isTablet ? '18px' : '20px'),
                height: isMobile ? '16px' : (isTablet ? '18px' : '20px'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                fontSize: isMobile ? '10px' : (isTablet ? '11px' : '12px')
              }}>
                {notificationCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: isMobile ? '36px' : (isTablet ? '38px' : '40px'),
              right: '0',
              backgroundColor: isDarkMode ? '#374151' : 'white',
              color: isDarkMode ? 'white' : 'black',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
              padding: isMobile ? '6px' : (isTablet ? '7px' : '8px'),
              width: isMobile ? '200px' : (isTablet ? '250px' : '300px'),
              zIndex: 10
            }}>
              <h4 style={{ 
                margin: '0 0 8px 0', 
                fontSize: isMobile ? '14px' : (isTablet ? '15px' : '16px') 
              }}>
                Notifications
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ 
                  padding: isMobile ? '6px' : (isTablet ? '7px' : '8px'), 
                  backgroundColor: isDarkMode ? '#4b5563' : '#e9d5ff', 
                  borderRadius: '4px', 
                  marginBottom: '4px',
                  fontSize: isMobile ? '12px' : (isTablet ? '13px' : '14px')
                }}>
                  🚨 Board meeting scheduled for next week (2 hours ago)
                </li>
                <li style={{ 
                  padding: isMobile ? '6px' : (isTablet ? '7px' : '8px'), 
                  backgroundColor: isDarkMode ? '#4b5563' : '#e9d5ff', 
                  borderRadius: '4px', 
                  marginBottom: '4px',
                  fontSize: isMobile ? '12px' : (isTablet ? '13px' : '14px')
                }}>
                  🚨 Annual report review pending (5 hours ago)
                </li>
                <li>
                  <Link 
                    to="/board/notifications" 
                    style={{ 
                      display: 'block', 
                      padding: isMobile ? '6px' : (isTablet ? '7px' : '8px'), 
                      color: isDarkMode ? '#93c5fd' : '#2563eb', 
                      textDecoration: 'none',
                      fontSize: isMobile ? '12px' : (isTablet ? '13px' : '14px')
                    }}
                  >
                    View all notifications
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <button 
          onClick={toggleTheme} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            cursor: 'pointer', 
            fontSize: isMobile ? '20px' : (isTablet ? '22px' : '24px') 
          }}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <span style={{ 
          marginRight: '8px', 
          fontSize: isMobile ? '12px' : (isTablet ? '14px' : '16px') 
        }}>
          👤 Wepngong Shalom
        </span>
      </div>
    </header>
  );
};

export default Header;