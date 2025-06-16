import { useState } from "react";
import {
  Calendar,
  CreditCard,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Group, useFetchGroups } from "../../hooks/useAdmin";
import { useAuthStore } from "../../store/create.auth.store";
import Spinner from "../../components/dashboard.admin.components/ui/spinner";
import Sidebar from "../../components/dashboard.admin.components/Sidebar";

const mockPaymentHistory = [
  {
    id: 1,
    groupName: "Family Savings Circle",
    amount: 50000,
    date: "2025-05-25",
    type: "contribution",
    status: "completed",
  },
  {
    id: 2,
    groupName: "Business Partners Tontine",
    amount: 800000,
    date: "2025-05-15",
    type: "payout",
    status: "completed",
  },
  {
    id: 3,
    groupName: "University Alumni Fund",
    amount: 25000,
    date: "2025-05-15",
    type: "contribution",
    status: "completed",
  },
  {
    id: 4,
    groupName: "Family Savings Circle",
    amount: 50000,
    date: "2025-04-25",
    type: "contribution",
    status: "completed",
  },
];

export default function PaymentsPage() {
  const { groups, isLoading } = useFetchGroups();
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mobile_money");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "due":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "upcoming":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "due":
        return <AlertCircle className="w-4 h-4" />;
      case "upcoming":
        return <Clock className="w-4 h-4" />;
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleInitiatePayment = (group: Group) => {
    setSelectedGroup(group);
    setShowPaymentModal(true);
  };

  const { user } = useAuthStore();

  const handlePaymentSubmit = () => {
    // Here you would integrate with actual payment processing
    alert(
      `Payment of ${formatCurrency(
        selectedGroup?.contributionAmount || 0
      )} initiated for ${selectedGroup?.name}`
    );
    setShowPaymentModal(false);
    setSelectedGroup(null);
  };

  const maxNextDue = new Date(
    Math.max(...groups.map((g) => new Date(g.nextDue).getTime()))
  );

  // const netPosition = Math.floor(
  //   groups.reduce((sum, g) => sum + g.position!, 0) / groups.length
  // );

  const totalContributed = groups.reduce(
    (sum, g) => sum + g.totalContributed!,
    0
  );

  const totalReceived = groups.reduce((sum, g) => sum + g.totalReceived!, 0);

  return (
    <div className="flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onToggle={() => setIsSidebarOpen((p) => !p)}
      />
      <div
        className={`min-h-screen bg-gray-50 dark:bg-gray-900 p-6 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Njangi Payments
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Welcome back, {user?.lastName} {user?.firstName}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Next Payment Due
                  </p>
                  <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {maxNextDue.toDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Active Groups
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {groups.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Contributed
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(totalContributed)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Received
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(totalReceived)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Net Position
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(totalContributed - totalReceived)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* My Groups Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                My Njangi Groups
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Manage your group contributions and payments
              </p>
            </div>
            <div className="p-6">
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="grid gap-4">
                  {groups.map((group) => (
                    <div
                      key={group._id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {group.name}
                            </h3>
                            <span
                              className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                group.status!
                              )}`}
                            >
                              {getStatusIcon(group.status!)}
                              <span className="capitalize">{group.status}</span>
                            </span>
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              <span className="font-medium">Members:</span>{" "}
                              {group.groupMembers.length} |
                              <span className="font-medium">
                                {" "}
                                Contribution:
                              </span>{" "}
                              {formatCurrency(group.contributionAmount!)} |
                              <span className="font-medium"> Cycle:</span>{" "}
                              {group.contributionFrequency}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              <span className="font-medium">
                                Your Position:
                              </span>{" "}
                              {group.position} of {group.totalRounds} |
                              <span className="font-medium">
                                {" "}
                                Next Payment:
                              </span>{" "}
                              {new Date(group.nextDue).toDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6">
                          {group && (
                            <button
                              type="button"
                              onClick={() => handleInitiatePayment(group)}
                              className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                              <CreditCard className="w-4 h-4" />
                              <span>Pay Now</span>
                            </button>
                          )}
                          {group && (
                            <button
                              type="button"
                              onClick={() => handleInitiatePayment(group)}
                              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                              <CreditCard className="w-4 h-4" />
                              <span>Pay Early</span>
                            </button>
                          )}
                          {group.status === "paid" && (
                            <button
                              type="button"
                              disabled
                              className="w-full md:w-auto bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Paid</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Payment History Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Payment History
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Track all your contributions and payouts
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {mockPaymentHistory.map((payment) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {payment.groupName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            payment.type === "payout"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}
                        >
                          {payment.type === "payout"
                            ? "Payout"
                            : "Contribution"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <span
                          className={
                            payment.type === "payout"
                              ? "text-green-600 font-semibold"
                              : ""
                          }
                        >
                          {payment.type === "payout" ? "+" : ""}
                          {formatCurrency(payment.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Payment Modal */}
        {showPaymentModal && selectedGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Initiate Payment
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Group
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      {selectedGroup.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Amount
                    </label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      {formatCurrency(selectedGroup.contributionAmount!)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Payment Method
                    </label>
                    <select
                      title="paymentMethod"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="mobile_money">Mobile Money</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="card">Debit/Credit Card</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePaymentSubmit}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
