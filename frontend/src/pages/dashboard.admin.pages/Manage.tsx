import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrash, FaEdit, FaSun, FaMoon, FaBars } from 'react-icons/fa';
import Sidebar from '../../components/dashboard.admin.components/Sidebar';

interface Member {
  id: number;
  initials: string;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map(n => n[0]?.toUpperCase() ?? '')
    .join('');

const ManageMembersPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('/admin-manage-members');
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<Member[]>([
    { id: 1, initials: 'JD', name: 'John Doe', role: 'Admin', status: 'Active' },
    { id: 2, initials: 'AS', name: 'Alice Smith', role: 'Member', status: 'Inactive' },
  ]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const filtered = members
    .filter(m =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.initials.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const openAddModal = () => { setEditingMember(null); setModalOpen(true); };
  const openEditModal = (member: Member) => { setEditingMember(member); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.elements as typeof e.currentTarget.elements & {
      fullName: HTMLInputElement;
      role: HTMLInputElement;
      status: HTMLSelectElement;
    };
    const name = form.fullName.value;
    const newMember: Member = {
      id: editingMember?.id ?? Date.now(),
      initials: getInitials(name),
      name,
      role: form.role.value,
      status: form.status.value as 'Active' | 'Inactive',
    };
    setMembers(ms => editingMember ? ms.map(m => m.id === editingMember.id ? newMember : m) : [...ms, newMember]);
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembers(ms => ms.filter(m => m.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        onToggle={toggleSidebar}
        onTabChange={setActiveTab}
      />

      {/* Mobile toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-full p-2 text-gray-700 dark:text-gray-200 lg:hidden z-30"
        aria-label="Toggle Sidebar"
      >
        <FaBars size={20} />
      </button>
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-200 ${!isSidebarOpen ? 'opacity-100' : 'opacity-0'} lg:hidden z-20`} onClick={toggleSidebar} />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md transition-transform duration-200 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-20`}>
        <div className="flex items-center justify-between p-4 h-10 max-w-5xl mx-auto">
          <button onClick={toggleSidebar} className="lg:hidden text-gray-700 dark:text-gray-200" aria-label="Toggle Sidebar">
            <FaBars size={20} />
          </button>
        </div>
      </header>

      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 text-gray-700 dark:text-gray-200 z-30"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      <main className={`flex-1 p-4 md:p-12 transition-all duration-200 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>        
        <div className="max-w-5xl mx-auto">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-700 dark:text-gray-100">Manage Members</h1>
              <p className="text-black dark:text-gray-300">Add, edit, or remove members from your Njangi circle</p>
            </div>
          </header>

          {/* Search & Add */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-400 dark:text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name or initials..."
                className="pl-12 w-full border border-blue-200 dark:border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-gray-500"
                aria-label="Search members"
              />
            </div>
            <button
              onClick={openAddModal}
              className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              + Add New Member
            </button>
          </div>

          {/* Members Table / Card List */}
          <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
            <table className="min-w-full border-collapse">
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-blue-100 dark:border-gray-700">
                  {['Member','Role','Status','Actions'].map((title) => (
                    <th key={title} className="text-left py-3 px-6 text-xs font-bold text-blue-500 dark:text-gray-400 uppercase tracking-widest">
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 px-6 text-center text-blue-400 dark:text-gray-500">
                      No members found.
                    </td>
                  </tr>
                ) : (filtered.map((member) => (
                  <tr key={member.id} className="block md:table-row mb-4 md:mb-0 bg-white dark:bg-gray-800 rounded-lg shadow md:shadow-none">
                    {/* Member */}
                    <td className="block md:table-cell py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-indigo-700 dark:to-purple-700 flex items-center justify-center text-white font-bold">
                          {member.initials}
                        </div>
                        <span className="ml-3 font-medium text-gray-900 dark:text-gray-100">{member.name}</span>
                      </div>
                    </td>
                    {/* Role */}
                    <td className="block md:table-cell py-4 px-4">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{member.role}</span>
                    </td>
                    {/* Status */}
                    <td className="block md:table-cell py-4 px-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${member.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>
                        {member.status}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="block md:table-cell py-4 px-4">
                      <div className="flex space-x-2 justify-end">
                        <button onClick={() => openEditModal(member)} aria-label="Edit member" className="p-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(member.id)} aria-label="Remove member" className="p-2 rounded hover:bg-red-100 dark:hover:bg-gray-700">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))) }
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-auto overflow-auto" style={{
                maxHeight: '90vh'
              }}>                
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-blue-900 dark:text-gray-100">
                    {editingMember ? 'Edit Member' : 'Add New Member'}
                  </h2>
                  <form onSubmit={handleSave} className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-blue-700 dark:text-gray-300 mb-1">Full Name</label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        defaultValue={editingMember ? editingMember.name : ''}
                        required
                        className="w-full border border-blue-200 dark:border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-gray-500 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-blue-700 dark:text-gray-300 mb-1">Role</label>
                      <input
                        id="role"
                        name="role"
                        type="text"
                        defaultValue={editingMember ? editingMember.role : ''}
                        required
                        className="w-full border border-blue-200 dark:border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-gray-500 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="status" className="block
]}
    text-sm font-medium text-blue-700 dark:text-gray-300 mb-1">Status</label>
                        <select
                            id="status"
                            name="status"
                            defaultValue={editingMember ? editingMember.status : 'Active'}
                            className="w-full border border-blue-200 dark:border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-gray-500 text-sm"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                        <button type="button" onClick={closeModal} className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-indigo-600 dark:hover:bg-indigo-700">{editingMember ? 'Update' : 'Add'} Member</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            )}
            </div>
        </main>
        </div>
    );
    }
    export default ManageMembersPage;