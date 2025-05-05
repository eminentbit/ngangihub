import React from 'react';

const AttendanceRate: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3>Attendance Rate</h3>
      <div className="w-full h-40">
        <svg width="100%" height="100%">
          <polyline points="0,80 50,60 100,70 150,50 200,80" style={{ fill: 'none', stroke: 'blue', strokeWidth: '2' }} />
        </svg>
      </div>
    </div>
  );
};

export default AttendanceRate;