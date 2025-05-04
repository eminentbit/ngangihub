import React, { useState } from 'react';
import { FaBars, FaLock, FaGlobe, FaSave, FaUsersCog } from 'react-icons/fa';
import Sidebar from '../../components/dashboard.admin.components/Sidebar';

const GroupSettingsPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('group-settings');
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState<'public' | 'private'>('private');
  const [notifications] = useState([
    { id: 1, message: 'Settings saved successfully', time: 'just now', isRead: false }
  ]);
  const [success, setSuccess] = useState(false);

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const handleTabChange = (tab: string) => setActiveTab(tab);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // simulate API call
    console.log('Saved:', { groupName, description, privacy });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen bg-gray-100">
      {/* Sidebar toggle for mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 text-gray-700 lg:hidden z-40"
        aria-label="Toggle Sidebar"
      >
        <FaBars size={24} />
      </button>

      <Sidebar
        isOpen={isOpen}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        notifications={notifications}
        onToggle={toggleSidebar}
        onClose={() => setIsOpen(false)}
      />

      <main
        className={`flex-1 transition-margin duration-300 p-4 sm:p-6 md:p-8 overflow-auto lg:ml-${isOpen ? '64' : '0'}`}
      >
        <div className="max-w-full lg:max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <div className="flex items-center mb-6">
            <FaUsersCog className="text-2xl sm:text-3xl text-indigo-600 mr-2" />
            <h1 className="text-2xl sm:text-3xl font-semibold text-blue-700">Group Settings</h1>
          </div>

          {success && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-6">
              Settings have been saved successfully!
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Group Name</label>
              <input
                type="text"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                placeholder="Enter your Njangi group name"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                placeholder="Enter a description for your group"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Privacy</label>
              <div className="flex flex-wrap items-center gap-6">
                {['public', 'private'].map(option => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="privacy"
                      value={option}
                      checked={privacy === option}
                      onChange={() => setPrivacy(option as 'public' | 'private')}
                      className="form-radio text-indigo-600"
                    />
                    {option === 'public' ? (
                      <FaGlobe className="text-gray-600" />
                    ) : (
                      <FaLock className="text-gray-600" />
                    )}
                    <span className="text-gray-800 capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-shadow shadow-lg"
              >
                <FaSave className="mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default GroupSettingsPage;
