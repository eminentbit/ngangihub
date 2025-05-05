import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  style?: React.CSSProperties;
}

const Sidebar: React.FC<SidebarProps> = ({ style }) => {
  return (
    <aside style={{ backgroundColor: '#5b1a89', color: 'white', width: '256px', height: '100vh', padding: '16px', ...style }}>
      <nav>
        <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>BOARD MENU</h3>
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