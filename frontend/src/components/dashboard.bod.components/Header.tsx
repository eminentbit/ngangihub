import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-purple-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-10 mr-4" />
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-lg text-black"
        />
      </div>
      <div className="flex items-center">
        <span className="mr-2">👤 Robert Johnson</span>
        <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">2</span>
      </div>
    </header>
  );
};

export default Header;