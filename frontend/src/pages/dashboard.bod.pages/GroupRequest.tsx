import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext"; // Adjust path as needed
import Header from "../../components/dashboard.bod.components/Header";
import Sidebar from "../../components/dashboard.bod.components/Sidebar";
import GroupRequestTable from "../../components/dashboard.bod.components/GroupRequestTable";
import GroupRequestDetails from "../../components/dashboard.bod.components/GroupRequestDetails";
import DecisionModal from "../../components/dashboard.bod.components/DecisionModal";
import { useBodStore } from "../../store/create.bod.store";
import { GroupDetails } from "../../types/create-njangi-types";

const GroupRequests: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"approve" | "reject" | null>(
    null
  );
  const [modalRequestId, setModalRequestId] = useState<string | null>(null);
  const { isDarkMode, toggleTheme } = useTheme();

  const {
    requests,
    isLoading,
    error,
    fetchRequests,
    acceptRequest,
    rejectRequest,
  } = useBodStore();

  // Toggle sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch requests once on mount
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const notifications = [
    "🚨 Board meeting scheduled for next week (2 hours ago)",
    "🚨 Annual report review pending (5 hours ago)",
  ];
  const notificationCount = notifications.length;
  const isMobile = window.innerWidth < 768;

  const selectedRequest = requests.find((req) => req._id === selectedRequestId);

  const openDecisionModal = (
    action: "approve" | "reject",
    requestId: string
  ) => {
    setModalAction(action);
    setModalRequestId(requestId);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (reason: string) => {
    if (modalAction && modalRequestId !== null) {
      if (modalAction === "approve") {
        acceptRequest(modalRequestId, reason);
      } else {
        rejectRequest(modalRequestId, reason);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        notificationCount={notificationCount}
      />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: isMobile ? "column" : "row",
          transition: "all 0.3s ease",
        }}
      >
        <Sidebar
          style={{ boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)" }}
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main
          style={{
            flex: isSidebarOpen ? 1 : 100,
            padding: isMobile ? "16px" : "24px",
            backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
            color: isDarkMode ? "white" : "black",
            overflowY: "auto",
            transition: "flex 0.3s ease, padding 0.3s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 24,
                  color: isDarkMode ? "#fff" : "#5b1a89",
                }}
              >
                ☰
              </button>
            )}
            <h1
              style={{
                fontSize: isMobile ? 20 : 24,
                fontWeight: "bold",
                padding: 8,
                borderRadius: 4,
                backgroundColor: isDarkMode ? "#4b5563" : "#fff",
              }}
            >
              Group Requests <span style={{ color: "#10b981" }}>👥</span>
            </h1>
          </div>

          {isLoading ? (
            <p>Loading requests...</p>
          ) : error ? (
            <p>Error loading requests: {error}</p>
          ) : selectedRequest ? (
            <GroupRequestDetails
              request={selectedRequest}
              isDarkMode={isDarkMode}
              onBack={() => setSelectedRequestId(null)}
              // setAction={openDecisionModal}
            />
          ) : (
            <GroupRequestTable
              selectedGroup={
                (selectedRequest as unknown as GroupDetails) ||
                ({} as GroupDetails)
              }
              requests={requests}
              isDarkMode={isDarkMode}
              onSelectRequest={setSelectedRequestId}
              onAccept={(id: string) => openDecisionModal("approve", id)}
              onReject={(id: string) => openDecisionModal("reject", id)}
            />
          )}

          <DecisionModal
            isOpen={isModalOpen}
            action={"approve"}
            isDarkMode={isDarkMode}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleModalSubmit}
          />
        </main>
      </div>
    </div>
  );
};

export default GroupRequests;
