import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarItem from "../dashboard.admin.components/SidebarItem";
import NotificationsPreview from "../dashboard.admin.components/NotificationsPreview";
import {
  FaUserShield,
  FaUsers,
  FaChartBar,
  FaCog,
  FaBars,
  FaBell,
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
  { icon: <FaUserShield />, label: "Dashboard", path: "/user/dashboard" },
  { icon: <FaUsers />, label: "My Groups", path: "/user/my-groups" },
  { icon: <FaChartBar />, label: "Payment", path: "/user/payments" },
  { icon: <FaCog />, label: "Settings", path: "/user/settings" },
];

const menuNotifications: MenuItem[] = [
  { icon: <FaBell />, label: "Notifications", path: "/notifications" },
];

const allMenu = [...menuMain, ...menuNotifications];

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  activeTab,
  onToggle,
  onTabChange,
  notifications = [],
  onClose,
}) => {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
    onTabChange?.(path);
    if (window.innerWidth < 768) onClose();
  };

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
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-40 text-white bg-blue-800 p-2 rounded-full shadow md:block hidden"
          aria-label="Expand sidebar"
        >
          <FaBars size={20} />
        </button>
      )}

      {/* Desktop Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 bg-blue-700 text-white border-r flex flex-col transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-16"} hidden md:flex`}
      >
        <div className="flex items-center h-16 px-4 border-b border-blue-800 relative">
          {isOpen && (
            <button
              onClick={onToggle}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:text-blue-200"
              aria-label="Collapse sidebar"
            >
              <FaBars size={20} />
            </button>
          )}
        </div>
        <nav className="mt-2 flex-1 overflow-y-auto px-2">
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
          <div className="mt-6">
            <p
              className={`uppercase text-xs text-blue-200 mb-2 transition-opacity duration-200 ${
                !isOpen && "opacity-0"
              }`}
            >
              Notifications
            </p>
            {menuNotifications.map(({ icon, label, path }) => (
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
        <div className="mt-auto mb-4 px-2">
          <NotificationsPreview
            notifications={notifications}
            onViewAll={() => handleNav("/user/notifications")}
            showLabels={isOpen}
          />
        </div>
      </div>

      {/* Collapsed Desktop */}
      {!isOpen && (
        <div className="fixed left-0 top-0 bottom-0 z-20 bg-blue-700 text-white flex-col items-center w-16 pt-20 md:flex hidden">
          {renderCollapsedIcons()}
        </div>
      )}

      {/* Mobile Bottom Bar */}
      {!isOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-blue-700 text-white flex md:hidden h-16">
          {renderCollapsedIcons()}
        </div>
      )}

      {/* Mobile Overlay & Drawer */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden" onClick={onClose} />}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 bg-blue-700 text-white border-r transform transition-transform duration-300 ease-in-out w-64 md:hidden flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center h-16 px-4 border-b border-blue-800 relative">
          <img src="/logo2.png" alt="Logo" className="h-10 w-auto" />
          <button
            onClick={onClose}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:text-blue-200"
            aria-label="Close sidebar"
          >
            <FaBars size={20} />
          </button>
        </div>
        <nav className="mt-2 flex-1 overflow-y-auto px-2">
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
          <div className="mt-6">
            <p className="uppercase text-xs text-blue-200 mb-2">Notifications</p>
            {menuNotifications.map(({ icon, label, path }) => (
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
      </div>
    </>
  );
};

export default Sidebar;