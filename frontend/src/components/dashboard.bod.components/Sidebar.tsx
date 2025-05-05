import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  style?: React.CSSProperties;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ style, isOpen, toggleSidebar }) => {
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
          <li><Link to="/board/dashboard" style={{ display: 'block', padding: '8px', backgroundColor: '#7c3aed', borderRadius: '4px', textDecoration: 'none', color: 'white' }}>📊 Board Dashboard</Link></li>
          <li><Link to="/board/resolutions" style={{ display: 'block', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'white' }}>📋 Resolutions</Link></li>
        </ul>
        <h3 style={{ fontSize: '18px', marginBottom: '16px', marginTop: '24px' }}>MEETINGS</h3>
        <ul style={{ marginBottom: '24px', listStyle: 'none', padding: 0 }}>
          <li><Link to="/board/schedule" style={{ display: 'block', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'white' }}>📅 Meeting Schedule</Link></li>
          <li><Link to="/board/minutes" style={{ display: 'block', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'white' }}>📝 Meeting Minutes</Link></li>
          <li><Link to="/board/attendance" style={{ display: 'block', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'white' }}>👥 Attendance</Link></li>
        </ul>
        <h3 style={{ fontSize: '18px', marginBottom: '16px', marginTop: '24px' }}>DOCUMENTS</h3>
        <ul style={{ marginBottom: '24px', listStyle: 'none', padding: 0 }}>
          <li><Link to="/board/documents" style={{ display: 'block', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'white' }}>📑 Documents</Link></li>
          <li><Link to="/board/policies" style={{ display: 'block', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'white' }}>📜 Policies</Link></li>
        </ul>
        <h3 style={{ fontSize: '18px', marginBottom: '16px', marginTop: '24px' }}>REPORTS</h3>
        <ul style={{ marginBottom: '24px', listStyle: 'none', padding: 0 }}>
          <li><Link to="/board/reports" style={{ display: 'block', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'white' }}>📊 Reports</Link></li>
        </ul>
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>NOTIFICATIONS</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/board/notifications" style={{ display: 'block', backgroundColor: '#7c3aed', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'white' }}>🔔 View Notifications</Link></li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;