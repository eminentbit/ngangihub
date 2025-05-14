import React, { useState, useEffect } from 'react';
import { FaLock, FaGlobe, FaSave, FaUsersCog } from 'react-icons/fa';
import Sidebar from '../../components/dashboard.admin.components/Sidebar';
import Header from '../../components/dashboard.admin.components/Header';

const GroupSettingsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('group-settings');
  const [groupName, setGroupName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [privacy, setPrivacy] = useState<'public' | 'private'>('private');
  const [success, setSuccess] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
 

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Prevent body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: persist changes
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className={`flex min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
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

      {/* Main */}
      <div className={`flex-1 transition-all duration-300 p-6 ${isSidebarOpen ? 'lg:ml-2' : 'ml-0'}`}>
        {/* Header */}
        <Header 
        darkMode={isDarkMode} 
        setDarkMode={setIsDarkMode} 
        />
        <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-12 overflow-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Page Header */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center">
                <FaUsersCog className="text-indigo-700 text-2xl mr-3" />
                <h1 className="text-3xl font-bold text-indigo-700 dark:text-gray-100">
                  Group Settings
                </h1>
              </div>
              <span className="mt-4 md:mt-0 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 text-xs font-semibold">
                {new Date().toLocaleDateString()}
              </span>
            </section>

            {/* Settings Form */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              {success && (
                <div className="mb-6 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg flex items-center">
                  <FaSave className="mr-2" /> Settings saved successfully!
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                    Group Name
                  </label>
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
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                    Description
                  </label>
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
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                    Privacy
                  </label>
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
                        <span className="capitalize text-gray-800 dark:text-gray-200">
                          {option}
                        </span>
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
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GroupSettingsPage;