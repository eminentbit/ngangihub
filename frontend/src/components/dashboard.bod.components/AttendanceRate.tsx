import React from 'react';

interface AttendanceRateProps {
  style?: React.CSSProperties;
}

const AttendanceRate: React.FC<AttendanceRateProps> = ({ style }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '4px', ...style }}>
      <h3>Attendance Rate</h3>
      <div style={{ width: '100%', height: '160px' }}>
        <svg width="100%" height="100%">
          <polyline points="0,80 50,60 100,70 150,50 200,80" style={{ fill: 'none', stroke: 'blue', strokeWidth: '2' }} />
        </svg>
      </div>
    </div>
  );
};

export default AttendanceRate;