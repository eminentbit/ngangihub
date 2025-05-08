
import { FC } from 'react';
import { FaBars, FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleNotifications: () => void;
  unreadCount: number;
}

const Header: FC<HeaderProps> = ({ onToggleSidebar, onToggleNotifications, unreadCount }) => (
  <header className="bg-white shadow-sm">
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
        {/* Sidebar toggle */}
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
          className="text-gray-600 hover:text-indigo-600 focus:outline-none"
        >
          <FaBars size={20} aria-hidden="true" />
        </button>

        {/* Search input */}
        <div className="ml-4 relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" aria-hidden="true" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications toggle */}
        <button
          type="button"
          onClick={onToggleNotifications}
          aria-label="Toggle notifications"
          title="Toggle notifications"
          className="relative text-gray-600 hover:text-indigo-600 focus:outline-none"
        >
          <FaBell size={20} aria-hidden="true" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User menu */}
        <button
          type="button"
          aria-label="Open user menu"
          title="Open user menu"
          className="relative flex items-center space-x-2 cursor-pointer focus:outline-none"
          onClick={() => { /* handle open menu */ }}
        >
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            JD
          </div>
          <span className="text-gray-700 font-medium">John Doe</span>
          <FaChevronDown className="text-gray-500 text-xs" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
);

export default Header;
