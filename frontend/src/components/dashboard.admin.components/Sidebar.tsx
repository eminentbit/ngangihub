import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import NotificationsPreview from "./NotificationsPreview";
import {
  FaUserShield,
  FaUsersCog,
  FaUsers,
  FaInfoCircle,
  FaChartBar,
  FaUserPlus,
  FaCog,
  FaBars,
} from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onToggle: () => void;
  onTabChange?: (tab: string) => void;
  notifications?: {
    id: number;
    message: string;
    time: string;
    isRead: boolean;
  }[];
  onClose: () => void;
}

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
};

const menuMain: MenuItem[] = [
  { icon: <FaUserShield />, label: "Admin Dashboard", path: "/admin/dashboard" },
  { icon: <FaUsersCog />, label: "Manage Members", path: "/admin/manage-members" },
];

const menuGroups: MenuItem[] = [
  { icon: <FaUsers />, label: "Groups Overview", path: "/admin/groups" },
  { icon: <FaInfoCircle />, label: "Group Info", path: "/admin/group-info" },
  { icon: <FaChartBar />, label: "My Statistics", path: "/admin/stats" },
  { icon: <FaUserPlus />, label: "Add Member", path: "/admin/add-member" },
];

const menuSettings: MenuItem[] = [
  { icon: <FaCog />, label: "Group Settings", path: "/admin/group-settings" },
];

const allMenu: MenuItem[] = [...menuMain, ...menuGroups, ...menuSettings];

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  activeTab,
  onToggle,
  onTabChange,
  notifications,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
    onTabChange?.(path);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  // Render icon-only buttons for collapsed sidebar or mobile bottom bar
  const renderCollapsedIcons = () =>
    allMenu.map(({ icon, label, path }) => (
      <SidebarItem
        key={path}
        icon={icon}
        label={label}
        showLabels={false}
        active={activeTab === path}
        onClick={() => handleNav(path)}
        className="flex-1 justify-center"
      />
    ));

  return (
    <>
      {/* Toggle button (visible when collapsed, desktop only) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-40 text-white bg-blue-800 p-2 rounded-full shadow focus:outline-none md:block hidden"
          title="Expand sidebar"
          aria-label="Expand sidebar"
          type="button"
        >
          <FaBars size={20} />
        </button>
      )}

      {/* Sidebar (Desktop side) */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30
          bg-blue-700 text-white border-r
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-16"}
          md:top-0 md:bottom-0 md:left-0
          hidden md:flex
        `}
      >
        {/* Logo and Collapse button */}
        <div className="flex items-center h-16 px-4 border-b border-blue-800 relative">
          <img src="/logo2.png" alt="Logo" className="h-10 w-auto" />
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
          {/* Main */}
          {menuMain.map(({ icon, label, path }) => (
            <SidebarItem
              key={path}
              icon={icon}
              label={label}
              active={activeTab === path}
              showLabels={isOpen}
              onClick={() => handleNav(path)}
            />
          ))}
          {/* Groups */}
          <div className="mt-6 px-2">
            <p
              className={`uppercase text-xs text-blue-200 mb-2 px-2 transition-opacity duration-200 ${
                !isOpen && "opacity-0"
              }`}
            >
              My Groups
            </p>
            {menuGroups.map(({ icon, label, path }) => (
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
          {/* Settings */}
          <div className="mt-6 px-2">
            <p
              className={`uppercase text-xs text-blue-200 mb-2 px-2 transition-opacity duration-200 ${
                !isOpen && "opacity-0"
              }`}
            >
              Settings
            </p>
            {menuSettings.map(({ icon, label, path }) => (
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
            notifications={notifications || []}
            onViewAll={() => handleNav("/notifications")}
            showLabels={isOpen}
          />
        </div>
      </div>

      {/* Collapsed vertical sidebar (Desktop only) */}
      {!isOpen && (
        <div
          className="
            fixed left-0 top-0 bottom-0 z-20 bg-blue-700 border-r text-white flex-col items-center
            w-16 pt-20
            md:flex
            hidden
          "
        >
          {renderCollapsedIcons()}
        </div>
      )}

      {/* Bottom bar (Mobile only, collapsed) */}
      {!isOpen && (
        <div
          className="
            fixed bottom-0 left-0 right-0 z-40 bg-blue-700 border-t text-white flex md:hidden
            h-16
          "
        >
          {renderCollapsedIcons()}
        </div>
      )}

      {/* Open sidebar overlay (Mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar drawer (Mobile only) */}
      <div
        className={`
          fixed top-0 left-0 bottom-0 z-50 bg-blue-700 text-white border-r
          transform transition-transform duration-300 ease-in-out
          w-64
          md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
        `}
      >
        {/* Logo and Collapse button */}
        <div className="flex items-center h-16 px-4 border-b border-blue-800 relative">
          <img src="/logo2.png" alt="Logo" className="h-10 w-auto" />
          {isOpen && (
            <button
              onClick={onClose}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:text-blue-200 focus:outline-none"
              title="Close sidebar"
              aria-label="Close sidebar"
              type="button"
            >
              <FaBars size={20} />
            </button>
          )}
        </div>
        {/* Menu Items */}
        <nav className="mt-2 flex-1 overflow-y-auto">
          {/* Main */}
          {menuMain.map(({ icon, label, path }) => (
            <SidebarItem
              key={path}
              icon={icon}
              label={label}
              active={activeTab === path}
              showLabels={true}
              onClick={() => handleNav(path)}
            />
          ))}
          {/* Groups */}
          <div className="mt-6 px-2">
            <p className="uppercase text-xs text-blue-200 mb-2 px-2">
              My Groups
            </p>
            {menuGroups.map(({ icon, label, path }) => (
              <SidebarItem
                key={path}
                icon={icon}
                label={label}
                active={activeTab === path}
                showLabels={true}
                onClick={() => handleNav(path)}
              />
            ))}
          </div>
          {/* Settings */}
          <div className="mt-6 px-2">
            <p className="uppercase text-xs text-blue-200 mb-2 px-2">
              Settings
            </p>
            {menuSettings.map(({ icon, label, path }) => (
              <SidebarItem
                key={path}
                icon={icon}
                label={label}
                active={activeTab === path}
                showLabels={true}
                onClick={() => handleNav(path)}
              />
            ))}
          </div>
        </nav>
        {/* Notifications preview */}
        <div className="mt-auto mb-4 px-2">
          <NotificationsPreview
            notifications={notifications || []}
            onViewAll={() => handleNav("/notifications")}
            showLabels={true}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;