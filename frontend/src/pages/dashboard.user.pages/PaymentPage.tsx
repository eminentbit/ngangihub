import { useState, useEffect } from "react";
import Payments from "../../components/dashboard.user.components/Payments";
import Header from "../../components/dashboard.admin.components/Header";
import Sidebar from "../../components/dashboard.admin.components/Sidebar";

export default function PaymentsPage() {
  // Dark mode
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("dark-mode") === "true"
  );
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("dark-mode", "false");
    }
  }, [darkMode]);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar  = () => setSidebarOpen(false);

  // slide-over class for both header & main
  const slideClass = sidebarOpen ? "md:ml-64" : "md:ml-16";

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        onClose={closeSidebar}
      />

      {/* Content wrapper (slides with sidebar) */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${slideClass}`}>
        {/* Header */}
        <Header
          darkMode={darkMode}
          setDarkMode={toggleDarkMode}
          // add a menu button in Header that calls onMenuClick={toggleSidebar} if you need one
        />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 sm:p-8 md:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <Payments />
          </div>
        </main>
      </div>
    </div>
  );
}
