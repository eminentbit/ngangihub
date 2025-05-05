import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  style?: React.CSSProperties;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ style, isOpen, toggleSidebar }) => {
  const currentPath = window.location.pathname;

  const getLinkStyle = (path: string) => ({
    display: 'block',
    padding: '8px',
    backgroundColor: currentPath === path ? '#7c3aed' : (isOpen ? 'transparent' : 'none'),
    borderRadius: '4px',
    textDecoration: 'none',
    color: currentPath === path ? 'white' : (isOpen ? 'white' : 'transparent'),
    transition: 'background-color 0.3s ease, color 0.3s ease',
    ':hover': {
      backgroundColor: '#9333ea',
      color: 'white'
    }
  });

  return (
    <aside style={{
      backgroundColor: '#5b1a89',
      color: 'white',
      width: isOpen ? '256px' : '0',
      height: '100vh',
      padding: isOpen ? '16px' : '0',
      overflow: 'hidden',
      transition: 'width 0.3s ease, padding 0.3s ease',
      ...style
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '18px', display: isOpen ? 'block' : 'none' }}>BOARD MENU</h3>
        <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '24px' }}>
          {isOpen ? '✖' : '☰'}
        </button>
      </div>
      <nav style={{ display: isOpen ? 'block' : 'none' }}>
        <ul style={{ marginBottom: '24px', listStyle: 'none', padding: 0 }}>
          <li><Link to="/board/dashboard" style={getLinkStyle('/board/dashboard')}>📊 Board Dashboard</Link></li>
          <li><Link to="/board/resolutions" style={getLinkStyle('/board/resolutions')}>📋 Resolutions</Link></li>
        </ul>
        <h3 style={{ fontSize: '18px', marginBottom: '16px', marginTop: '24px' }}>MEETINGS</h3>
        <ul style={{ marginBottom: '24px', listStyle: 'none', padding: 0 }}>
          <li><Link to="/board/schedule" style={getLinkStyle('/board/schedule')}>📅 Meeting Schedule</Link></li>
          <li><Link to="/board/minutes" style={getLinkStyle('/board/minutes')}>📝 Meeting Minutes</Link></li>
          <li><Link to="/board/attendance" style={getLinkStyle('/board/attendance')}>👥 Attendance</Link></li>
        </ul>
        <h3 style={{ fontSize: '18px', marginBottom: '16px', marginTop: '24px' }}>DOCUMENTS</h3>
        <ul style={{ marginBottom: '24px', listStyle: 'none', padding: 0 }}>
          <li><Link to="/board/documents" style={getLinkStyle('/board/documents')}>📑 Documents</Link></li>
          <li><Link to="/board/policies" style={getLinkStyle('/board/policies')}>📜 Policies</Link></li>
        </ul>
        <h3 style={{ fontSize: '18px', marginBottom: '16px', marginTop: '24px' }}>REPORTS</h3>
        <ul style={{ marginBottom: '24px', listStyle: 'none', padding: 0 }}>
          <li><Link to="/board/reports" style={getLinkStyle('/board/reports')}>📊 Reports</Link></li>
        </ul>
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>NOTIFICATIONS</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/board/notifications" style={getLinkStyle('/board/notifications')}>🔔 View Notifications</Link></li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;