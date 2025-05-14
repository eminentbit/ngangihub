import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHandHoldingUsd, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import StatCard from "../../components/dashboard.admin.components/StatCard";
import ContributionChart from "../../components/dashboard.admin.components/ContributionChart";

const ContributionPage: React.FC = () => {
  const navigate = useNavigate();

  // Replace this with actual data from your API or props
  const stats = [
    {
      id: 1,
      label: "Total Contributions",
      value: "3,750,000 FCFA",
      icon: <FaHandHoldingUsd size={24} className="text-green-500" />,
      className: "bg-gradient-to-r from-green-100 to-green-300 dark:from-green-900 dark:to-green-800",
    },
    {
      id: 2,
      label: "Monthly Contributions",
      value: "275,000 FCFA",
      icon: <FaCalendarAlt size={24} className="text-blue-500" />,
      className: "bg-gradient-to-r from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-800",
    },
    {
      id: 3,
      label: "Growth Trend",
      value: "See Chart",
      icon: <FaChartLine size={24} className="text-purple-500" />,
      className: "bg-gradient-to-r from-purple-100 to-purple-300 dark:from-purple-900 dark:to-purple-800",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-700 dark:text-gray-200 font-medium hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-gray-700 dark:text-gray-200 font-medium hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>
      </div>

      {/* Page Title */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
          Contribution Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gain insights into contributions and track your community's financial growth.
        </p>
      </header>

      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            className={`${stat.className} shadow-md`}
          />
        ))}
      </div>

      {/* Contribution Trends Chart */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <header className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Contribution Trends
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Visualize contributions over time to understand performance trends.
          </p>
        </header>
        <ContributionChart />
      </section>
    </div>
  );
};

export default ContributionPage;