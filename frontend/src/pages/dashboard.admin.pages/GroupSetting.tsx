import React, { useState, useEffect } from "react";
import { FaLock, FaGlobe, FaSave, FaUserPlus } from "react-icons/fa";
import Sidebar from "../../components/dashboard.admin.components/Sidebar";
import Header from "../../components/dashboard.admin.components/Header";
import { capitalizeFirstLetter } from "../../utils/capitalize";
import { useFetchInvitedMembers, useInviteMember } from "../../hooks/useAdmin";

const GroupSettingsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [, setActiveTab] = useState<string>("group-settings");
  const [privacy, setPrivacy] = useState<"public" | "private">("private");
  const [contribution, setContribution] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<string>("monthly");
  const [newMemberEmail, setNewMemberEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const inviteMember = useInviteMember();
  const { invitedMembers, isLoading, error } = useFetchInvitedMembers();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: persist contribution, paymentType, privacy, new member logic
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleAddMember = () => {
    console.log(newMemberEmail);
    inviteMember.mutate(newMemberEmail);
  };

  return (
    <div className="flex h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
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
          flex flex-col flex-1 h-full
          ${isSidebarOpen ? "lg:ml-64" : "ml-0"}
          transition-all duration-300
          overflow-y-auto
          px-6 md:px-12 py-6
        `}
      >
        {/* Sticky Header */}
        <Header darkMode={isDarkMode} setDarkMode={setIsDarkMode} />

        {/* Main */}
        <main className="flex-1 mt-20">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Page Header */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FaUserPlus className="text-indigo-600 text-3xl" />
                <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-gray-100">
                  Group Settings
                </h1>
              </div>
              <span className="px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 text-sm font-medium">
                {new Date().toLocaleDateString()}
              </span>
            </section>

            {/* Settings Form */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
              {success && (
                <div className="px-4 py-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg flex items-center animate-pulse">
                  <FaSave className="mr-2" /> Settings saved successfully!
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contribution Amount */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Contribution Amount (CFA)
                    </label>
                    <input
                      type="number"
                      value={contribution}
                      onChange={(e) =>
                        setContribution(parseInt(e.target.value, 10) || 0)
                      }
                      placeholder="Enter amount in CFA"
                      required
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                  </div>

                  {/* Payment Type */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Payment Type
                    </label>
                    <select
                      title="paymentType"
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    >
                      <option value="rotation">Rotation</option>
                      <option value="one-time">Lottery</option>
                    </select>
                  </div>
                </div>

                {/* Add New Member */}
                <div className="space-y-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Add New Member
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="email"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      placeholder="Enter member email"
                      className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                    <button
                      type="button"
                      onClick={handleAddMember}
                      disabled={!newMemberEmail}
                      className="flex items-center justify-center px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow-md transition transform hover:-translate-y-0.5"
                    >
                      <FaUserPlus className="mr-2" /> Invite
                    </button>
                  </div>

                  <div className="mt-6">
                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Group Members
                    </label>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      {isLoading ? (
                        <div className="space-y-2 animate-pulse">
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                        </div>
                      ) : error ? (
                        <p className="text-red-500">Failed to load members.</p>
                      ) : invitedMembers.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400">
                          No members yet.
                        </p>
                      ) : (
                        <ul className="divide-y divide-gray-200 dark:divide-gray-600">
                          {invitedMembers.map((member) => (
                            <li
                              key={member.email}
                              className="py-3 flex justify-between items-center"
                            >
                              <span className="font-medium text-gray-800 dark:text-gray-100">
                                {member.email}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                                  member.status.toLowerCase() !== "accepted"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                }`}
                              >
                                {capitalizeFirstLetter(member.status)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Privacy */}
                <fieldset className="space-y-4">
                  <legend className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Privacy
                  </legend>
                  <div className="flex items-center space-x-6">
                    {(["public", "private"] as const).map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={option}
                          checked={privacy === option}
                          onChange={() => setPrivacy(option)}
                          className="form-radio h-5 w-5 text-indigo-600"
                        />
                        {option === "public" ? <FaGlobe /> : <FaLock />}
                        <span className="capitalize text-gray-800 dark:text-gray-200 font-medium">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Save */}
                <div className="text-right">
                  <button
                    type="submit"
                    className="inline-flex items-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
                  >
                    <FaSave className="mr-2" /> Save Changes
                  </button>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GroupSettingsPage;
