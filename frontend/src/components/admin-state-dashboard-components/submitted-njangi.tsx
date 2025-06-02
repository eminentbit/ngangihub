/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Eye, Edit, Calendar, Users, DollarSign } from "lucide-react";
import { EditNjangiModal } from "./edit-njangi-modal";

const njangis = [
  {
    id: "NJ001",
    groupName: "Community Savings Group",
    contributionAmount: 50000,
    frequency: "Monthly",
    members: 12,
    startDate: "2024-02-01",
    status: "approved",
    submittedAt: "2024-01-15",
    canEdit: false,
  },
  {
    id: "NJ002",
    groupName: "Monthly Contribution Circle",
    contributionAmount: 25000,
    frequency: "Monthly",
    members: 8,
    startDate: "2024-03-01",
    status: "pending",
    submittedAt: "2024-01-20",
    canEdit: true,
  },
  {
    id: "NJ003",
    groupName: "Family Investment Group",
    contributionAmount: 100000,
    frequency: "Quarterly",
    members: 6,
    startDate: "2024-04-01",
    status: "rejected",
    submittedAt: "2024-01-18",
    canEdit: true,
  },
];

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

  const handleEdit = (njangi: any) => {
    setSelectedNjangi(njangi);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedNjangi(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          My Submitted Njangis
        </h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shrink-0">
          Create New Njangi
        </button>
      </div>

      <div className="grid gap-4">
        {njangis.map((njangi) => (
          <div
            key={njangi.id}
            className="bg-white rounded-lg shadow border-l-4 border-l-blue-500"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {njangi.groupName}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>₦{njangi.contributionAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{njangi.frequency}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{njangi.members} members</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      njangi.status
                    )}`}
                  >
                    {njangi.status.charAt(0).toUpperCase() +
                      njangi.status.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500">ID: {njangi.id}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-gray-600">
                  <p>
                    Submitted:{" "}
                    {new Date(njangi.submittedAt).toLocaleDateString()}
                  </p>
                  <p>
                    Start Date:{" "}
                    {new Date(njangi.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button className="border border-blue-200 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                  {njangi.canEdit && (
                    <button
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

      {isEditModalOpen && selectedNjangi && (
        <EditNjangiModal njangi={selectedNjangi} onClose={handleCloseModal} />
      )}
    </div>
  );
}
