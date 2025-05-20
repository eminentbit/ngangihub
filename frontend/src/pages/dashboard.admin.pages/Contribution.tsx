import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ContributionPage: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [stats, setStats] = useState({
    totalRaised: 0,
    goal: 1000000,
    contributionsCount: 0,
    deadline: "December 31, 2025",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch real groups and stats from API
    setGroups(["Group Alpha", "Group Beta", "Group Gamma"]);
    setStats({
      totalRaised: 450000,
      goal: 1000000,
      contributionsCount: 120,
      deadline: "December 31, 2025",
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroup) {
      setMessage("Please select a group to contribute to.");
      return;
    }
    setLoading(true);
    setMessage("");

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setMessage(`Thank you for your contribution to ${selectedGroup}!`);
      setAmount("");
      setSelectedGroup("");
      // Update stats
      setStats((prev) => ({
        ...prev,
        totalRaised: prev.totalRaised + Number(amount),
        contributionsCount: prev.contributionsCount + 1,
      }));
    }, 1500);
  };

  const progressPercent = Math.min(
    100,
    Math.round((stats.totalRaised / stats.goal) * 100)
  );

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      {/* Back button at top-left */}
      <button
        type="button"
        onClick={() => navigate("/admin/dashboard")}
        className="absolute left-8 top-8 flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md px-3 py-2 transition-colors duration-300"
      >
        <FaArrowLeft className="mr-2" />
        Back to Dashboard
      </button>

      <div className="mx-auto mt-16 w-full max-w-2xl p-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        {/* Campaign Details */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Total Raised
            </p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              FCFA{stats.totalRaised.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-300">Goal</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              FCFA{stats.goal.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Contributions
            </p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {stats.contributionsCount}
            </p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-300">Deadline</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {stats.deadline}
            </p>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-8">
          <div
            className="h-4 rounded-full bg-blue-600"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-blue-700 dark:text-blue-400">
          Make a Contribution
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-300">
          Support your group by contributing funds. Every contribution makes a
          difference.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group Selection */}
          <div>
            <label
              htmlFor="group"
              className="block text-gray-700 dark:text-gray-200 font-medium mb-2"
            >
              Select Group
            </label>
            <select
              id="group"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                -- Choose a group --
              </option>
              {groups.map((grp) => (
                <option key={grp} value={grp}>
                  {grp}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-gray-700 dark:text-gray-200 font-medium mb-2"
            >
              Amount (FCFA)
            </label>
            <input
              id="amount"
              type="number"
              min={500}
              step={500}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount (minimum FCFA500)"
              required
              className="w-full px-5 py-3 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !amount || !selectedGroup}
            className="w-full py-3 px-6 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-semibold text-lg transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Contribute"}
          </button>

          {message && (
            <div className="text-green-600 dark:text-green-400 font-medium pt-2 text-center">
              {message}
            </div>
          )}
        </form>

        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
          Your contribution is secure and will reflect in your group account.
        </p>
      </div>
    </div>
  );
};

export default ContributionPage;
