"use client";

import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "/public/logo.png";

const Sidebar = ({
  activeTab: propActive,
  isOpen,
  setIsOpen,
  onToggle,
}: {
  activeTab?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onToggle: () => void;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [expandedNotifications, setExpandedNotifications] = useState(false);

  // Close sidebar on small screens
  useEffect(() => {
    const onResize = () => setIsOpen(window.innerWidth >= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setIsOpen]);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/user/dashboard" },
    { name: "My Groups", icon: Users, path: "/user/groups" },
    { name: "Payments", icon: CreditCard, path: "/user/payments" },
    { name: "Settings", icon: Settings, path: "/user/settings" },
  ];

  const notifications = [
    { id: 1, message: "John added you to Team Alpha", time: "2 hours ago" },
    {
      id: 2,
      message: "Sarah paid her contribution to Project Beta",
      time: "5 hours ago",
    },
  ];

  interface MenuItem {
    name: string;
    icon: React.ComponentType;
    path: string;
  }

  const active = (item: MenuItem): boolean => {
    if (propActive) return propActive === item.name.toLowerCase();
    return pathname === item.path;
  };

  return (
    <aside
      className={`flex fixed flex-col h-screen bg-indigo-700 text-white transition-width duration-300 ${
        isOpen ? "w-56" : "w-16"
      }`}
    >
      {/* Toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        className="absolute top-4 right-4 p-1 hover:text-indigo-200 focus:outline-none"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo */}
      {isOpen && (
        <div
          className="flex items-center p-4 hover:bg-indigo-600 transition-colors justify-center w-20 cursor-pointer mx-au"
          onClick={() => navigate("/user/dashboard")}
        >
          <img src={Logo} alt="Logo" className="h-10 w-full" />
        </div>
      )}

      {/* Menu */}
      <nav className="mt-6 flex-1 px-2 py-10 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-2 rounded-lg mb-1 hover:bg-indigo-600 transition-colors ${
              active(item) ? "bg-indigo-800" : ""
            } ${!isOpen && "justify-center"}`}
            title={!isOpen ? item.name : undefined}
          >
            <item.icon className="h-6 w-6" />
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Notifications */}
      {isOpen && (
        <section className="px-2">
          <div
            className="flex items-center justify-between p-2 mt-4 text-sm font-semibold text-indigo-200 cursor-pointer hover:text-white transition-colors"
            onClick={() => setExpandedNotifications(!expandedNotifications)}
          >
            <span>Notifications</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs">
              {notifications.length}
            </span>
          </div>
          {expandedNotifications && (
            <div className="mt-2 space-y-1 max-h-40 overflow-y-auto px-2">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-2 rounded-md hover:bg-indigo-600 transition-colors cursor-pointer"
                  onClick={() => {
                    console.log("Notification:", n);
                    if (n.message.includes("Team Alpha"))
                      navigate("/my-groups");
                    else if (n.message.includes("contribution"))
                      navigate("/payments");
                  }}
                >
                  <p className="text-sm">{n.message}</p>
                  <p className="text-xs text-indigo-300">{n.time}</p>
                </div>
              ))}
              <Link
                to="/notifications"
                className="block p-2 text-sm text-indigo-300 hover:text-white"
              >
                View all
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Footer */}
      <div className="p-4">
        {isOpen && (
          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-3 p-2 w-full rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <Settings className="h-6 w-6" />
            <span>Settings</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
