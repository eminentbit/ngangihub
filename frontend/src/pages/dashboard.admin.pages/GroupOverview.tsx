import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaRegClock,
} from "react-icons/fa";
import Sidebar from "../../components/dashboard.admin.components/Sidebar";
import Header from "../../components/dashboard.admin.components/Header";
import { useParams } from "react-router-dom";
import { useAdminState } from "../../store/create.admin.store";

// const groupInfo = {
//   name: "Njangi Legends",
//   description:
//     "A professional Njangi circle for business networking and mutual support.",
//   createdAt: "2022-03-15",
//   totalFunds: 420000,
//   nextMeeting: "2025-05-20T18:00:00Z",
//   membersCount: 16,
//   rules: [
//     "Monthly contributions are due every 15th.",
//     "Late payment penalty is 5%.",
//     "Meetings are held every 3rd Saturday.",
//     "Absence without notice incurs a fine.",
//   ],
// };

// const recentActivities = [
//   {
//     id: 1,
//     type: "Contribution",
//     user: "John Doe",
//     date: "2025-04-15T10:30:00Z",
//     amount: 25000,
//     note: "Monthly contribution received.",
//   },
//   {
//     id: 2,
//     type: "Meeting",
//     user: "Group",
//     date: "2025-04-20T18:00:00Z",
//     amount: null,
//     note: "Monthly meeting held at City Center.",
//   },
//   {
//     id: 3,
//     type: "Withdrawal",
//     user: "Alice Smith",
//     date: "2025-03-29T13:45:00Z",
//     amount: 40000,
//     note: "Emergency funds disbursed.",
//   },
//   {
//     id: 4,
//     type: "New Member",
//     user: "Samuel B.",
//     date: "2025-03-10T09:00:00Z",
//     amount: null,
//     note: "Joined the group.",
//   },
// ];

function formatDate(dateStr: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

const GroupOverviewPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [, setActiveTab] = useState<string>("/overview");
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const { groupId } = useParams();

  const { groupInfo, fetchGroupInfo } = useAdminState();

  useEffect(() => {
    fetchGroupInfo(groupId!);
  }, [fetchGroupInfo, groupId]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div
      className={`flex h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200`}
    >
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-30 lg:hidden"
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
         flex-1 h-full
          transition-all duration-300
          ${isSidebarOpen ? "lg:ml-44" : "ml-0"}
          overflow-y-auto
          md:px-16 px-10 py-0
        `}
      >
        {/* Sticky Header */}
        <Header darkMode={isDarkMode} setDarkMode={setDarkMode} />

        {/* Scrollable main area */}
        <main className="flex-1 pt-15 bg-white sm:px-4 md:px-16 transition-all duration-200">
          <div className="mx-auto max-w-5xl">
            <header className="mb-8 sm:mb-8">
              <h1 className="text-3xl font-bold text-blue-700 mb-2">
                Group Overview
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Summary and recent activities for your Njangi circle
              </p>
            </header>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <FaUsers className="text-blue-500 text-2xl" />
                  <h2 className="text-xl font-bold text-blue-800 dark:text-gray-100">
                    {groupInfo?.name}
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {groupInfo?.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> Created:{" "}
                    {groupInfo?.createdAt
                      ? new Date(groupInfo.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUsers /> Members: {groupInfo?.groupMembers.length}
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <FaMoneyBillWave className="text-green-500 text-2xl" />
                  <div>
                    <div className="text-lg font-semibold text-green-700 dark:text-green-300">
                      CFA {groupInfo?.totalFunds}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Total Funds
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaRegClock className="text-indigo-500 text-2xl" />
                  <div>
                    <div className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                      {groupInfo?.nextMeeting
                        ? formatDate(groupInfo.nextMeeting)
                        : "N/A"}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Next Meeting
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rules */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-blue-700 dark:text-gray-100 mb-2">
                Group Rules
              </h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                {groupInfo?.rules}
              </ul>
            </section>

            {/* Recent Activities */}
            <section>
              <h3 className="text-lg font-bold text-blue-700 dark:text-gray-100 mb-4">
                Recent Activities
              </h3>

              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      {["Date", "Type", "Member", "Amount", "Note"].map(
                        (col) => (
                          <th
                            key={col}
                            className="px-6 py-3 text-left text-sm font-medium text-blue-500 dark:text-gray-400 uppercase"
                          >
                            {col}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {/* {recentActivities.map((act) => (
                      <tr
                        key={act.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                      >
                        <td className="px-6 py-4 text-sm">
                          {formatDate(act.date)}
                        </td>
                        <td className="px-6 py-4 text-sm">{act.type}</td>
                        <td className="px-6 py-4 text-sm">{act.user}</td>
                        <td className="px-6 py-4 text-sm">
                          {act.amount != null ? (
                            <span
                              className={`font-semibold ${
                                act.type === "Withdrawal"
                                  ? "text-red-600 dark:text-red-400"
                                  : "text-green-700 dark:text-green-300"
                              }`}
                            >
                              ₦{act.amount.toLocaleString()}
                            </span>
                          ) : (
                            "--"
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">{act.note}</td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden space-y-4">
                {/* {recentActivities.map((act) => (
                  <div
                    key={act.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-blue-600 dark:text-blue-300">
                        {act.type}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(act.date)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-200">
                      By: {act.user}
                    </div>
                    {act.amount != null && (
                      <div
                        className={`mt-1 font-semibold ${
                          act.type === "Withdrawal"
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-700 dark:text-green-300"
                        }`}
                      >
                        ₦{act.amount.toLocaleString()}
                      </div>
                    )}
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {act.note}
                    </div>
                  </div>
                ))} */}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GroupOverviewPage;
