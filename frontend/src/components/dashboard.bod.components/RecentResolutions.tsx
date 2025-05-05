import React from 'react';

interface RecentResolutionsProps {
  style?: React.CSSProperties;
}

const RecentResolutions: React.FC<RecentResolutionsProps> = ({ style }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '4px', ...style }}>
      <h3>Recent Resolutions</h3>
      <input type="text" placeholder="Search resolutions..." style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>Strategic Plan - Apr 25, 2025 - <span style={{ color: '#22c55e' }}>Approved</span></li>
      </ul>
    </div>
  );
};

export default RecentResolutions;