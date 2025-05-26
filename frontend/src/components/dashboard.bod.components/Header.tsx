import { Bell, Moon, Sun } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  notificationCount: number;
}

const Header: React.FC<HeaderProps> = ({
  toggleTheme,
  isDarkMode,
  notificationCount,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-purple-700 text-white"
      } p-4 flex justify-between items-center relative`}
    >
      <div className="flex items-center space-x-4">
        <img src="/logo.png" alt="Logo" className="h-10" />
        <input
          type="text"
          placeholder="Search..."
          className={`${
            isDarkMode
              ? "bg-gray-800 placeholder-gray-400 text-white"
              : "bg-white placeholder-gray-500 text-gray-900"
          } px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
      </div>

      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative focus:outline-none"
          >
            <span className="text-xl">
              <Bell />
            </span>
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className={`${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              } absolute right-0 mt-2 w-72 rounded-md shadow-lg z-20`}
            >
              <h4 className="px-4 py-2 font-semibold border-b border-gray-200 dark:border-gray-700">
                Notifications
              </h4>
              <ul className="max-h-60 overflow-auto">
                <li
                  className={`${
                    isDarkMode ? "bg-gray-700" : "bg-purple-100"
                  } px-4 py-2 rounded-lg m-2`}
                >
                  🚨 Board meeting scheduled for next week{" "}
                  <span className="text-xs text-gray-400">(2 hours ago)</span>
                </li>
                <li
                  className={`${
                    isDarkMode ? "bg-gray-700" : "bg-purple-100"
                  } px-4 py-2 rounded-lg m-2`}
                >
                  🚨 Annual report review pending{" "}
                  <span className="text-xs text-gray-400">(5 hours ago)</span>
                </li>
                <li className="px-4 py-2 mt-2">
                  <Link
                    to="/board/notifications"
                    className={`${
                      isDarkMode ? "text-indigo-300" : "text-indigo-600"
                    } hover:underline block`}
                  >
                    View all notifications
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="focus:outline-none text-xl"
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </button>

        {/* User Info */}
        <div className="flex items-center space-x-2">
          {/* <span className="text-sm">👤 Wepngong Shalom</span> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
