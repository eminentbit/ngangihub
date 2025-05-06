import React, { useState, useEffect } from 'react';
import { FaBars, FaLock, FaGlobe, FaSave, FaUsersCog, FaSun, FaMoon } from 'react-icons/fa';
import Sidebar from '../../components/dashboard.admin.components/Sidebar';

const GroupSettingsPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('group-settings');
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState<'public' | 'private'>('private');
  const [success, setSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class to html
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saved:', { groupName, description, privacy });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="flex h-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-20 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:translate-x-0`}
      >
        <Sidebar
          isOpen={isOpen}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onToggle={toggleSidebar}
          onClose={() => setIsOpen(false)}
        />
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-56">
        {/* Top bar */}
        <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-end px-6 py-4 bg-white dark:bg-gray-800 shadow-md lg:ml-56">
          {/* Dark mode toggle on left */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 mr-4"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          {/* Sidebar toggle */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle sidebar"
          >
            <FaBars size={20} />
          </button>
        </header>

        <main className="pt-20 pb-8 px-6 overflow-auto">
          {/* Page Title */}
          <h1 className="text-3xl font-semibold text-indigo-600 flex items-center mb-6">
            <FaUsersCog className="mr-2" /> Group Settings
          </h1>

          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
            {success && (
              <div className="mb-6 px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                <FaSave className="inline mr-2" /> Settings saved successfully!
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">Group Name</label>
                <input
                  type="text"
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                  placeholder="Enter your Njangi group name"
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe your group"
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">Privacy</label>
                <div className="flex items-center space-x-6">
                  {(['public', 'private'] as const).map(option => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value={option}
                        checked={privacy === option}
                        onChange={() => setPrivacy(option)}
                        className="form-radio h-5 w-5 text-indigo-600"
                      />
                      {option === 'public' ? <FaGlobe /> : <FaLock />}
                      <span className="capitalize text-gray-800 dark:text-gray-200">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-transform transform hover:-translate-y-0.5"
                >
                  <FaSave className="mr-2" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GroupSettingsPage;
