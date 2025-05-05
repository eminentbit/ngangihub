import React from 'react';

interface ResolutionVotingProps {
  style?: React.CSSProperties;
}

const ResolutionVoting: React.FC<ResolutionVotingProps> = ({ style }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '4px', ...style }}>
      <h3>Resolution Voting</h3>
      <div style={{ width: '160px', height: '160px', margin: '0 auto', position: 'relative' }}>
        <div style={{ width: '100%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '50%', clipPath: 'circle(50% at 50% 50%)', position: 'absolute' }}></div>
        <div style={{ width: '100%', height: '100%', backgroundColor: '#22c55e', borderRadius: '50%', clipPath: 'circle(30% at 50% 50%)', position: 'absolute' }}></div>
        <div style={{ width: '100%', height: '100%', backgroundColor: '#eab308', borderRadius: '50%', clipPath: 'circle(20% at 50% 50%)', position: 'absolute' }}></div>
      </div>
      <p style={{ textAlign: 'center' }}>Approve | Reject | Abstain</p>
    </div>
  );
};

export default ResolutionVoting;