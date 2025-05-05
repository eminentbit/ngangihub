import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-purple-900 text-white w-64 h-screen p-4">
      <nav>
        <h3 className="text-lg mb-4">BOARD MENU</h3>
        <ul className="space-y-2">
          <li><Link to="/dashboard" className="block p-2 bg-purple-700 rounded">📊 Board Dashboard</Link></li>
          <li><Link to="/resolutions" className="block p-2 hover:bg-purple-700 rounded">📋 Resolutions</Link></li>
        </ul>
        <h3 className="text-lg mb-4 mt-6">MEETINGS</h3>
        <ul className="space-y-2">
          <li><Link to="/schedule" className="block p-2 hover:bg-purple-700 rounded">📅 Meeting Schedule</Link></li>
          <li><Link to="/minutes" className="block p-2 hover:bg-purple-700 rounded">📝 Meeting Minutes</Link></li>
          <li><Link to="/attendance" className="block p-2 hover:bg-purple-700 rounded">👥 Attendance</Link></li>
        </ul>
        <h3 className="text-lg mb-4 mt-6">DOCUMENTS</h3>
        <ul className="space-y-2">
          <li><Link to="/documents" className="block p-2 hover:bg-purple-700 rounded">📑 Documents</Link></li>
          <li><Link to="/policies" className="block p-2 hover:bg-purple-700 rounded">📜 Policies</Link></li>
        </ul>
        <h3 className="text-lg mb-4 mt-6">REPORTS</h3>
        <ul className="space-y-2">
          <li><Link to="/reports" className="block p-2 hover:bg-purple-700 rounded">📊 Reports</Link></li>
        </ul>
        <div className="mt-6">
          <h3 className="text-lg mb-2">NOTIFICATIONS</h3>
          <ul className="space-y-2">
            <li><Link to="/notifications" className="block bg-purple-600 p-2 rounded">🔔 View Notifications</Link></li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;