import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { notifications } from "../../utils/data.admin.dashboard";
import { Link } from "react-scroll";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  // Notification popover
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  // Profile popover
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  // Close popovers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-end px-6 py-4 border-b dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-30">
      {/* User Profile */}
      <div className="relative mr-4" ref={profileRef}>
        <button
          type="button"
          className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 focus:outline-none"
          onClick={() => setShowProfileMenu((v) => !v)}
          aria-label="User menu"
        >
          <FaUserCircle size={28} />
          <span className="ml-2 font-medium">John Doe</span>
        </button>
        {showProfileMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
            <ul className="py-1">
              <li>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Profile
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                 <Link to="/"> Settings</Link>
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Notification Bell */}
      <div className="relative mr-4" ref={notificationRef}>
        <button
          type="button"
          className="relative text-gray-700 dark:text-gray-200 hover:text-blue-600 focus:outline-none"
          onClick={() => setShowNotifications((v) => !v)}
          aria-label="Show notifications"
        >
          <FaBell size={22} />
          {notifications.some((n) => !n.isRead) && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 border border-white dark:border-gray-900"></span>
          )}
        </button>
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
            <div className="p-4 border-b dark:border-gray-700 font-semibold text-blue-700 dark:text-blue-400">
              Notifications
            </div>
            <ul>
              {notifications.length === 0 ? (
                <li className="p-4 text-gray-500">No notifications</li>
              ) : (
                notifications.map((n) => (
                  <li
                    key={n.id}
                    className={`px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 rounded transition ${
                      !n.isRead
                        ? "font-bold text-blue-800 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        !n.isRead ? "bg-blue-500" : "bg-gray-400"
                      } mr-2`}
                    ></span>
                    <span>{n.message}</span>
                    <span className="ml-auto text-xs text-gray-400">
                      {n.time}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Light/Dark toggle */}
      <button
        type="button"
        className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-blue-900 transition focus:outline-none"
        onClick={() => setDarkMode((d) => !d)}
        aria-label="Toggle color mode"
      >
        {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
      </button>
    </header>
  );
};

export default Header;
