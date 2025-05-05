import React from 'react';

const BoardOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="bg-white p-4 rounded shadow">
        <h3>Board Members</h3>
        <p className="text-3xl">12</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3>Resolutions Passed</h3>
        <p className="text-3xl text-green-500">24</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3>Meeting Attendance</h3>
        <p className="text-3xl text-purple-500">92%</p>
      </div>
    </div>
  );
};

export default BoardOverview;