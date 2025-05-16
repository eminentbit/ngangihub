import React from 'react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  showLabels?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => {
  // Base layout & transition
  const baseClasses = 'w-full flex items-center p-3 rounded-md transition-colors';

  const activeClasses = active
    ? 'bg-blue-800 text-white hover:bg-blue-800 hover:text-white'
    : 'text-indigo-200 hover:bg-indigo-500 hover:text-white';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${activeClasses}`}
    >
      <span className="text-xl">{icon}</span>
      <span className="ml-3 font-medium">{label}</span>
    </button>
  );
};

export default SidebarItem;
