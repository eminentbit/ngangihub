import React from "react";
import { GroupRequest } from "../../types/group.request";
import axios from "axios";
interface GroupRequestDetailsProps {
  request: GroupRequest;
  isDarkMode: boolean;
  setAction: (action: "approve" | "reject", requestId: string) => void;
  onBack?: () => void;
}

const GroupRequestDetails: React.FC<GroupRequestDetailsProps> = ({
  request,
  isDarkMode,
  onBack,
  setAction,
}) => {
  const handleApproveOrReject = async (action: string) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/bod/approve`,
      { action, draftId: request._id }
    );
    console.log(response.data);
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
      } p-6 rounded-lg shadow-md max-h-[60vh] overflow-y-auto`}
    >
      <div className="flex items-start gap-4 mb-4 flex-col">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
          >
            Back
          </button>
        )}
        <h3 className="text-lg font-semibold">Group Request Details</h3>
      </div>

      <div className="space-y-2 mb-6">
        <p className="text-sm">
          <span className="font-medium">ID:</span> {request._id}
        </p>
        <p className="text-sm">
          <span className="font-medium">Leader Name:</span>{" "}
          {request.groupDetails.adminEmail}
        </p>
        <p className="text-sm">
          <span className="font-medium">Group Name:</span>{" "}
          {request.groupDetails.groupName}
        </p>
        <p className="text-sm">
          <span className="font-medium">Max Members:</span>{" "}
          {request.groupDetails.numberOfMember}
        </p>
        <p className="text-sm">
          <span className="font-medium">Description:</span>{" "}
          {request.groupDetails.rules}
        </p>
        <p className="text-sm">
          <span className="font-medium">State:</span>{" "}
          {request.groupDetails.state}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => {
            setAction("approve", request._id);
            handleApproveOrReject("approve");
          }}
          className="flex-1 px-3 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm md:text-base"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => {
            setAction("reject", request._id);
            handleApproveOrReject("reject");
          }}
          className="flex-1 px-3 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm md:text-base"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default GroupRequestDetails;
