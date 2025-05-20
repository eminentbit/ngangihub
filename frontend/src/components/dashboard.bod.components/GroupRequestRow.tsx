import React from "react";

interface GroupRequest {
  id: number;
  leaderName: string;
  groupName: string;
  maxMembers: number;
  description: string;
  state: string;
}

interface GroupRequestRowProps {
  request: GroupRequest;
  isDarkMode: boolean;
  isMobile: boolean;
  onSelect: () => void;
  onShowModal: (action: "Accept" | "Reject", requestId: number) => void; // Add this prop
}

const GroupRequestRow: React.FC<GroupRequestRowProps> = ({
  request,
  isDarkMode,
  isMobile,
  onSelect,
  onShowModal,
}) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: isDarkMode ? "#374151" : "#f9fafb",
    borderBottom: `1px solid ${isDarkMode ? "#4b5563" : "#e5e7eb"}`,
    fontSize: isMobile ? "12px" : "14px",
    color: isDarkMode ? "white" : "black",
    transition: "background-color 0.3s ease",
  };

  const columnStyle = (width: string): React.CSSProperties => ({
    flex: width,
    padding: "0 8px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  });

  return (
    <div style={rowStyle}>
      <div style={columnStyle("0 0 50px")}>{request.id}</div>
      <div style={columnStyle("1")}>
        {truncateText(request.leaderName, isMobile ? 15 : 20)}
      </div>
      <div style={columnStyle("1")}>
        {truncateText(request.groupName, isMobile ? 15 : 20)}
      </div>
      <div style={columnStyle("0 0 150px")}>{request.maxMembers}</div>
      <div style={columnStyle("2")}>
        {truncateText(request.description, isMobile ? 20 : 40)}
      </div>
      <div style={columnStyle("0 0 120px")}>
        <span
          style={{
            padding: "4px 8px",
            backgroundColor: "#f59e0b",
            color: "white",
            borderRadius: "9999px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {request.state}
        </span>
      </div>
      <div style={columnStyle("0 0 200px")}>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={() => onShowModal("Accept", request.id)}
            style={{
              padding: "4px 8px",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: isMobile ? "12px" : "14px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => onShowModal("Reject", request.id)}
            style={{
              padding: "4px 8px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: isMobile ? "12px" : "14px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            Reject
          </button>
          <button
            type="button"
            onClick={onSelect}
            style={{
              padding: "4px 8px",
              backgroundColor: "#9333ea",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: isMobile ? "12px" : "14px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            ➔
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupRequestRow;
