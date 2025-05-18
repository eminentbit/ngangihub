import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaUsers,
  FaMoneyBillWave,
  FaChartPie,
  FaHandHoldingUsd,
  FaArrowRight,
  FaUserCircle,
} from "react-icons/fa";

import Sidebar from "../../components/dashboard.admin.components/Sidebar";
import StatCard from "../../components/dashboard.admin.components/StatCard";
import ContributionChart from "../../components/dashboard.admin.components/ContributionChart";
import ActivityChart from "../../components/dashboard.admin.components/ActivityChart";
import {
  latestMembers,
  quickActions,
  recentActivity,
} from "../../utils/data.admin.dashboard";

// Import the new Header component
import Header from "../../components/dashboard.admin.components/Header";

export const AdminDashboardPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("admin");
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-mode", "false");
    }
  }, [darkMode]);

  const setSidebarOpen = (updateFn: (prevState: boolean) => boolean) => {
    setIsOpen((prevState) => updateFn(prevState));
  };
  const navigate = useNavigate();

  return (
    <div
      className={`flex h-screen overflow-hidden bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 transition-colors`}
    >
      {/* Sidebar toggle button (only for mobile) */}
      <button
        type="button"
        onClick={toggleSidebar}
        className="absolute top-4 left-4 text-gray-700 dark:text-gray-200 lg:hidden z-40"
        title="Toggle Sidebar"
      >
        <FaBars size={24} />
      </button>

      <Sidebar
        isOpen={isOpen}
        activeTab={activeTab}
        onToggle={() => setSidebarOpen((o) => !o)}
        onTabChange={setActiveTab}
        onClose={() => setIsOpen(false)}
      />

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 overflow-auto 
          ${isOpen ? "lg:ml-64" : "lg:ml-0"}`}
      >
        {/* Header imported here */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* DASHBOARD BODY */}
        {activeTab === "admin" && (
          <div className="px-2 md:px-6 py-8 max-w-[1100px] mx-auto">
            {/* Greeting & Overview */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-1">
                  Admin Dashboard
                </h1>
              </div>
              <div className="flex space-x-4">
              {quickActions.map((action) => (
  <button
    key={action.id}
    type="button"
    onClick={() => {
      if (action.label === "View Contributions") {
        navigate("/admin/contributions");
      } else if (action.label === "Request Loan") {
        navigate("/admin/loans-request");
      } else {
        action.onClick();
      }
    }}
    className={`${action.color} flex items-center px-4 py-2 text-white rounded-lg shadow hover:scale-105 hover:shadow-lg transition font-semibold`}
  >
    {action.icon}
    <span className="ml-2">{action.label}</span>
  </button>
))}

              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                label="Total Members"
                value="127"
                icon={<FaUsers className="text-blue-500" size={28} />}
                className="bg-gradient-to-tr from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-800 shadow"
              />
              <StatCard
                label="Total Contributions"
                value="2,450,000 FCFA"
                icon={<FaHandHoldingUsd className="text-blue-500" size={28} />}
                className="bg-gradient-to-tr from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-800 shadow"
              />
              <StatCard
                label="Active Loans"
                value="14"
                icon={<FaMoneyBillWave className="text-yellow-500" size={28} />}
                className="bg-gradient-to-tr from-yellow-100 to-yellow-300 dark:from-yellow-900 dark:to-yellow-800 shadow"
              />
              <StatCard
                label="Pending Payouts"
                value="3"
                icon={<FaChartPie className="text-purple-500" size={28} />}
                className="bg-gradient-to-tr from-purple-100 to-purple-300 dark:from-purple-900 dark:to-purple-800 shadow"
              />
            </div>

            {/* Charts & Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
              <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h3 className="text-blue-700 dark:text-blue-300 font-semibold mb-2">
                    Contribution Overview
                  </h3>
                  <ContributionChart />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h3 className="text-blue-700 dark:text-blue-300 font-semibold mb-2">
                    Activity Timeline
                  </h3>
                  <ActivityChart />
                </div>
              </div>
              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col">
                <h3 className="text-blue-700 dark:text-blue-300 font-semibold mb-4">
                  Recent Activity
                </h3>
                <ul className="space-y-4">
                  {recentActivity.map((item) => (
                    <li key={item.id} className="flex items-start gap-3">
                      <div className="mt-1">{item.icon}</div>
                      <div>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">
                          {item.user}{" "}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {item.action}
                        </span>
                        <div className="text-xs text-gray-400">{item.time}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Members List & Quick Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {/* Latest Members */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-blue-700 dark:text-blue-300 font-semibold mb-4">
                  Latest Members
                </h3>
                <ul>
                  {latestMembers.map((member) => (
                    <li
                      key={member.id}
                      className="flex items-center py-2 border-b last:border-b-0 border-gray-100 dark:border-gray-700"
                    >
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                      ) : (
                        <FaUserCircle className="text-gray-400 dark:text-gray-600 w-8 h-8 mr-3" />
                      )}
                      <div>
                        <div className="text-gray-900 dark:text-gray-100 font-semibold">
                          {member.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {member.joined}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Next Payout */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-blue-700 dark:text-blue-300 font-semibold mb-2">
                    Next Njangi Payout
                  </h3>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-300 mb-1">
                    250,000 FCFA
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    To:{" "}
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      Ngoh Emmanuel
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                    <FaArrowRight className="mr-2" />
                    Expected: 15th May, 2025
                  </div>
                </div>
              </div>
              {/* Group Health */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-between">
                <h3 className="text-blue-700 dark:text-blue-300 font-semibold mb-2">
                  Group Health
                </h3>
                <div className="flex items-center gap-4 mb-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                  <span className="text-lg font-bold text-blue-700 dark:text-blue-300">
                    Healthy
                  </span>
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  All contributions up-to-date. <br /> No overdue loans.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};