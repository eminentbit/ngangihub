import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext"; // Adjust path as needed
import Header from "../../components/dashboard.bod.components/Header";
import Sidebar from "../../components/dashboard.bod.components/Sidebar";
import NotificationsList from "../../components/dashboard.bod.components/NotificationsList";
import { useBodStore } from "../../store/create.bod.store";
import useUserStore from "../../store/create.user.store";

const Notifications: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { isLoading, notifications, error } = useBodStore();
  const { fetchNotifications } = useUserStore();

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        notificationCount={notifications.length}
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
          ></h1>

          {isLoading ? (
            <p>Loading notifications...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : (
            <NotificationsList
              isDarkMode={isDarkMode}
              notifications={notifications}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Notifications;
