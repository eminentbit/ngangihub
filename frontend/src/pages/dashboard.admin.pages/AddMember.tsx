import React, { useState, useEffect } from "react";
import Sidebar from "../../components/dashboard.admin.components/Sidebar";
import MemberTable from "../../components/dashboard.admin.components/MemberTable";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AddMemberPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("/members");
  const [isDarkMode, setDarkMode] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Basic client-side validation
  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email is invalid";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.role.trim()) errs.role = "Role is required";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setSuccess(null);
      return;
    }
    // TODO: integrate API/member creation logic here
    setSuccess("Member added successfully!");
    setForm({ name: "", email: "", phone: "", role: "" });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        onToggle={toggleSidebar}
        onTabChange={setActiveTab}
      />

      {/* Mobile toggles */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow text-gray-700 dark:text-gray-200 lg:hidden z-30 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
        title="Toggle Sidebar"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 text-gray-700 dark:text-gray-200 z-30 hover:text-blue-500 dark:hover:text-yellow-400 transition"
        title="Toggle Dark Mode"
      >
        {isDarkMode ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-8.66l-.7.7M4.34 4.34l-.7.7m16.02 10.6l-.7-.7m-14.62.7l-.7-.7M21 12h-1M4 12H3" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
          </svg>
        )}
      </button>

      <main
        className={`flex-1 p-4 md:p-8 transition-all duration-200 ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
          }`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl  tracking-tight text-blue-700 dark:text-white flex items-center">
                <span className="mr-3 inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800/50 h-12 w-12">
                  <svg className="w-7 h-7 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9a3 3 0 11-6 0 3 3 0 016 0zM13.5 21h-3a6.5 6.5 0 01-6.5-6.5v-1A6.5 6.5 0 0110.5 7h3a6.5 6.5 0 016.5 6.5v1A6.5 6.5 0 0113.5 21z" />
                  </svg>
                </span>
                Add New Member
              </h1>
              <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-2xl">
                Register a new member to your Njangi circle. Complete the form to add them to your community roster.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 text-xs font-semibold">
              {new Date().toLocaleDateString()}
            </span>
          </div>

          {/* Add Member Form */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-10 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                    }`}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter member's full name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                    }`}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. user@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              {/* replace with: */}
<div>
  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
    Phone
  </label>
  <PhoneInput
    country={'cm'}              // default country (Cameroon)
    value={form.phone}
    onChange={(phone) => {
      setForm({ ...form, phone });
      setErrors({ ...errors, phone: '' });
      setSuccess(null);
    }}
    containerClass="w-full"
    inputClass={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white ${
      errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
    }`}
    dropdownClass="dark:bg-gray-800 dark:text-gray-200"
    buttonClass="dark:bg-gray-900"
    placeholder="Enter phone number"
  />
  {errors.phone && (
    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
  )}
</div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Role</label>
                <label htmlFor="role" className="sr-only">Role</label>
                <select
                  id="role"
                  name="role"
                  className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white ${errors.role ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                    }`}
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="">Select role</option>
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                  <option value="Treasurer">Treasurer</option>
                </select>
                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
              </div>
              <div className="flex items-center justify-between mt-6">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  Add Member
                </button>
                {success && <span className="text-green-600 dark:text-green-400 text-sm ml-4">{success}</span>}
              </div>
            </form>
          </section>

          {/* Members Table */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Current Members</h2>
              {/* Optionally add filter/search here */}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
              {/* MemberTable should be responsive by itself; if not, wrap in a div with overflow-x-auto */}
              <MemberTable 
                members={[]} 
                onDelete={(id: string) => console.log(`Delete member with id: ${id}`)} 
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AddMemberPage;