import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import Sidebar from "../../components/dashboard.admin.components/Sidebar";
import Header from "../../components/dashboard.admin.components/Header";
import ChatInterface from "../../components/dashboard.user.components/chat-interface";
import { Plus } from "lucide-react";
import useUserStore from "../../store/create.user.store";
import GroupItem from "../../components/dashboard.user.components/GroupItem";

// Dummy group data type
// type Group = {
//   id: string;
//   name: string;
//   members: number;
//   paid: number;
//   role: "Admin" | "Member" | string;
// };

// const groups: Group[] = [
//   { id: "1", name: "Team Alpha", members: 8, paid: 6, role: "Admin" },
//   { id: "2", name: "Project Beta", members: 5, paid: 3, role: "Member" },
//   { id: "3", name: "Marketing Team", members: 10, paid: 8, role: "Admin" },
//   { id: "4", name: "Finance Group", members: 6, paid: 4, role: "Member" },
//   { id: "5", name: "Design Team", members: 7, paid: 5, role: "Member" },
//   { id: "6", name: "Sales Team", members: 9, paid: 7, role: "Admin" },
// ];

const MyGroups: React.FC = () => {
  // Modal state
  const [chatModalGroupId, setChatModalGroupId] = useState<string | null>(null);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  // Sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load persisted dark mode
  useEffect(() => {
    if (localStorage.getItem("dark-mode") === "true") {
      setDarkMode(true);
    }
  }, []);

  // Apply/remove `dark` class and persist
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-mode", "false");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  // For shifting content with sidebar
  const offsetClass = sidebarOpen ? "lg:ml-64" : "lg:ml-16";

  const { fetchGroups, groups } = useUserStore();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  // Find the group being chatted
  const chatGroup = groups.find((g) => g._id === chatModalGroupId);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        //activeTab="my-groups"
        onToggle={toggleSidebar}
        onClose={closeSidebar}
      />

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${offsetClass}`}
      >
        {/* Header */}
        <Header darkMode={darkMode} setDarkMode={toggleDarkMode} />

        {/* Page content */}
        <main
          className={`flex-1 transition-all duration-300 min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 overflow-auto 
          ${sidebarOpen ? "lg:ml-4" : "lg:ml-6"}`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-white">
              My Groups
            </h1>
            <button
              type="button"
              className="bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-blue-400 font-semibold rounded-lg px-6 py-3 shadow-lg transition-all duration-150"
              // onClick={createGroup}
            >
              <span className="flex">
                <Plus />
                Create New Group
              </span>
            </button>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.map((group) => (
              <GroupItem
                key={group._id}
                group={group}
                setChatModalGroupId={setChatModalGroupId}
              />
            ))}
          </section>
        </main>
      </div>

      {/* Chat Modal */}
      {chatModalGroupId && chatGroup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60"
          onClick={() => setChatModalGroupId(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setChatModalGroupId(null)}
              aria-label="Close chat"
            >
              <HiX className="w-6 h-6" />
            </button>

            {/* Modal header */}
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {chatGroup.name} Chat
            </h2>

            {/* Chat content */}
            <div className="max-h-[60vh] overflow-y-auto">
              <ChatInterface
                groupId={chatGroup._id}
                groupName={chatGroup.name || ""}
                onClose={() => setChatModalGroupId(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGroups;
