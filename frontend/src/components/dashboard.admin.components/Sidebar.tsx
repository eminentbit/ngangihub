import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  FaBars,
} from 'react-icons/fa';


interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onToggle: () => void;
  onTabChange?: (tab: string) => void; 
  notifications?: { id: number; message: string; time: string; isRead: boolean; }[];
  onClose: () => void;
  
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  activeTab,
  onToggle,
}) => {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {/* Toggle button (visible when collapsed) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-40 text-white bg-blue-800 p-2 rounded-full shadow focus:outline-none"
          title="Expand sidebar"
          aria-label="Expand sidebar"
          type="button"
        >
          <FaBars size={20} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30
          bg-blue-700 text-white border-r
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 flex flex-col
        `}
      >
        {/* Logo and Collapse button */}
        <div className="flex items-center h-16 px-4 border-b border-blue-800 relative">
          <img
            src="/logo2.png"
            alt="Logo"
            className="h-10 w-auto"
          />
          {isOpen && (
            <button
              onClick={onToggle}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:text-blue-200 focus:outline-none"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
              type="button"
            >
              <FaBars size={20} />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="mt-2 flex-1 overflow-y-auto">
          {[
            { icon: <FaUserShield />, label: 'Admin Dashboard', path: '/admindashboard' },
            { icon: <FaUsersCog />, label: 'Manage Members', path: '/admin-manage-members' },
          ].map(({ icon, label, path }) => (
            <SidebarItem
              key={path}
              icon={icon}
              label={label}
              active={activeTab === path}
              showLabels={isOpen}
              onClick={() => handleNav(path)}
            />
          ))}

          <div className="mt-6 px-2">
            <p className="uppercase text-xs text-blue-200 mb-2 px-2 transition-opacity duration-200">
              My Groups
            </p>
            {[
              { icon: <FaUsers />, label: 'Groups Overview', path: '/groups-admin' },
              { icon: <FaInfoCircle />, label: 'Group Info', path: '/group-info-admin' },
              { icon: <FaChartBar />, label: 'My Statistics', path: '/stats-admin' },
              { icon: <FaUserPlus />, label: 'Add Member', path: '/add-member-admin' },
            ].map(({ icon, label, path }) => (
              <SidebarItem
                key={path}
                icon={icon}
                label={label}
                active={activeTab === path}
                showLabels={isOpen}
                onClick={() => handleNav(path)}
              />
            ))}
          </div>

          <div className="mt-6 px-2">
            <p className="uppercase text-xs text-blue-200 mb-2 px-2 transition-opacity duration-200">
              Settings
            </p>
            {[
              { icon: <FaCog />, label: 'Group Settings', path: '/group-settings-admin' },
              
            ].map(({ icon, label, path }) => (
              <SidebarItem
                key={path}
                icon={icon}
                label={label}
                active={activeTab === path}
                showLabels={isOpen}
                onClick={() => handleNav(path)}
              />
            ))}
          </div>
        </nav>

        {/* Notifications preview */}
        <div className="mt-auto mb-4 px-2">
          <NotificationsPreview
            notifications={[] /* pass real notifications */}
            onViewAll={() => handleNav('/notifications')}
            showLabels={isOpen}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
