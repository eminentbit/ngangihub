import React from 'react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  showLabels?: boolean; // Optional prop to control label visibility
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => {
  const baseClasses = 'w-full flex items-center p-3 rounded-md transition-colors';
  const activeClasses = active ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:bg-indigo-500 hover:text-white';
  return (
    <button onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      <span className="text-xl">{icon}</span>
      <span className="ml-3 font-medium">{label}</span>
    </button>
  );
};

export default SidebarItem;
