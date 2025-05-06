import React, { useState, useEffect } from "react";
import Sidebar from "../../components/dashboard.admin.components/Sidebar";
import MemberTable from "../../components/dashboard.admin.components/MemberTable";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";

const AddMemberPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeTab, setActiveTab] = useState("/members");
  const [isDarkMode, setDarkMode] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);

  // Dark-mode class toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
  }, [isSidebarOpen]);

  // Track desktop vs mobile width on client only
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const toggleDarkMode = () => setDarkMode((v) => !v);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email is invalid";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.role.trim()) errs.role = "Role is required";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      setSuccess(null);
      return;
    }
    // TODO: API call here
    setSuccess("Member added successfully!");
    setForm({ name: "", email: "", phone: "", role: "" });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0 w-64`}
        style={{ maxWidth: "16rem" }}
      >
        <Sidebar
          isOpen={isSidebarOpen || isDesktop}
          activeTab={activeTab}
          onToggle={toggleSidebar}
          onTabChange={setActiveTab}
          onClose={toggleSidebar}
        />
      </div>
      {(isSidebarOpen && !isDesktop) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        />
      )}

      {/* Global Header */}
      <div className="fixed top-0 left-0 right-0 z-15 flex items-center justify-between p-3 bg-white dark:bg-gray-900 shadow">
        <button
          type="button"
          onClick={toggleSidebar}
          className="text-gray-700 dark:text-gray-200"
          aria-label="Toggle sidebar"
        >
          <FaBars size={20} />
        </button>
        <button
          type="button"
          onClick={toggleDarkMode}
          className="text-gray-700 dark:text-gray-200"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      {/* MAIN – note pt-20 to clear fixed header */}
      <main className="flex-1 pt-20 p-2 sm:p-4 md:p-8 transition-all duration-200">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl text-blue-700 font-bold mb-1 ">
                <span className="mr-3 inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800/50 h-10 w-10 sm:h-12 sm:w-12">
                  {/* User icon */}
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 9a3 3 0 11-6 0 3 3 0 016 0zM13.5 21h-3a6.5 6.5 0 01-6.5-6.5v-1A6.5 6.5 0 0110.5 7h3a6.5 6.5 0 016.5 6.5v1A6.5 6.5 0 0113.5 21z"
                    />
                  </svg>
                </span>
                Add New Member
              </h1>
              <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-2xl text-sm sm:text-base">
                Register a new member to your Njangi circle. Complete the form to add them
                to your community roster.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 text-xs font-semibold self-start md:self-center">
              {new Date().toLocaleDateString()}
            </span>
          </div>

          {/* Form Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-10 max-w-lg mx-auto w-full">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter member's full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. user@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                  Phone
                </label>
                <PhoneInput
                  country={"cm"}
                  value={form.phone}
                  onChange={(phone) => {
                    setForm({ ...form, phone });
                    setErrors({ ...errors, phone: "" });
                    setSuccess(null);
                  }}
                  containerClass="w-full"
                  inputClass={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white ${
                    errors.phone
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                  dropdownClass="dark:bg-gray-800 dark:text-gray-200"
                  buttonClass="dark:bg-gray-900"
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  aria-label="Role"
                  className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white ${
                    errors.role
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="">Select role</option>
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                  <option value="Treasurer">Treasurer</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-6 gap-3">
                <button
                  type="submit"
                  className="inline-flex justify-center items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  Add Member
                </button>
                {success && (
                  <span className="text-green-600 dark:text-green-400 text-sm sm:ml-4">
                    {success}
                  </span>
                )}
              </div>
            </form>
          </section>

          {/* Members Table */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Current Members
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
              <MemberTable
                members={[]}
                onDelete={(id) => console.log(`Delete member with id: ${id}`)}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AddMemberPage;
