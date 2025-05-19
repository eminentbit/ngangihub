import { useEffect, useState } from "react";

import MyGroups from "../../components/dashboard.user.components/my-groups";
import Sidebar from "../../components/dashboard.user.components/Sidebar";
import Header from "../../components/dashboard.admin.components/Header";

export default function MyGroupsPage() {

  // Sidebar open/closed
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [activeTab, setActiveTab] = useState<string>("Dashboard");

  const [darkMode, setDarkMode] = useState<boolean>(
    () => localStorage.getItem("dark-mode") === "true"
  );

  // Sync html.dark & localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("dark-mode", darkMode ? "true" : "false");
  }, [darkMode]);

  // Tab change handler
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <Sidebar
      isOpen={isOpen}
      activeTab={activeTab}
      onToggle={() => setIsOpen(o => !o)}
      onTabChange={handleTabChange}      
      onClose={() => setIsOpen(false)}
    />
    <Header
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
    <main className="flex-grow p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">
          My Groups
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Here you can view and manage your groups.
        </p>
        <MyGroups />
      </div>
    </main>


      </div>
  );
}
