import { useEffect, useState } from "react";
import {
  Edit,
  Calendar,
  Users,
  DollarSign,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { EditNjangiModal } from "./edit-njangi-modal";
import { useAdminState } from "../../store/create.admin.store";

export function NjangiDetails() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // const groupInfo = {
  //   id: "NJ002",
  //   status: "pending",
  //   submittedAt: "2024-01-20",
  //   canEdit: true,
  //   editDeadline: "2024-01-27",
  //   groupName: "Monthly Contribution Circle",
  //   contributionAmount: 25000,
  //   frequency: "Monthly",
  //   members: 8,
  //   startDate: "2024-03-01",
  //   accountSetup: {
  //     firstName: "John",
  //     lastName: "Doe",
  //     email: "john.doe@email.com",
  //     phoneNumber: "+234 801 234 5678",
  //     role: "admin",
  //     status: "pending",
  //   },
  //   groupDetails: {
  //     groupName: "Monthly Contribution Circle",
  //     contributionAmount: 25000,
  //     contributionFrequency: "Monthly",
  //     payoutMethod: "Bank Transfer",
  //     startDate: "2024-03-01",
  //     endDate: "2024-12-31",
  //     numberOfMember: 8,
  //     rules:
  //       "All members must contribute by the 5th of each month. Late payments incur a 5% penalty.",
  //     status: "pending",
  //   },
  //   inviteMembers: [
  //     { type: "email", value: "member1@email.com", contact: "Alice Johnson" },
  //     { type: "email", value: "member2@email.com", contact: "Bob Smith" },
  //     { type: "phone", value: "+234 802 345 6789", contact: "Carol Williams" },
  //   ],
  // };

  const { fetchGroupInfo, groupId, groupInfo } = useAdminState();

  useEffect(() => {
    fetchGroupInfo(groupId!, false);
  }, [fetchGroupInfo, groupId]);

  console.log(groupInfo);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Njangi Details
          </h2>
          <p className="text-sm text-gray-600">ID: {groupInfo?._id}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              groupInfo?.status || ""
            )}`}
          >
            {(groupInfo?.status || "").charAt(0).toUpperCase() +
              (groupInfo?.status || "").slice(1)}
          </span>
          {groupInfo?.status == "pending" && (
            <button
              type="button"
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto flex items-center justify-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Details
            </button>
          )}
        </div>
      </div>

      {/* {groupInfo?.status == "pending" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-800">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">
              Edit deadline:{" "}
              {new Date(groupInfo.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      )} */}

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {/* Account Setup */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Account Setup
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {groupInfo?.firstName[0]}
                  {groupInfo?.accountSetup.lastName[0]}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {groupInfo?.accountSetup.firstName}{" "}
                  {groupInfo?.accountSetup.lastName}
                </p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    groupInfo?.accountSetup.status
                  )}`}
                >
                  {groupInfo?.accountSetup.role}
                </span>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">
                  {groupInfo?.accountSetup.email}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">
                  {groupInfo?.accountSetup.phoneNumber}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Group Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Group Details
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                {groupInfo?.groupDetails.groupName}
              </h4>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  groupInfo?.groupDetails.status
                )}`}
              >
                {groupInfo?.groupDetails.status}
              </span>
            </div>

            <hr className="border-gray-200" />

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-gray-600">Contribution</p>
                  <p className="font-medium">
                    ₦
                    {groupInfo?.groupDetails.contributionAmount.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-gray-600">Frequency</p>
                  <p className="font-medium">
                    {groupInfo?.groupDetails.contributionFrequency}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-gray-600">Members</p>
                  <p className="font-medium">
                    {groupInfo?.groupDetails.numberOfMember}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-gray-600">Payout Method</p>
                  <p className="font-medium">
                    {groupInfo?.groupDetails.payoutMethod}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-sm">
              <p className="text-gray-600 mb-1">Duration</p>
              <p className="font-medium">
                {new Date(
                  groupInfo?.groupDetails.startDate
                ).toLocaleDateString()}{" "}
                -{" "}
                {new Date(groupInfo?.groupDetails.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Group Rules
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {groupInfo?.groupDetails.rules}
        </p>
      </div>

      {/* Invited Members */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Invited Members ({groupInfo?.inviteMembers.length})
        </h3>
        <div className="space-y-3">
          {groupInfo?.inviteMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-blue-50 rounded-lg"
            >
              <div className="space-y-1 text-center sm:text-left">
                <p className="font-medium text-gray-900">{member.contact}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600">
                  {member.type === "email" ? (
                    <Mail className="h-4 w-4" />
                  ) : (
                    <Phone className="h-4 w-4" />
                  )}
                  <span>{member.value}</span>
                </div>
              </div>
              <span className="border border-gray-300 text-gray-700 px-2 py-1 rounded-full text-xs font-medium mt-2 sm:mt-0 w-fit">
                {member.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditNjangiModal njangi={groupInfo} onClose={handleCloseModal} />
      )}
    </div>
  );
}
