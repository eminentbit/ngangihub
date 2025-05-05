import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  style?: React.CSSProperties;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ style, isOpen, toggleSidebar }) => {
  const currentPath = window.location.pathname;
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const getLinkStyle = (path: string) => ({
    display: 'block',
    padding: '8px',
    backgroundColor: currentPath === path ? '#7c3aed' : (hoveredLink === path ? '#9333ea' : (isOpen ? 'transparent' : 'none')),
    borderRadius: '4px',
    textDecoration: 'none',
    color: currentPath === path ? 'white' : (hoveredLink === path ? 'white' : (isOpen ? 'white' : 'transparent')),
    transition: 'background-color 0.3s ease, color 0.3s ease'
  });

  return (
    <aside style={{
      backgroundColor: isOpen ? '#5b1a89' : 'transparent',
      color: 'white',
      width: isOpen ? '256px' : '0',
      height: '100vh',
      minHeight: '100%',
      padding: isOpen ? '16px' : '0',
      overflow: 'hidden',
      opacity: isOpen ? 1 : 0, // Fade in/out
      visibility: isOpen ? 'visible' : 'hidden', // Hide when fully closed
      transition: 'width 0.3s ease, padding 0.3s ease, opacity 0.3s ease, background-color 0.3s ease, visibility 0.3s ease', // Smooth transitions
      position: 'relative',
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
          <li>
            <Link
              to="/board/dashboard"
              onMouseEnter={() => setHoveredLink('/board/dashboard')}
              onMouseLeave={() => setHoveredLink(null)}
              style={getLinkStyle('/board/dashboard')}
            >
              📊 Board Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/board/resolutions"
              onMouseEnter={() => setHoveredLink('/board/resolutions')}
              onMouseLeave={() => setHoveredLink(null)}
              style={getLinkStyle('/board/resolutions')}
            >
              📋 Resolutions
            </Link>
          </li>
        </ul>
        <h3 style={{ fontSize: '18px', marginBottom: '16px', marginTop: '24px' }}>MEETINGS</h3>
        <ul style={{ marginBottom: '24px', listStyle: 'none', padding: 0 }}>
          <li>
            <Link
              to="/board/schedule"
              onMouseEnter={() => setHoveredLink('/board/schedule')}
              onMouseLeave={() => setHoveredLink(null)}
              style={getLinkStyle('/board/schedule')}
            >
              📅 Meeting Schedule
            </Link>
          </li>
          <li>
            <Link
              to="/board/minutes"
              onMouseEnter={() => setHoveredLink('/board/minutes')}
              onMouseLeave={() => setHoveredLink(null)}
              style={getLinkStyle('/board/minutes')}
            >
              📝 Meeting Minutes
            </Link>
          </li>
          <li>
            <Link
              to="/board/attendance"
              onMouseEnter={() => setHoveredLink('/board/attendance')}
              onMouseLeave={() => setHoveredLink(null)}
              style={getLinkStyle('/board/attendance')}
            >
              👥 Attendance
            </Link>
          </li>
        </ul>
        <h3 style={{ fontSize: '18px', marginBottom: '16px', marginTop: '24px' }}>DOCUMENTS</h3>
        <ul style={{ marginBottom: '24px', listStyle: 'none', padding: 0 }}>
          <li>
            <Link
              to="/board/documents"
              onMouseEnter={() => setHoveredLink('/board/documents')}
              onMouseLeave={() => setHoveredLink(null)}
              style={getLinkStyle('/board/documents')}
            >
              📑 Documents
            </Link>
          </li>
          <li>
            <Link
              to="/board/policies"
              onMouseEnter={() => setHoveredLink('/board/policies')}
              onMouseLeave={() => setHoveredLink(null)}
              style={getLinkStyle('/board/policies')}
            >
              📜 Policies
            </Link>
          </li>
        </ul>
        <h3 style={{ fontSize: '18px', marginBottom: '16px', marginTop: '24px' }}>REPORTS</h3>
        <ul style={{ marginBottom: '24px', listStyle: 'none', padding: 0 }}>
          <li>
            <Link
              to="/board/reports"
              onMouseEnter={() => setHoveredLink('/board/reports')}
              onMouseLeave={() => setHoveredLink(null)}
              style={getLinkStyle('/board/reports')}
            >
              📊 Reports
            </Link>
          </li>
        </ul>
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>NOTIFICATIONS</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <Link
                to="/board/notifications"
                onMouseEnter={() => setHoveredLink('/board/notifications')}
                onMouseLeave={() => setHoveredLink(null)}
                style={getLinkStyle('/board/notifications')}
              >
                🔔 View Notifications
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;