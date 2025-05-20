import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext"; // Adjust path as needed
import Header from "../../components/dashboard.bod.components/Header";
import Sidebar from "../../components/dashboard.bod.components/Sidebar";
import GroupRequestTable from "../../components/dashboard.bod.components/GroupRequestTable";
import GroupRequestDetails from "../../components/dashboard.bod.components/GroupRequestDetails";
import DecisionModal from "../../components/dashboard.bod.components/DecisionModal";
import axios from "axios";
import { GroupRequest } from "../../types/group.request";

const GroupRequests: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );

  const [requests, setRequests] = useState<GroupRequest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"Accept" | "Reject" | null>(
    null
  );
  const [modalRequestId, setModalRequestId] = useState<number | null>(null);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/bod/drafts`
        );
        setRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching njangi drafts:", error);
      }
    };

    fetchRequests();
  });

  const notifications = [
    "🚨 Board meeting scheduled for next week (2 hours ago)",
    "🚨 Annual report review pending (5 hours ago)",
  ];
  const notificationCount = notifications.length;

  const isMobile = window.innerWidth < 768;

  // const requestsData = [
  //   {
  //     id: 1,
  //     leaderName: "John Doe",
  //     groupName: "Innovation Team",
  //     maxMembers: 10,
  //     description:
  //       "Our group is mainly focused on driving innovation and creativity within the organization by exploring new ideas and technologies.",
  //     state: "Pending",
  //   },
  //   {
  //     id: 2,
  //     leaderName: "Jane Smith",
  //     groupName: "Sustainability Committee",
  //     maxMembers: 15,
  //     description:
  //       "This group aims to promote sustainable practices and reduce the organization’s carbon footprint through actionable initiatives.",
  //     state: "Pending",
  //   },
  //   {
  //     id: 3,
  //     leaderName: "Alice Johnson",
  //     groupName: "Marketing Task Force",
  //     maxMembers: 8,
  //     description:
  //       "A task force dedicated to enhancing our marketing strategies and increasing brand visibility in competitive markets.",
  //     state: "Pending",
  //   },
  // ];

  const selectedRequest = requests?.find(
    (request) => request._id === selectedRequestId
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleShowModal = (action: "Accept" | "Reject", requestId: number) => {
    setModalAction(action);
    setModalRequestId(requestId);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (reason: string) => {
    if (modalAction && modalRequestId) {
      console.log(
        `Group request with ID: ${modalRequestId} has been ${modalAction.toLowerCase()}ed. Reason: ${reason}`
      );
      // Here you can later add logic to email the reason to the group leader
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header
        // style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        notificationCount={notificationCount}
      />
      <div
        style={{
          display: "flex",
          flex: "1",
          flexDirection: isMobile ? "column" : "row",
          transition: "all 0.3s ease",
        }}
      >
        <Sidebar
          style={{ boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)" }}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main
          style={{
            flex: isSidebarOpen ? "1" : "100%",
            padding: isMobile ? "16px" : isSidebarOpen ? "24px" : "24px 0",
            backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
            color: isDarkMode ? "white" : "black",
            overflowY: "auto", // Independent scrollbar for main content
            transition: "flex 0.3s ease, padding 0.3s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            {!isSidebarOpen && (
              <button
                type="button"
                onClick={toggleSidebar}
                style={{
                  background: "none",
                  border: "none",
                  color: isDarkMode ? "white" : "#5b1a89",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
              >
                ☰
              </button>
            )}
            <h1
              style={{
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: "bold",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                padding: "8px",
                backgroundColor: isDarkMode ? "#4b5563" : "#ffffff",
                borderRadius: "4px",
                display: "inline-block",
              }}
            >
              Group Requests <span style={{ color: "#10b981" }}>👥</span>
            </h1>
          </div>
          {selectedRequest ? (
            <GroupRequestDetails
              request={selectedRequest}
              isDarkMode={isDarkMode}
              onBack={() => setSelectedRequestId(null)}
            />
          ) : (
            <GroupRequestTable
              requests={requests}
              isDarkMode={isDarkMode}
              onSelectRequest={setSelectedRequestId}
              onAccept={() => {}}
              onReject={() => {}}
              // onShowModal={handleShowModal}
            />
          )}
          <DecisionModal
            isOpen={isModalOpen}
            action={modalAction}
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
