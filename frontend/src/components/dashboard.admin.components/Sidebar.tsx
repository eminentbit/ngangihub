// Sidebar.tsx
import React from 'react';
import SidebarItem from './SidebarItem';
import NotificationsPreview from './NotificationsPreview';
import {
  FaUserShield,
  FaUsersCog,
  FaUsers,
  FaInfoCircle,
  FaChartBar,
  FaUserPlus,
  FaCog,
  FaSlidersH
} from 'react-icons/fa';

interface Notification {
  id: number;
  message: string;
  time: string;
  isRead: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  notifications: Notification[];
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  activeTab,
  onTabChange,
  notifications,
  onClose,
}) => {
  const containerClasses = `
    fixed inset-y-0 overflow-y-auto left-0 z-30 w-64 bg-indigo-700 text-white
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <div className={containerClasses}>
      <div className="flex items-center justify-between p-4 border-b border-indigo-600">
        <img src="/logo3.png" alt="Logo" className="w-15 h-12" />
        <button
          onClick={onClose}
          className="text-white focus:outline-none lg:hidden"
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? 'Close' : 'Open'}
        </button>
      </div>
      
      <SidebarItem
        icon={<FaUserShield />}
        label="Admin Dashboard"
        active={activeTab === 'admin'}
        onClick={() => onTabChange('admin')}
      />
      <SidebarItem
        icon={<FaUsersCog />}
        label="Manage Members"
        active={activeTab === 'manage-members'}
        onClick={() => onTabChange('manage-members')}
      />

      <div className="pt-4 pb-2">
        <h3 className="font-bold text-indigo-200 mb-2 ml-3">MY GROUPS</h3>
        <SidebarItem
          icon={<FaUsers />}
          label="Groups Overview"
          active={activeTab === 'my-groups'}
          onClick={() => onTabChange('my-groups')}
        />
        <SidebarItem
          icon={<FaInfoCircle />}
          label="Group Info"
          active={activeTab === 'group-info'}
          onClick={() => onTabChange('group-info')}
        />
        <SidebarItem
          icon={<FaChartBar />}
          label="My Statistics"
          active={activeTab === 'user-stats'}
          onClick={() => onTabChange('user-stats')}
        />
        <SidebarItem
          icon={<FaUserPlus />}
          label="Add Member"
          active={activeTab === 'add-member'}
          onClick={() => onTabChange('add-member')}
        />
      </div>

      <div className="pt-4 pb-2">
        <h3 className="font-bold text-indigo-200 mb-2 ml-3">SETTINGS</h3>
        <SidebarItem
          icon={<FaCog />}
          label="Settings"
          active={activeTab === 'settings'}
          onClick={() => onTabChange('settings')}
        />
        <SidebarItem
          icon={<FaSlidersH />}
          label="Group Settings"
          active={activeTab === 'group-settings'}
          onClick={() => onTabChange('group-settings')}
        />
      </div>

      <NotificationsPreview
        notifications={notifications}
        onViewAll={() => onTabChange('notifications')}
      />
    </div>
  );
};

export default Sidebar;
