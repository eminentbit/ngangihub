// components/Settings/SettingsSecurity.tsx
export default function SettingsSecurity() {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Manage your account security settings and two-factor authentication.
      </p>
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">Two-Factor Authentication</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add an extra layer of security to your account
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-500"></div>
          </label>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">Login Notifications</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive notifications for new login attempts
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-500"></div>
          </label>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">Session Management</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your active sessions
            </p>
          </div>
          <button
            type="button"
            className="text-sm text-indigo-600 dark:text-indigo-400 font-medium"
            onClick={() => alert("Viewing active sessions...")}
          >
            View Sessions
          </button>
        </div>
        <div className="border-t dark:border-gray-700 pt-4 mt-4">
          <button
            type="button"
            className="btn btn-secondary text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full flex items-center justify-center gap-2"
            onClick={() => {
              if (
                confirm("Are you sure you want to delete your account? This action cannot be undone.")
              ) {
                alert("Account deletion request submitted.");
              }
            }}
          >
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}