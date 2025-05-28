import React, { useState } from "react";
import { useTheme } from "./ThemeContext"; // Adjust path as needed
import Header from "../../components/dashboard.bod.components/Header";
import Sidebar from "../../components/dashboard.bod.components/Sidebar";
import NotificationsList from "../../components/dashboard.bod.components/NotificationsList";
import { useBodStore } from "../../store/create.bod.store";

const Notifications: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { fetchNotifications, isLoading, notifications, error } = useBodStore(); // Assuming fetchNotifications is a function in BodStore

  const notificationCount = notifications.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header
        // style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        notificationCount={notificationCount}
      />
      <div style={{ display: "flex", flex: "1" }}>
        <Sidebar
          style={{ boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)" }}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main
          style={{
            flex: "1",
            padding: "20px",
            backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
            color: isDarkMode ? "white" : "black",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Notifications
          </h1>
          <NotificationsList isDarkMode={isDarkMode} />
        </main>
      </div>
    </div>
  );
};

export default Notifications;
