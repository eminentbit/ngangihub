import type React from "react"
import { FaBell, FaSearch, FaChevronDown } from "react-icons/fa"

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button className="lg:hidden mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="relative p-1">
              <FaBell className="h-6 w-6 text-gray-500" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                2
              </span>
            </button>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">JD</div>
            <span className="ml-2 mr-1 font-medium">John Doe</span>
            <FaChevronDown className="h-3 w-3 text-gray-500" />
          </div>
          <button className="bg-gray-200 px-4 py-1 rounded-md text-sm font-medium">Subscribe</button>
        </div>
      </div>
    </header>
  )
}

export default Header
