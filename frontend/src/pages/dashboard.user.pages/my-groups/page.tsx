import { useEffect, useState } from "react";

import MyGroups from "../../../components/dashboard.user.components/my-groups";
import Sidebar from "../../../components/dashboard.user.components/Sidebar";
import Header from "../../../components/dashboard.user.components/Header";

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

        {/* Page content */}
        <main className="p-4 flex-1 overflow-auto">
          <MyGroups />
        </main>
      </div>
  );
}
