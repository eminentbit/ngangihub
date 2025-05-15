import React from 'react';

interface GroupRequest {
  id: number;
  leaderName: string;
  groupName: string;
  maxMembers: number;
  description: string;
  state: string;
}

interface GroupRequestDetailsProps {
  request: GroupRequest;
  isDarkMode: boolean;
  onBack: () => void;
}

const GroupRequestDetails: React.FC<GroupRequestDetailsProps> = ({ request, isDarkMode, onBack }) => {
  const isMobile = window.innerWidth < 768;

  return (
    <div style={{
      backgroundColor: isDarkMode ? '#4b5563' : 'white',
      padding: '16px',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      maxHeight: '60vh',
      overflowY: 'auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <button
          onClick={onBack}
          style={{
            backgroundColor: '#9333ea',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            fontSize: isMobile ? '14px' : '16px',
          }}
        >
          Back
        </button>
        <h3 style={{ margin: '0', fontSize: '18px', color: isDarkMode ? 'white' : 'black' }}>
          Group Request Details
        </h3>
      </div>
      <p style={{ color: isDarkMode ? '#d1d5db' : '#6b7280', fontSize: '14px' }}>
        <strong>ID:</strong> {request.id}
      </p>
      <p style={{ color: isDarkMode ? '#d1d5db' : '#6b7280', fontSize: '14px' }}>
        <strong>Leader Name:</strong> {request.leaderName}
      </p>
      <p style={{ color: isDarkMode ? '#d1d5db' : '#6b7280', fontSize: '14px' }}>
        <strong>Group Name:</strong> {request.groupName}
      </p>
      <p style={{ color: isDarkMode ? '#d1d5db' : '#6b7280', fontSize: '14px' }}>
        <strong>Max Members:</strong> {request.maxMembers}
      </p>
      <p style={{ color: isDarkMode ? '#d1d5db' : '#6b7280', fontSize: '14px' }}>
        <strong>Description:</strong> {request.description}
      </p>
      <p style={{ color: isDarkMode ? '#d1d5db' : '#6b7280', fontSize: '14px' }}>
        <strong>State:</strong> {request.state}
      </p>
    </div>
  );
};

export default GroupRequestDetails;