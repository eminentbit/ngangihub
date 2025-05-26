"use client";

import { SetStateAction, useState, useEffect } from "react";
import {
  MoreHorizontal,
  MessageSquare,
  Info,
  DollarSign,
  Users,
  CreditCard,
} from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import ChatInterface from "../../components/dashboard.user.components/chat-interface";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard.admin.components/Sidebar";
import Header from "../../components/dashboard.admin.components/Header";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Exchange rate: 1 USD = approximately 600 CFA
const CFA_EXCHANGE_RATE = 600;

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [, setActiveTab] = useState<string>("Dashboard");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const handleTabChange = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-mode", "false");
    }
  }, [darkMode]);
  const [groups] = useState([
    {
      id: 1,
      name: "Team Alpha",
      members: 8,
      paid: 6,
      isAdmin: true,
    },
    {
      id: 2,
      name: "Project Beta",
      members: 5,
      paid: 3,
      isAdmin: false,
    },
    {
      id: 3,
      name: "Finance Club",
      members: 12,
      paid: 10,
      isAdmin: false,
    },
  ]);

  interface DoughnutLabelConfig {
    text: string;
    fillStyle: string | CanvasGradient | CanvasPattern;
    strokeStyle: string | CanvasGradient | CanvasPattern;
    lineWidth: number;
    hidden: boolean;
    index: number;
  }

  interface ChartDataset {
    data: number[];
    label?: string;
  }

  interface TooltipContext {
    dataset: ChartDataset;
    parsed: number;
  }

  const doughnutOptions = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: document.documentElement.classList.contains("dark")
            ? "white"
            : "black",
          generateLabels: function (chart: ChartJS): DoughnutLabelConfig[] {
            const datasets = chart.data.datasets;
            return (
              chart.data.labels?.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i, false);
                return {
                  text: `${label}: ${(
                    datasets[0].data[i] ?? 0
                  ).toLocaleString()} CFA`,
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  hidden: false,
                  index: i,
                };
              }) ?? []
            );
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipContext): string {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== undefined) {
              label += context.parsed.toLocaleString() + " CFA";
            }
            return label;
          },
        },
      },
    },
  };

  const [showGroupMenu, setShowGroupMenu] = useState<"main" | null>(null);
  const [showChat, setShowChat] = useState<{
    id: string;
    name: string;
    members: number;
    paid: number;
    isAdmin: boolean;
  } | null>(null);

  // Convert dollar values to CFA
  const contributionData = {
    labels: ["Team Alpha", "Project Beta", "Finance Club"],
    datasets: [
      {
        data: [
          1200 * CFA_EXCHANGE_RATE,
          800 * CFA_EXCHANGE_RATE,
          600 * CFA_EXCHANGE_RATE,
        ],
        backgroundColor: [
          "rgba(79, 70, 229, 0.8)",
          "rgba(52, 211, 153, 0.8)",
          "rgba(251, 191, 36, 0.8)",
        ],
        borderColor: [
          "rgba(79, 70, 229, 1)",
          "rgba(52, 211, 153, 1)",
          "rgba(251, 191, 36, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Line chart data
  const activityData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Activity",
        data: [5, 10, 15, 8, 20, 15],
        borderColor: "rgba(79, 70, 229, 1)",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const activityOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleGroupChat = (groupId: number) => {
    const group = groups.find((g) => g.id === groupId);
    if (group) {
      setShowChat({ ...group, id: String(group.id) });
    }
  };

  const handleGroupDetails = (groupId: number) => {
    // In a real app, this would navigate to group details
    console.log("Viewing details for group:", groupId);
    navigate(`/my-groups?group=${groupId}`);
  };

  const handleViewAllGroups = () => {
    navigate("/user/groups");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        isOpen={isOpen}
        onToggle={() => setIsOpen((o) => !o)}
        onTabChange={handleTabChange} // replace with your real handler
        onClose={() => setIsOpen(false)}
      />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main
        className={`flex-1 p-6 pl-10 space-y-6 ${
          isOpen ? "lg:ml-64" : "lg:ml-16"
        } transition-all duration-300 `}
      >
        <header>
          <h1 className="text-3xl font-bold text-blue-700  dark:text-gray-100">
            Dashboard
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Welcome back, John! Here's what's happening with your groups.
          </p>
        </header>

        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${
            isOpen ? "flex flex-col" : ""
          }`}
        >
          {/* Left: Statistics & Charts */}
          <section className="lg:col-span-2 space-y-6 flex-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Your Statistics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Total Contributed",
                    value: `${(2600 * CFA_EXCHANGE_RATE).toLocaleString()} CFA`,
                    icon: DollarSign,
                    color: "indigo",
                  },
                  {
                    title: "Active Groups",
                    value: "3",
                    icon: Users,
                    color: "green",
                  },
                  {
                    title: "Payments Made",
                    value: "12",
                    icon: CreditCard,
                    color: "purple",
                  },
                ].map(({ title, value, icon: Icon, color }) => (
                  <div
                    key={title}
                    className={`flex items-center gap-4 p-4 rounded-xl bg-${color}-50 dark:bg-${color}-900/30`}
                  >
                    <div
                      className={`p-2 rounded-full bg-${color}-100 dark:bg-${color}-800`}
                    >
                      <Icon
                        className={`h-5 w-5 text-${color}-600 dark:text-${color}-400`}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {title}
                      </p>
                      <p className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
                    Contribution Breakdown
                  </h3>
                  <div className="h-48">
                    <Doughnut
                      data={contributionData}
                      options={doughnutOptions}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
                    Activity Timeline
                  </h3>
                  <div className="h-48">
                    <Line data={activityData} options={activityOptions} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right: Your Groups */}
          <section className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Your Groups
                </h2>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setShowGroupMenu(showGroupMenu ? null : "main")
                    }
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <MoreHorizontal className="h-5 w-5 text-gray-400" />
                  </button>
                  {showGroupMenu === "main" && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                          setShowGroupMenu(null);
                          navigate("/user/groups");
                        }}
                      >
                        View All Groups
                      </button>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                          setShowGroupMenu(null);
                          navigate("/user/groups");
                        }}
                      >
                        Create New Group
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-gray-900 dark:text-gray-100 font-medium">
                              {group.name}
                            </h3>
                            {group.isAdmin && (
                              <span className="text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 px-2 py-0.5 rounded">
                                Admin
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {group.members} members
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                        <span>Payment Status</span>
                        <span>
                          {group.paid}/{group.members} paid
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-indigo-500"
                          style={{
                            width: `${(group.paid / group.members) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <button
                        type="button"
                        className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                        onClick={() => handleGroupChat(group.id)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        Chat
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                        onClick={() => handleGroupDetails(group.id)}
                      >
                        <Info className="h-4 w-4" />
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-6 w-full py-2 text-center text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition"
                onClick={handleViewAllGroups}
              >
                View All Groups
              </button>
            </div>
          </section>
        </div>

        {/* Chat Interface Modal */}
        {showChat && (
          <ChatInterface
            groupId={showChat.id}
            groupName={showChat.name}
            onClose={() => setShowChat(null)}
          />
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
