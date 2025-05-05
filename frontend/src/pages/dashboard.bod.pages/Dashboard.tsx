import React from 'react';
import Header from '../../components/dashboard.bod.components/Header';
import Sidebar from '../../components/dashboard.bod.components/Sidebar';
import BoardOverview from '../../components/dashboard.bod.components/BoardOverview';
import ResolutionVoting from '../../components/dashboard.bod.components/ResolutionVoting';
import AttendanceRate from '../../components/dashboard.bod.components/AttendanceRate';
import RecentResolutions from '../../components/dashboard.bod.components/RecentResolutions';

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
      <div style={{ display: 'flex', flex: '1' }}>
        <Sidebar style={{ boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)' }} />
        <main style={{ flex: '1', padding: '20px', backgroundColor: '#f3f4f6', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '8px', backgroundColor: '#ffffff', borderRadius: '4px', display: 'inline-block' }}>Board Dashboard <span style={{ color: '#10b981' }}>📊</span></h1>
          <p style={{ color: '#6b7280', marginBottom: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '8px', backgroundColor: '#ffffff', borderRadius: '4px', display: 'inline-block' }}>Monitor board activities and make informed decisions.</p>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <button style={{ backgroundColor: '#9333ea', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <span role="img" aria-label="plus">➕</span> New Resolution
            </button>
            <button style={{ backgroundColor: '#9333ea', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <span role="img" aria-label="calendar">📅</span> Schedule Meeting
            </button>
          </div>
          <BoardOverview style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '24px' }}>
            <ResolutionVoting style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
            <AttendanceRate style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
            <RecentResolutions style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;