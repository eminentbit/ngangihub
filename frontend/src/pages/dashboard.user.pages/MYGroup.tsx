import React, { useState, useEffect } from "react";
import { HiOutlineChat, HiOutlineUserGroup, HiX } from "react-icons/hi";
import Sidebar from "../../components/dashboard.admin.components/Sidebar";
import Header from "../../components/dashboard.admin.components/Header";
import ChatInterface from "../../components/dashboard.user.components/chat-interface";
import { Link } from "react-router-dom";

// Dummy group data type
type Group = {
  id: string;
  name: string;
  members: number;
  paid: number;
  role: "Admin" | "Member" | string;
};

const groups: Group[] = [
  { id: "1", name: "Team Alpha", members: 8, paid: 6, role: "Admin" },
  { id: "2", name: "Project Beta", members: 5, paid: 3, role: "Member" },
  { id: "3", name: "Marketing Team", members: 10, paid: 8, role: "Admin" },
  { id: "4", name: "Finance Group", members: 6, paid: 4, role: "Member" },
  { id: "5", name: "Design Team", members: 7, paid: 5, role: "Member" },
  { id: "6", name: "Sales Team", members: 9, paid: 7, role: "Admin" },
];

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
  const toggleSidebar  = () => setSidebarOpen((prev) => !prev);
  const closeSidebar   = () => setSidebarOpen(false);

  // For shifting content with sidebar
  const offsetClass = sidebarOpen ? "lg:ml-64" : "lg:ml-16";

  // Find the group being chatted
  const chatGroup = groups.find(g => g.id === chatModalGroupId);

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
      <div className={`flex-1 flex flex-col transition-all duration-300 ${offsetClass}`}>
        {/* Header */}
        <Header
         darkMode={darkMode} 
        setDarkMode={toggleDarkMode}
         />

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
              className="bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-blue-400 font-semibold rounded-lg px-6 py-3 shadow-lg transition-all duration-150"
              // onClick={createGroup}
            >
              + Create New Group
            </button>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-200 dark:border-gray-700 flex flex-col justify-between"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-lg p-3">
                    <HiOutlineUserGroup className="w-8 h-8" />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {group.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {group.members} members
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span
                      className={`inline-block text-xs font-semibold px-4 py-1 rounded-full ${
                        group.role === "Admin"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {group.role}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Payment Status
                  </div>
                  <div className="relative h-3 rounded-full bg-gray-200 dark:bg-gray-700 mb-2 overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-3 rounded-full bg-green-500 transition-all"
                      style={{ width: `${(group.paid / group.members) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {group.paid}/{group.members} paid
                  </p>
                </div>

                <div className="flex gap-4 items-center mb-4">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg px-5 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium shadow-md transition"
                    onClick={() => setChatModalGroupId(group.id)}
                  >
                    <HiOutlineChat className="w-5 h-5" /> Chat
                  </button>
                </div>

    <Link
  to={`/user/groups/${group.id}`}
  state={{ group }}
  className="…"
>
  Details
</Link>

              </div>
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
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={()=> setChatModalGroupId(null)}
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
              <ChatInterface groupId={chatGroup.id} groupName={""} onClose={() => setChatModalGroupId(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGroups;
