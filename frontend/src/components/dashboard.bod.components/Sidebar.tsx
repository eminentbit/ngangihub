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

  const isMobile = window.innerWidth < 768;
  const headerHeight = 64; // Assumed header height in pixels; adjust if different

  return (
    <aside style={{
      backgroundColor: isOpen ? '#5b1a89' : 'transparent',
      color: 'white',
      width: isMobile ? (isOpen ? '100vw' : '0') : (isOpen ? 'auto' : '0'), // Full width on mobile when open
      minWidth: isMobile ? (isOpen ? '100vw' : '0') : (isOpen ? '256px' : '0'), // Full viewport width on mobile
      minHeight: isMobile ? `calc(100vh - ${headerHeight}px)` : '100vh', // Adjust height on mobile to account for header
      padding: isOpen ? '16px' : '0',
      overflow: 'hidden',
      overflowY: 'auto',
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
      transition: 'width 0.3s ease, padding 0.3s ease, opacity 0.3s ease, background-color 0.3s ease, visibility 0.3s ease',
      position: isMobile ? 'fixed' : 'relative', // Fixed positioning on mobile
      top: isMobile ? `${headerHeight}px` : 0, // Start below header on mobile
      left: isMobile ? (isOpen ? '0' : '-100vw') : 0, // Slide from left on mobile
      zIndex: isMobile ? 1000 : 'auto', // Ensure it overlays content on mobile
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
        <h3 style={{ fontSize: '18px', marginBottom: '16px', marginTop: '24px' }}>GROUP REQUESTS</h3>
        <ul style={{ marginBottom: '24px', listStyle: 'none', padding: 0 }}>
          <li>
            <Link
              to="/board/group-requests"
              onMouseEnter={() => setHoveredLink('/board/group-requests')}
              onMouseLeave={() => setHoveredLink(null)}
              style={getLinkStyle('/board/group-requests')}
            >
              👥 Group Requests
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