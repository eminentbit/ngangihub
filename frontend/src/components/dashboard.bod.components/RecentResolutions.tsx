import React from 'react';

const RecentResolutions: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3>Recent Resolutions</h3>
      <input type="text" placeholder="Search resolutions..." className="w-full p-2 mb-2 rounded" />
      <ul>
        <li>Strategic Plan - Apr 25, 2025 - <span className="text-green-500">Approved</span></li>
      </ul>
    </div>
  );
};

export default RecentResolutions;