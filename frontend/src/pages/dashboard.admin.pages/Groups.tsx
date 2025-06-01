import React, { useState, useEffect } from "react";
import { FaInfoCircle, FaUsers, FaCalendarAlt, FaCogs } from "react-icons/fa";
import Sidebar from "../../components/dashboard.admin.components/Sidebar";
// import MemberRow from "../../components/dashboard.admin.components/MemberRow";
// import MemberCard from "../../components/dashboard.admin.components/MemberCard";
import Header from "../../components/dashboard.admin.components/Header";
import { useNavigate } from "react-router-dom";
import { useAdminState } from "../../store/create.admin.store";

// const getInitials = (name: string): string =>
//   name
//     .split(" ")
//     .map((part) => part[0]?.toUpperCase() ?? "")
//     .join("");

const GroupInfoPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [, setActiveTab] = useState<string>("/group");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  // const [members, setMembers] = useState<Member[]>([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     role: "Organizer",
  //     status: "Active",
  //     initials: "",
  //   },
  //   {
  //     id: 2,
  //     name: "Alice Smith",
  //     role: "Treasurer",
  //     status: "Active",
  //     initials: "",
  //   },
  //   {
  //     id: 3,
  //     name: "Michael Brown",
  //     role: "Member",
  //     status: "Active",
  //     initials: "",
  //   },
  //   {
  //     id: 4,
  //     name: "Linda Carter",
  //     role: "Member",
  //     status: "Inactive",
  //     initials: "",
  //   },
  // ]);

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Initialize initials
  // useEffect(() => {
  //   setMembers((prev) =>
  //     prev.map((m) => ({ ...m, initials: getInitials(m.name) }))
  //   );
  // }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const navigate = useNavigate();

  const { groups, fetchGroups, setGroupId } = useAdminState();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <div className="flex h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200 overflow-hidden">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onTabChange={setActiveTab}
        onToggle={toggleSidebar}
        notifications={[]}
        onClose={toggleSidebar}
      />

      {/* Content panel */}
      <div
        className={`
          flex flex-col flex-1 h-full
          ${isSidebarOpen ? "lg:ml-64" : "ml-0"}
          transition-all duration-300
          overflow-y-auto
        `}
      >
        {/* Sticky Header */}
        <Header darkMode={isDarkMode} setDarkMode={setIsDarkMode} />

        {/* Scrollable Main */}
        <main className="flex-1 pt-20 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto space-y-6">
            {groups.map((group) => (
              <section
                key={group._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div
                    onClick={() => {
                      setGroupId(group._id);
                      navigate(`/admin/group/${group._id}`);
                    }}
                    className="cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-lg transition-all duration-200"
                  >
                    <h1 className="flex items-center text-3xl font-bold text-blue-700 dark:text-gray-100 mb-2 group-hover:text-blue-600">
                      <FaInfoCircle className="mr-2 transition-transform group-hover:scale-110" />{" "}
                      {group.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 group-hover:text-blue-500">
                      {group.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setGroupId(group._id);
                      navigate(`/admin/group/${group._id}`);
                    }}
                    className="mt-4 md:mt-0 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Group Info
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center p-4 bg-white dark:bg-gray-700 rounded">
                    <FaUsers className="text-blue-500 text-2xl mr-3" />
                    <div
                      onClick={() => {
                        setGroupId(group._id);
                        navigate(`/admin/group/${group._id}/members`);
                      }}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 rounded p-2"
                    >
                      <p className="text-xl font-semibold dark:text-gray-100">
                        {group.groupMembers.length}
                      </p>
                      <p className="text-sm text-blue-500 dark:text-blue-400 font-medium">
                        Members
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white dark:bg-gray-700 rounded">
                    <FaCalendarAlt className="text-green-500 text-2xl mr-3" />
                    <div>
                      <p className="text-xl font-semibold dark:text-gray-100">
                        {group.nextMeeting}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Next Meeting
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white dark:bg-gray-700 rounded">
                    <FaCalendarAlt className="text-blue-500 text-2xl mr-3" />
                    <div>
                      <p className="text-xl font-semibold dark:text-gray-100">
                        {new Date(group.createdAt).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Created On
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white dark:bg-gray-700 rounded">
                    <FaCogs className="text-blue-500 text-2xl mr-3" />
                    <div
                      onClick={() => {
                        setGroupId(group._id);
                        navigate(`/admin/group/${group._id}/settings`);
                      }}
                      className="cursor-pointer"
                    >
                      <p className="text-xl font-semibold dark:text-gray-100">
                        Settings
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Manage Settings
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GroupInfoPage;
