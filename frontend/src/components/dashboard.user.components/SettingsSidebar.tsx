import { User, Lock, CreditCard, Bell, Shield } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}
const SettingsSidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, activeTab, onTabChange }) => {
  const tabs = [
    { name: "Profile", icon: User, key: "profile" },
    { name: "Password", icon: Lock, key: "password" },
    { name: "Payment Methods", icon: CreditCard, key: "payment" },
    { name: "Notifications", icon: Bell, key: "notifications" },
    { name: "Security", icon: Shield, key: "security" },
  ];

  return (
    <div
      className={`space-y-6 fixed top-0 ${
        isOpen ? "left-0" : "-left-64"
      } lg:left-0 lg:static w-64 h-screen bg-white dark:bg-gray-800 z-20 shadow-lg lg:shadow-none transition-all duration-300`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="block lg:hidden p-4"
        aria-label="Toggle Sidebar"
      >
        Toggle Sidebar
      </button>
      <nav className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === tab.key
                ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}
            onClick={() => onTabChange(tab.key)}
          >
            <tab.icon className="h-5 w-5" />
            <span>{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SettingsSidebar;