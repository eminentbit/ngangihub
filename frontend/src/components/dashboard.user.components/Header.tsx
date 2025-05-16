"use client"

import { useState } from "react"
import { Bell, Search, ChevronDown, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import SubscriptionModal from "./subscription-modal"

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // In a real app, this would trigger a search
    console.log("Searching for:", searchQuery)
  }

  const handleSubscribe = () => {
    setShowSubscriptionModal(false)
    setIsSubscribed(true)
    // Show success message
    alert("Subscription successful! You now have access to premium features.")
  }

  const notifications = [
    { id: 1, message: "John added you to Team Alpha", time: "2 hours ago" },
    { id: 2, message: "Sarah paid her contribution to Project Beta", time: "5 hours ago" },
  ]

  // Exchange rate: 1 USD = approximately 600 CFA
  const CFA_EXCHANGE_RATE = 600

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <button className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden">
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <form onSubmit={handleSearch} className="relative ml-4 w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm placeholder-gray-400 bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <div className="relative">
          <button
            className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold">Notifications</h3>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="/notifications"
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  View all notifications
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button className="flex items-center gap-2" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">JD</div>
            <span className="text-sm font-medium dark:text-gray-200">John Doe</span>
            <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
              <a
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Your Profile
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings
              </a>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  // In a real app, this would trigger a logout
                  console.log("Logging out")
                  setIsUserMenuOpen(false)
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>

        <button
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-1.5 text-sm font-medium rounded-md"
          onClick={() => setShowSubscriptionModal(true)}
        >
          {isSubscribed ? "Manage Subscription" : "Subscribe"}
        </button>
      </div>

      {showSubscriptionModal && (
        <SubscriptionModal onClose={() => setShowSubscriptionModal(false)} onSubscribe={handleSubscribe} />
      )}
    </header>
  )
}

export default Header
