/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Eye, Edit, Calendar, Users, DollarSign } from "lucide-react";
import { EditNjangiModal } from "./edit-njangi-modal";
// import { recentActivity } from "../../utils/data.admin.dashboard";
import { useAdminState } from "../../store/create.admin.store";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/create.auth.store";
import UpgradeModal from "../upgradePlan";

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

export function SubmittedNjangis() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNjangi, setSelectedNjangi] = useState<any>(null);

  const { recentActivity } = useAdminState();
  const { user } = useAuthStore();
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = (njangi: any) => {
    setSelectedNjangi(njangi);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedNjangi(null);
  };
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          My Submitted Njangis
        </h2>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shrink-0"
          onClick={() => {
            if (recentActivity?.createdGroups.length == 1) {
              if (!user) setOpenModal(true);
              else {
                if (user.paymentMode == "free") {
                  setOpenModal(true);
                } else {
                  return;
                }
              }
              return;
            }
            navigate("/njangi-form");
          }}
        >
          Create New Njangi
        </button>
      </div>

      <div className="grid gap-4">
        {recentActivity?.pendingGroups.map((njangi, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow border-l-4 border-l-blue-500"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {njangi.groupDetails.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>
                        ₦
                        {njangi.groupDetails.contributionAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{njangi.groupDetails.contributionFrequency}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{njangi.groupDetails.numberOfMember} members</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      njangi.groupDetails.status!
                    )}`}
                  >
                    {njangi.groupDetails.status!.charAt(0).toUpperCase() +
                      njangi.groupDetails.status!.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500">
                    ID: {njangi._id}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-gray-600">
                  <p>
                    Submitted:{" "}
                    {new Date(
                      njangi.groupDetails.createdAt
                    ).toLocaleDateString()}
                  </p>
                  <p>
                    Start Date:{" "}
                    {new Date(
                      njangi.groupDetails.startDate
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    className="border border-blue-200 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                  {njangi.groupDetails.status == "pending" && (
                    <button
                      type="button"
                      onClick={() => handleEdit(njangi)}
                      className="border border-blue-200 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <UpgradeModal isOpen={openModal} onClose={() => setOpenModal(false)} />
      )}

      {isEditModalOpen && selectedNjangi && (
        <EditNjangiModal njangi={selectedNjangi} onClose={handleCloseModal} />
      )}
    </div>
  );
}
