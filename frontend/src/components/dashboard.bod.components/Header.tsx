import { Bell, ChevronDown, LogOut, Moon, Sun, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/create.auth.store";

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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuthStore();

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
          {isDarkMode ? (
            <Sun className="text-yellow-300" />
          ) : (
            <Moon className="text-blue-300" />
          )}
        </button>

        {/* User Profile */}
        <div className="relative">
          <div className="flex justify-center items-center cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center focus:outline-none">
              {user?.image ? <img src={user.image} alt="User" /> : <User />}
            </div>
            <ChevronDown onClick={() => setShowUserMenu((prev) => !prev)} />
          </div>
          {showUserMenu && (
            <div
              className={`${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              } absolute right-0 mt-2 w-48 rounded-md shadow-lg z-20`}
            >
              <div className="py-1">
                <Link
                  to="/profile"
                  className={`${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  } block px-4 py-2 text-sm`}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className={`${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  } block px-4 py-2 text-sm`}
                >
                  Settings
                </Link>
                <button
                  type="button"
                  className={`${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  } block w-full text-left px-4 py-2 text-sm text-red-600 hover:text-red-700`}
                  onClick={logout}
                >
                  <span className="flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
