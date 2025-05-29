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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  // Match margin to Sidebar width: when open, Sidebar uses w-60 (15rem); when closed, w-16 (4rem)
  const slideClass = sidebarOpen ? "md:ml-60" : "md:ml-16";

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        onClose={closeSidebar}
      />

      {/* Content wrapper slides with Sidebar width */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${slideClass}`}>  

        {/* Header */}
        <Header
          darkMode={darkMode}
          setDarkMode={toggleDarkMode}
          
        />

        {/* Main content */}
       <main className="flex flex-col flex-1 overflow-auto max-w-5xl w-full mx-auto px-2 sm:px-4 lg:px-8 py-8 bg-white dark:bg-gray-800 rounded-lg shadow transition-all duration-300">

          <Payments />
        </main>
      </div>
    </div>
  );
}
