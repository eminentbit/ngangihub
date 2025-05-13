import type React from "react"
import { Link } from "react-router-dom"
import { FaTachometerAlt, FaUsers, FaCreditCard, FaCog } from "react-icons/fa"

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-indigo-700 text-white flex flex-col">
      <div className="p-4 flex items-center">
        <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="font-bold text-xl">Logo</span>
      </div>

      <div className="p-4">
        <h2 className="text-xs font-semibold tracking-wider uppercase mb-3">MENU</h2>
        <nav>
          <ul className="space-y-1">
            <li>
              <Link to="/dashboard" className="flex items-center px-4 py-2 bg-indigo-800 rounded-md">
                <FaTachometerAlt className="h-5 w-5 mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/groups" className="flex items-center px-4 py-2 hover:bg-indigo-800 rounded-md">
                <FaUsers className="h-5 w-5 mr-3" />
                <span>My Groups</span>
              </Link>
            </li>
            <li>
              <Link to="/payments" className="flex items-center px-4 py-2 hover:bg-indigo-800 rounded-md">
                <FaCreditCard className="h-5 w-5 mr-3" />
                <span>Payments</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-indigo-800 rounded-md">
                <FaCog className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="p-4 mt-auto">
        <h2 className="text-xs font-semibold tracking-wider uppercase mb-3 flex items-center">
          NOTIFICATIONS
          <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            4
          </span>
        </h2>
        <div className="space-y-3">
          <div className="bg-indigo-800 p-3 rounded-md text-sm">
            <p>John added you to Team Alpha</p>
            <p className="text-indigo-300 text-xs mt-1">2 hours ago</p>
          </div>
          <div className="bg-indigo-800 p-3 rounded-md text-sm">
            <p>Sarah paid her contribution to Project Beta</p>
            <p className="text-indigo-300 text-xs mt-1">5 hours ago</p>
          </div>
          <button className="text-indigo-300 text-sm hover:text-white">View all notifications</button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
