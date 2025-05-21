import { useState, useEffect } from "react";
import Payments from "../../components/dashboard.user.components/Payments";
import Header from "../../components/dashboard.admin.components/Header";

export default function PaymentsPage() {
  // State to manage dark mode
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("dark-mode") === "true"
  );

  // Sync dark mode with localStorage and apply the class
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

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <Header darkMode={darkMode} setDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-full mx-auto px-2 sm:px-4 md:px-8 lg:px-10 py-4 sm:py-6 space-y-6 overflow-x-hidden">
        {/* Payments Component */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-full p-3 sm:p-6 md:p-8">
          <Payments />
        </div>
      </main>
    </div>
  );
}