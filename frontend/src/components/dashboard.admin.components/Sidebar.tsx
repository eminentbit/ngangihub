import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  FaBell,
} from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
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
  roles: Array<"admin" | "user">;
};

const allMenu: MenuItem[] = [
  { icon: <FaUserShield />, label: "Dashboard",      path: "/admin/dashboard",     roles: ["user", "admin"] },
  { icon: <FaUsers />,      label: "My Groups",      path: "/user/groups",        roles: ["user", "admin"] },
  { icon: <FaChartBar />,   label: "Payment",        path: "/user/payments",      roles: ["user", "admin"] },
  { icon: <FaCog />,        label: "Settings",       path: "/user/settings",      roles: ["user", "admin"] },
  { icon: <FaUsersCog />,   label: "Manage Members",  path: "/admin/manage-members",roles: ["admin"] },
  { icon: <FaUsers />,      label: "Groups Overview",  path: "/admin/groups",       roles: ["admin"] },
  { icon: <FaInfoCircle />, label: "Group Info",       path: "/admin/group-info",   roles: ["admin"] },
  { icon: <FaChartBar />,   label: "My Statistics",    path: "/admin/stats",        roles: ["admin"] },
  { icon: <FaUserPlus />,   label: "Add Member",       path: "/admin/add-member",   roles: ["admin"] },
  { icon: <FaCog />,        label: "Group Settings",   path: "/admin/group-settings", roles: ["admin"] },
  { icon: <FaBell />,       label: "Notifications",    path: "/admin/notifications",roles: ["admin"] },
];

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  onTabChange,
  notifications,
  onClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar manages its own state for user and loading
  const [user, setUser] = React.useState<{ role: "admin" | "user" } | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // put the real API here
    
    const fetchUser = async () => {
      setLoading(true);
      try {
        // Simulate backend API call
        const response = await new Promise<{ role: "admin" | "user" }>((resolve) =>
          setTimeout(() => resolve({ role: "admin" }), 500)
        );
        setUser(response);
      } catch {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  // Filter menu by user role
  const menu = React.useMemo(
    () => user ? allMenu.filter(item => item.roles.includes(user.role)) : [],
    [user]
  );

  if (loading) {
    return null; // or a spinner
  }

  if (!user) {
    return null; // or a "not logged in" message
  }

  const handleNav = (path: string) => {
    navigate(path);
    onTabChange?.(path);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const renderCollapsedIcons = () =>
    menu.map(({ icon, label, path }) => (
      <SidebarItem
        key={path}
        icon={icon}
        label={label}
        showLabels={false}
        active={location.pathname === path}
        onClick={() => handleNav(path)}
        className="flex-1 justify-center"
      />
    ));

  const renderItems = (showLabels: boolean) =>
    menu.map(({ icon, label, path }) => (
      <SidebarItem
        key={path}
        icon={icon}
        label={label}
        active={location.pathname === path}
        showLabels={showLabels}
        onClick={() => handleNav(path)}
      />
    ));

  return (
    <>
      {/* Toggle button (collapsed desktop) */}
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

      {/* Desktop Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 bg-blue-700 text-white border-r flex flex-col transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-16"} hidden md:flex`}
      >
        <div className="flex items-center h-16 px-4 border-b border-blue-800 relative">
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
        <nav className="mt-2 flex-1 overflow-y-auto px-2">
          {renderItems(isOpen)}
        </nav>
        {/* optional notifications preview for admins only */}
        {user.role === "admin" && notifications && (
          <div className="mt-auto center-content mb-4 px-2">
            <NotificationsPreview
              notifications={notifications}
              onViewAll={() => handleNav("/admin/notifications")}
              showLabels={isOpen}
            />
          </div>
        )}
      </div>

      {/* Collapsed desktop vertical */}
      {!isOpen && (
        <div className="fixed left-0 top-0 bottom-0 z-20 bg-blue-700 text-white flex-col items-center w-16 pt-20 md:flex hidden">
          {renderCollapsedIcons()}
        </div>
      )}

      {/* Mobile bottom bar */}
      {!isOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-blue-700 text-white flex md:hidden h-16">
          {renderCollapsedIcons()}
        </div>
      )}

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 bg-blue-700 text-white border-r transform transition-transform duration-300 ease-in-out w-64 md:hidden flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
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
        <nav className="mt-2 flex-1 overflow-y-auto px-2">
          {renderItems(true)}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;