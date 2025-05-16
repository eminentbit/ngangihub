"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { LayoutDashboard, Users, CreditCard, Settings, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [expandedNotifications, setExpandedNotifications] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Handle sidebar state on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "My Groups", icon: Users, path: "/my-groups" },
    { name: "Payments", icon: CreditCard, path: "/payments" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ]

  const notifications = [
    {
      id: 1,
      message: "John added you to Team Alpha",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "Sarah paid her contribution to Project Beta",
      time: "5 hours ago",
    },
  ]

  const handleNotificationClick = (notification) => {
    // In a real app, this would mark the notification as read
    console.log("Notification clicked:", notification)

    // Navigate based on notification type
    if (notification.message.includes("Team Alpha")) {
      router.push("/my-groups")
    } else if (notification.message.includes("contribution")) {
      router.push("/payments")
    }
  }

  return (
    <div
      className={`${isSidebarOpen ? "w-56" : "w-0 md:w-16"} bg-indigo-700 text-white flex flex-col h-screen transition-all duration-300 relative`}
    >
      {/* Toggle button - NEW CODE */}
      <button
        className="absolute top-4 right-4 text-white hover:text-indigo-200 z-10"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo - MODIFIED CODE */}
      <div className="p-4 flex items-start">
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-10 overflow-hidden">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
          </div>
        </Link>
      </div>

      <div className="mt-6 overflow-hidden">
        <div className={`px-4 py-2 text-sm font-semibold text-indigo-200 ${!isSidebarOpen && "md:text-center"}`}>
          {isSidebarOpen ? "MENU" : ""}
        </div>
        <nav className="mt-2 space-y-1 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`sidebar-item ${pathname === item.path ? "active" : ""} ${!isSidebarOpen && "md:justify-center"}`}
              title={!isSidebarOpen ? item.name : ""}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {isSidebarOpen && (
        <div className="mt-6 flex-1 overflow-y-auto">
          <div
            className="px-4 py-2 text-sm font-semibold text-indigo-200 flex justify-between items-center cursor-pointer"
            onClick={() => setExpandedNotifications(!expandedNotifications)}
          >
            <span>NOTIFICATIONS</span>
            <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              4
            </span>
          </div>
          {expandedNotifications && (
            <div className="mt-2 space-y-1 px-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-2 text-sm bg-indigo-800 rounded-md mb-2 cursor-pointer hover:bg-indigo-900 transition-colors"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <p className="text-white">{notification.message}</p>
                  <p className="text-indigo-300 text-xs mt-1">{notification.time}</p>
                </div>
              ))}
              <Link href="/notifications" className="block text-sm text-indigo-300 hover:text-white px-2 py-1">
                View all notifications
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Sidebar

