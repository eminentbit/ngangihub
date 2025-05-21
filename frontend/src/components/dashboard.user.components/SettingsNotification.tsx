// components/Settings/SettingsNotifications.tsx
import {  Save } from "lucide-react";

export default function SettingsNotifications() {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Manage how you receive notifications from your groups.
      </p>
      {[
        {
          label: "Email Notifications",
          desc: "Receive email notifications for important updates",
        },
        {
          label: "Push Notifications",
          desc: "Receive push notifications on your device",
        },
        {
          label: "Payment Reminders",
          desc: "Receive reminders for upcoming payments",
        },
        {
          label: "Group Activity",
          desc: "Receive notifications for group activities",
        },
      ].map((item, idx) => (
        <div className="flex items-center justify-between py-2" key={idx}>
          <div>
            <p className="font-medium">{item.label}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.desc}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-500"></div>
          </label>
        </div>
      ))}
      <div className="border-t dark:border-gray-700 pt-4 flex justify-end">
        <button
          type="button"
          className="btn btn-primary flex items-center gap-2"
          onClick={() => alert("Notification preferences saved!")}
        >
          <Save className="h-4 w-4" />
          <span>Save Preferences</span>
        </button>
      </div>
    </div>
  );
}