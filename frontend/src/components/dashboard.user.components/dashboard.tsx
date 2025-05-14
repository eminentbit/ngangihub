"use client"

import { useState } from "react"
import { MoreHorizontal, MessageSquare, Info, DollarSign, Users, CreditCard } from "lucide-react"
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
} from "chart.js"
import { Doughnut, Line } from "react-chartjs-2"
import { useRouter } from "next/navigation"
import ChatInterface from "./chat-interface"

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// Exchange rate: 1 USD = approximately 600 CFA
const CFA_EXCHANGE_RATE = 600

const Dashboard = () => {
  const router = useRouter()
  const [groups, setGroups] = useState([
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
  ])

  const [showGroupMenu, setShowGroupMenu] = useState(null)
  const [showChat, setShowChat] = useState(null)

  // Convert dollar values to CFA
  const contributionData = {
    labels: ["Team Alpha", "Project Beta", "Finance Club"],
    datasets: [
      {
        data: [1200 * CFA_EXCHANGE_RATE, 800 * CFA_EXCHANGE_RATE, 600 * CFA_EXCHANGE_RATE],
        backgroundColor: ["rgba(79, 70, 229, 0.8)", "rgba(52, 211, 153, 0.8)", "rgba(251, 191, 36, 0.8)"],
        borderColor: ["rgba(79, 70, 229, 1)", "rgba(52, 211, 153, 1)", "rgba(251, 191, 36, 1)"],
        borderWidth: 1,
      },
    ],
  }

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
  }

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
  }

  const handleGroupChat = (groupId) => {
    const group = groups.find((g) => g.id === groupId)
    if (group) {
      setShowChat(group)
    }
  }

  const handleGroupDetails = (groupId) => {
    // In a real app, this would navigate to group details
    console.log("Viewing details for group:", groupId)
    router.push(`/my-groups?group=${groupId}`)
  }

  const handleViewAllGroups = () => {
    router.push("/my-groups")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back, John! Here's what's happening with your groups.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Your Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="stat-card bg-indigo-50 dark:bg-indigo-900/30">
                <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-800">
                  <DollarSign className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Contributed</p>
                  <p className="text-xl font-bold">{(2600 * CFA_EXCHANGE_RATE).toLocaleString()} CFA</p>
                </div>
              </div>

              <div className="stat-card bg-green-50 dark:bg-green-900/30">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-800">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active Groups</p>
                  <p className="text-xl font-bold">3</p>
                </div>
              </div>

              <div className="stat-card bg-purple-50 dark:bg-purple-900/30">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-800">
                  <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Payments Made</p>
                  <p className="text-xl font-bold">12</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-md font-medium mb-3">Contribution Breakdown</h3>
                <div className="h-48">
                  <Doughnut
                    data={contributionData}
                    options={{
                      plugins: {
                        legend: {
                          position: "bottom",
                          labels: {
                            color: document.documentElement.classList.contains("dark") ? "white" : "black",
                            generateLabels: (chart) => {
                              const datasets = chart.data.datasets
                              return chart.data.labels.map((label, i) => {
                                const meta = chart.getDatasetMeta(0)
                                const style = meta.controller.getStyle(i)

                                return {
                                  text: `${label}: ${(datasets[0].data[i]).toLocaleString()} CFA`,
                                  fillStyle: style.backgroundColor,
                                  strokeStyle: style.borderColor,
                                  lineWidth: style.borderWidth,
                                  hidden: false,
                                  index: i,
                                }
                              })
                            },
                          },
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              let label = context.label || ""
                              if (label) {
                                label += ": "
                              }
                              label += context.raw.toLocaleString() + " CFA"
                              return label
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium mb-3">Activity Timeline</h3>
                <div className="h-48">
                  <Line
                    data={activityData}
                    options={{
                      ...activityOptions,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            color: document.documentElement.classList.contains("dark") ? "white" : "black",
                          },
                          grid: {
                            color: document.documentElement.classList.contains("dark")
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.1)",
                          },
                        },
                        x: {
                          ticks: {
                            color: document.documentElement.classList.contains("dark") ? "white" : "black",
                          },
                          grid: {
                            color: document.documentElement.classList.contains("dark")
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.1)",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Groups</h2>
              <div className="relative">
                <button onClick={() => setShowGroupMenu(showGroupMenu ? null : "main")}>
                  <MoreHorizontal className="h-5 w-5 text-gray-400" />
                </button>

                {showGroupMenu === "main" && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setShowGroupMenu(null)
                        router.push("/my-groups")
                      }}
                    >
                      View All Groups
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setShowGroupMenu(null)
                        router.push("/my-groups?create=true")
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
                <div key={group.id} className="border dark:border-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{group.name}</h3>
                          {group.isAdmin && (
                            <span className="text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 px-2 py-0.5 rounded">
                              Admin
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{group.members} members</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Payment Status</span>
                      <span>
                        {group.paid}/{group.members} paid
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-value" style={{ width: `${(group.paid / group.members) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-3">
                    <button
                      className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                      onClick={() => handleGroupChat(group.id)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Chat</span>
                    </button>
                    <button
                      className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                      onClick={() => handleGroupDetails(group.id)}
                    >
                      <Info className="h-4 w-4" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="w-full mt-4 py-2 text-center text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-800/30 rounded-lg transition-colors"
              onClick={handleViewAllGroups}
            >
              View All Groups
            </button>
          </div>
        </div>
      </div>

      {/* Chat Interface Modal */}
      {showChat && <ChatInterface groupId={showChat.id} groupName={showChat.name} onClose={() => setShowChat(null)} />}
    </div>
  )
}

export default Dashboard
