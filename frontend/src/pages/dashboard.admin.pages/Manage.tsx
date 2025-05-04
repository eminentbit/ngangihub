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
  const [activeTab, setActiveTab] = useState('manage-members');
  const [isDarkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<Member[]>([
    { id: 1, initials: 'JD', name: 'John Doe', role: 'Admin', status: 'Active' },
    { id: 2, initials: 'AS', name: 'Alice Smith', role: 'Member', status: 'Inactive' },
  ]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

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
    <div className="flex h-full min-h-screen bg-white text-gray-800">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onToggle={toggleSidebar}
        notifications={[]}
        onClose={toggleSidebar}
      />

      {/* Mobile toggles */}
      <div className="lg:hidden flex items-center justify-between w-full p-4 bg-white shadow">
        <button onClick={toggleSidebar} className="text-gray-700" aria-label="Toggle sidebar">
          <FaBars size={20} />
        </button>
        <button onClick={toggleDarkMode} className="text-gray-700" aria-label="Toggle dark mode">
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      {/* Main content */}
      <main className={`${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'} flex-1 p-6 md:p-12`}>        
        <header className="mb-8">
          <h1 className="text-3xl text-blue-700 font-bold mb-1">Manage Members</h1>
          <p className="text-gray-600">Add, edit, or remove members from your Njangi circle</p>
        </header>

        {/* Search & Add */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search members by name or initials"
              className="w-full pl-12 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <button
            onClick={openAddModal}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            + Add New Member
          </button>
        </div>

        {/* Members Table / Cards */}
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Member</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No members found.</td>
                </tr>
              ) : (filtered.map(member => (
                <tr key={member.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold">
                      {member.initials}
                    </div>
                    <span>{member.name}</span>
                  </td>
                  <td className="px-6 py-4">{member.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {member.status}
                    </span>
                  </td>                  
                  <td className="px-6 py-4 text-right space-x-2 flex items-center justify-end">
                    <button onClick={() => openEditModal(member)} aria-label="Edit member" className="text-indigo-600 hover:text-indigo-800 p-2 rounded hover:bg-indigo-100 transition">
                      <FaEdit size={18} />
                    </button>
                    <button onClick={() => handleDelete(member.id)} aria-label="Delete member" className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))) }
            </tbody>
          </table>
        </div>

        {/* Modal (Add/Edit) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                    <input id="fullName" name="fullName" type="text" defaultValue={editingMember?.name || ''} required className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-300" />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
                    <input id="role" name="role" type="text" defaultValue={editingMember?.role || ''} required className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-300" />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                    <select id="status" name="status" defaultValue={editingMember?.status || 'Active'} className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-300">
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                  <div className="flex justify-end pt-4 space-x-2">
                    <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">{editingMember ? 'Update' : 'Add'} Member</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageMembersPage;
