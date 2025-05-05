import React from 'react';

interface HeaderProps {
  style?: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = ({ style }) => {
  return (
    <header style={{ backgroundColor: '#6b21a8', color: 'white', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="Logo" style={{ height: '40px', marginRight: '16px' }} />
        <input
          type="text"
          placeholder="Search..."
          style={{ padding: '8px', borderRadius: '8px', color: 'black' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px' }}>👤 Wepngong Shalom</span>
        <span style={{ backgroundColor: '#ef4444', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
      </div>
    </header>
  );
};

export default Header;