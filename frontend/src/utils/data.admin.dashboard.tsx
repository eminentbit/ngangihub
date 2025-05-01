// Sample recent activity

import {
  FaMoneyBillWave,
  FaUserPlus,
  FaHandHoldingUsd,
  FaHandshake,
  FaChartPie,
} from "react-icons/fa";

export const recentActivity = [
  {
    id: 1,
    icon: <FaHandHoldingUsd className="text-green-500" />,
    user: "Alice",
    action: "contributed 20,000 FCFA",
    time: "10 min ago",
  },
  {
    id: 2,
    icon: <FaHandshake className="text-blue-500" />,
    user: "Group",
    action: "completed a cycle payout",
    time: "1h ago",
  },
  {
    id: 3,
    icon: <FaUserPlus className="text-purple-500" />,
    user: "Samuel",
    action: "joined Njangi",
    time: "3h ago",
  },
  {
    id: 4,
    icon: <FaMoneyBillWave className="text-yellow-500" />,
    user: "Linda",
    action: "requested a loan",
    time: "8h ago",
  },
];

// Quick actions
export const quickActions = [
  {
    id: 1,
    label: "View Contributions",
    icon: <FaChartPie size={18} />,
    color: "bg-gradient-to-tr from-blue-400 to-blue-600",
    onClick: () => alert("View contributions"),
  },
  {
    id: 2,
    label: "Request Loan",
    icon: <FaMoneyBillWave size={18} />,
    color: "bg-gradient-to-tr from-yellow-400 to-yellow-600",
    onClick: () => alert("Request loan"),
  },
];

// Latest members
export const latestMembers = [
  { id: 1, name: "Samuel Ekema", joined: "Today", avatar: null },
  { id: 2, name: "Linda N.", joined: "Yesterday", avatar: null },
  { id: 3, name: "Chantal F.", joined: "2 days ago", avatar: null },
  { id: 4, name: "Elias B.", joined: "2 days ago", avatar: null },
];


  // Sample notifications
export const notifications = [
    { id: 1, message: 'Alice contributed 20,000 FCFA', time: '2h ago', isRead: false },
    { id: 2, message: "New member: Samuel joined Njangi", time: "5h ago", isRead: false },
    { id: 3, message: 'Monthly cycle payout completed', time: "1d ago", isRead: true },
    { id: 4, message: 'Loan request: Linda N.', time: "2d ago", isRead: false }
  ];
