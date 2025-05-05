import React from 'react';

const ResolutionVoting: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3>Resolution Voting</h3>
      <div className="w-40 h-40 mx-auto">
        <div className="w-full h-full bg-blue-500 rounded-full" style={{ clipPath: 'circle(50% at 50% 50%)' }}></div>
        <div className="w-full h-full bg-green-500 rounded-full" style={{ clipPath: 'circle(30% at 50% 50%)' }}></div>
        <div className="w-full h-full bg-yellow-500 rounded-full" style={{ clipPath: 'circle(20% at 50% 50%)' }}></div>
      </div>
      <p className="text-center">Approve | Reject | Abstain</p>
    </div>
  );
};

export default ResolutionVoting;