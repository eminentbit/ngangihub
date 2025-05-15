import React from 'react';
import { useTheme } from '../../pages/dashboard.bod.pages/ThemeContext'; // Adjust path as needed
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  style?: React.CSSProperties;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, style }) => {
  const { isDarkMode } = useTheme();
  const isMobile = window.innerWidth < 768;

  const sidebarStyle: React.CSSProperties = {
    width: isMobile ? (isOpen ? '100%' : '0') : (isOpen ? '250px' : '60px'),
    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
    color: isDarkMode ? 'white' : 'black',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: isOpen ? '2px 0 4px rgba(0, 0, 0, 0.1)' : 'none',
    position: isMobile ? 'absolute' : 'relative',
    zIndex: 10,
    height: isMobile ? 'auto' : '100%',
    padding: isOpen ? '16px' : '16px 0',
    ...style,
  };

  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '8px 16px',
    color: isDarkMode ? 'white' : 'black',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '4px',
    backgroundColor: isActive ? (isDarkMode ? '#4b5563' : '#e9d5ff') : 'transparent',
    margin: '4px 0',
    transition: 'background-color 0.3s ease',
  });

  const iconStyle: React.CSSProperties = {
    fontSize: '20px',
    minWidth: '20px',
  };

  return (
    <div style={sidebarStyle}>
      {isMobile && (
        <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: isDarkMode ? 'white' : '#5b1a89', fontSize: '24px', cursor: 'pointer', alignSelf: 'flex-end' }}>
          ✕
        </button>
      )}
      <div style={{ padding: isOpen ? '0 8px' : '0', flex: '1' }}>
        <Link to="/board/dashboard" style={linkStyle(location.pathname === '/board/dashboard')}>
          <span style={iconStyle}>🏠</span>
          {isOpen && <span>Dashboard</span>}
        </Link>
        <Link to="/board/notifications" style={linkStyle(location.pathname === '/board/notifications')}>
          <span style={iconStyle}>🔔</span>
          {isOpen && <span>Notifications</span>}
        </Link>
        <Link to="/board/resolutions" style={linkStyle(location.pathname === '/board/resolutions')}>
          <span style={iconStyle}>📜</span>
          {isOpen && <span>Resolutions</span>}
        </Link>
        <Link to="/board/schedule" style={linkStyle(location.pathname === '/board/schedule')}>
          <span style={iconStyle}>📅</span>
          {isOpen && <span>Meeting Schedule</span>}
        </Link>
        <Link to="/board/minutes" style={linkStyle(location.pathname === '/board/minutes')}>
          <span style={iconStyle}>📝</span>
          {isOpen && <span>Meeting Minutes</span>}
        </Link>
        <Link to="/board/attendance" style={linkStyle(location.pathname === '/board/attendance')}>
          <span style={iconStyle}>✅</span>
          {isOpen && <span>Attendance</span>}
        </Link>
        <Link to="/board/documents" style={linkStyle(location.pathname === '/board/documents')}>
          <span style={iconStyle}>📑</span>
          {isOpen && <span>Documents</span>}
        </Link>
        <Link to="/board/policies" style={linkStyle(location.pathname === '/board/policies')}>
          <span style={iconStyle}>📜</span>
          {isOpen && <span>Policies</span>}
        </Link>
        <Link to="/board/reports" style={linkStyle(location.pathname === '/board/reports')}>
          <span style={iconStyle}>📊</span>
          {isOpen && <span>Reports</span>}
        </Link>
        <Link to="/board/group-requests" style={linkStyle(location.pathname === '/board/group-requests')}>
          <span style={iconStyle}>👥</span>
          {isOpen && <span>Group Requests</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;