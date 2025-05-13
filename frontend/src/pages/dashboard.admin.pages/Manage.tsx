import React, { useState, useMemo, useEffect } from "react";
import { FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import Sidebar from "../../components/dashboard.admin.components/Sidebar";
import Header from "../../components/dashboard.admin.components/Header";

/**
 * Member interface
 */
interface Member {
  id: number;
  initials: string;
  name: string;
  role: string;
  status: "Active" | "Inactive";
}

/**
 * Utility to generate initials from full name
 */
const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");


const ManageMembersPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
   useEffect(() => {
      document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

  // Active tab for Sidebar
  const [activeTab, setActiveTab] = useState<string>("manage-members");

  // Search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Members list
  const [members, setMembers] = useState<Member[]>([
    { id: 1, initials: "JD", name: "John Doe", role: "Admin", status: "Active" },
    { id: 2, initials: "AS", name: "Alice Smith", role: "Member", status: "Inactive" },
  ]);

  // Modal state for add/edit
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // Filter and sort members memoized
  const filteredMembers = useMemo(() => {
    return members
      .filter((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.initials.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [members, searchQuery]);

  // Open add or edit modal
  const openAddModal = () => {
    setEditingMember(null);
    setModalOpen(true);
  };
  const openEditModal = (member: Member) => {
    setEditingMember(member);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // Handle add/update member
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.elements as typeof e.currentTarget.elements & {
      fullName: HTMLInputElement;
      role: HTMLInputElement;
      status: HTMLSelectElement;
    };

    const name = form.fullName.value.trim();
    if (!name) return;

    const memberData: Member = {
      id: editingMember?.id ?? Date.now(),
      initials: getInitials(name),
      name,
      role: form.role.value,
      status: form.status.value as "Active" | "Inactive",
    };

    setMembers((prev) =>
      editingMember
        ? prev.map((m) => (m.id === editingMember.id ? memberData : m))
        : [...prev, memberData]
    );
    closeModal();
  };

  // Handle delete member
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    }
  };

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  return (
    <div className={`flex min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onToggle={toggleSidebar}
          notifications={[]}
          onClose={toggleSidebar}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
      <Header
          darkMode={isDarkMode}
          setDarkMode={setIsDarkMode}
        />
        <main className="flex-1 px-6 py-8 lg:px-12 transition-all duration-200">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-blue-700 mb-2">Manage Members</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Add, edit, or remove members from your Njangi circle
            </p>
          </header>

          {/* Search and Add */}
          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search members by name or initials"
                className="w-full pl-12 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              />
            </div>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              + Add New Member
            </button>
          </div>

          {/* Table */}
          <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
            <table className="min-w-full rounded-lg">
              <thead>
                <tr>
                  {['Member', 'Role', 'Status', 'Actions'].map((col) => (
                    <th key={col} className="px-6 py-3 text-left text-sm font-medium">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      No members found.
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold">
                          {member.initials}
                        </div>
                        <span>{member.name}</span>
                      </td>
                      <td className="px-6 py-4">{member.role}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            member.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-end space-x-2">
                        <button
                          onClick={() => openEditModal(member)}
                          aria-label="Edit member"
                          className="p-2 rounded hover:bg-indigo-100 transition-colors duration-150 text-indigo-600 hover:text-indigo-800"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          aria-label="Delete member"
                          className="p-2 rounded hover:bg-red-100 transition-colors duration-150 text-red-600 hover:text-red-800"
                        >
                          <FaTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Cards for Mobile */}
          <div className="md:hidden space-y-4">
            {filteredMembers.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow">
                No members found.
              </div>
            ) : (
              filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold">
                      {member.initials}
                    </div>
                    <div>
                      <div className="font-semibold">{member.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{member.role}</div>
                      <div className="mt-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            member.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => openEditModal(member)}
                      aria-label="Edit member"
                      className="p-2 rounded hover:bg-indigo-100 transition-colors duration-150 text-indigo-600 hover:text-indigo-800"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      aria-label="Delete member"
                      className="p-2 rounded hover:bg-red-100 transition-colors duration-150 text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Modal for Add/Edit */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30">
              <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-bold">
                  {editingMember ? "Edit Member" : "Add New Member"}
                </h2>
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block mb-1 text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      defaultValue={editingMember?.name || ''}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block mb-1 text-sm font-medium">
                      Role
                    </label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      defaultValue={editingMember?.role || ''}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="block mb-1 text-sm font-medium">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      defaultValue={editingMember?.status || 'Active'}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 font-medium text-white rounded-lg bg-indigo-600 hover:bg-indigo-700"
                    >
                      {editingMember ? 'Update' : 'Add'} Member
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ManageMembersPage;
