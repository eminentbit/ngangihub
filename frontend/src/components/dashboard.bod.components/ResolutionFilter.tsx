import React, { useState } from 'react';
import { useTheme } from '../../pages/dashboard.bod.pages/ThemeContext';

const ResolutionFilter: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    
  };

  const filters = ['All', 'Approved', 'Pending', 'Rejected'];

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {filters.map(f => (
        <button
          key={f}
          onClick={() => handleFilterChange(f)}
          style={{
            padding: '4px 12px',
            backgroundColor: filter === f ? '#9333ea' : (isDarkMode ? '#4b5563' : '#e5e7eb'),
            color: filter === f ? 'white' : (isDarkMode ? 'white' : 'black'),
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default ResolutionFilter;