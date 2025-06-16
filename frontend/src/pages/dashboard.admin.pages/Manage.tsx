import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaSearch, FaEdit } from "react-icons/fa";
import { Plus, User as UserIcon } from "lucide-react";
import Sidebar from "../../components/dashboard.admin.components/Sidebar";
import Header from "../../components/dashboard.admin.components/Header";
import {
  useAddMember,
  useDeleteInvite,
  useFetchInvitedMembers,
  useFetchMembers,
  useGroupInfo,
  useRemoveMember,
} from "../../hooks/useAdmin";
import { useAuthStore } from "../../store/create.auth.store";
import { User } from "../../types/auth.validator";
import { useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "../../components/dashboard.admin.components/ui/error.message";
import AddMemberModal from "../../components/dashboard.admin.components/add.member.modal";
import UILoader from "../../components/ui.messages/ui.loader";
import InvitedMembersModal from "../../components/dashboard.admin.components/InvitedMembersModal";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { ConfirmModal } from "../../components/confirm.delete.modal";

// Enhanced User interface with required fields
interface EnhancedUser extends User {
  name: string;
  initials: string;
  uniqueId: string;
}
interface InviteIdentifier {
  email?: string;
  phone?: string;
  groupId?: string;
}
// Tooltip component
const Tooltip: React.FC<{ tip: string; children: React.ReactNode }> = ({
  tip,
  children,
}) => (
  <div className="relative inline-block group">
    {children}
    <div
      className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                    opacity-0 group-hover:opacity-100 pointer-events-none
                    bg-gray-800 text-white text-xs rounded-md py-2 px-3 whitespace-nowrap
                    transition-opacity duration-200 z-10 shadow-lg"
    >
      {tip}
      <div
        className="absolute top-full left-1/2 transform -translate-x-1/2 
                      border-4 border-transparent border-t-gray-800"
      ></div>
    </div>
  </div>
);

// Helper functions
const getInitials = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");

const getRoleBadgeColor = (role: string): string => {
  switch (role.toLowerCase()) {
    case "admin":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "bod":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "member":
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
  }
};

const getStatusBadgeColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "inactive":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const ManageMembersPage = () => {
  const { groupId } = useParams();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { invitedMembers } = useFetchInvitedMembers(groupId!);
  const [isInvitedModalOpen, setIsInvitedModalOpen] = useState(false);

  // Data hooks
  const { mutateAsync: deleteInviteAsync } = useDeleteInvite(groupId!);
  const { mutateAsync: removeMember } = useRemoveMember(groupId!);

  const {
    groupInfo,
    loading: isGroupLoading,
    error: groupError,
  } = useGroupInfo(groupId!);

  const addMember = useAddMember(groupId!);

  const {
    members: fetchedMembers,
    isLoading: isMembersLoading,
    error: membersError,
  } = useFetchMembers(groupId!);

  // Combined flags
  const isLoading = isGroupLoading || isMembersLoading;
  const errorMessage = groupError?.message || membersError?.message || null;

  // State
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setisConfirmDeleteModalOpen] =
    useState(false);
  const [editingMember, setEditingMember] = useState<EnhancedUser | null>(null);
  const [members, setMembers] = useState<EnhancedUser[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReMembeLoading, setisReMembeLoading] = useState(false);

  // Dark mode effect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Sync fetched members into local state
  useEffect(() => {
    if (fetchedMembers && Array.isArray(fetchedMembers)) {
      const enhancedMembers: EnhancedUser[] = fetchedMembers.map((m) => {
        const firstName = m.firstName || "";
        const lastName = m.lastName || "";
        const name = `${firstName} ${lastName}`.trim() || "Unknown User";
        const uniqueId = m._id || m.id;

        return {
          ...m,
          name,
          initials: getInitials(name),
          uniqueId,
          email: m.email || "",
          role: m.role || "member",
          status: m.status || "active",
          isActive: m.isActive ?? true,
        };
      });

      setMembers((prev) => {
        const sameLength = prev.length === enhancedMembers.length;
        const isEqual =
          sameLength &&
          prev.every(
            (m, i) => JSON.stringify(m) === JSON.stringify(enhancedMembers[i])
          );

        return isEqual ? prev : enhancedMembers;
      });
    }
  }, [fetchedMembers]);

  // Filtered and sorted members
  const filteredMembers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return members;

    return members
      .filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.email.toLowerCase().includes(query) ||
          m.initials.toLowerCase().includes(query) ||
          (m.role || "").toLowerCase().includes(query)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [members, searchQuery]);

  // Loading state
  if (isLoading) {
    return (
      <UILoader
        text="Loading latest members"
        subtitle="Hey buddy, just a sec - let's get your members!"
      />
    );
  }

  // Error state
  if (errorMessage) {
    return (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center justify-center w-full">
          <ErrorMessage
            message={errorMessage}
            onRetry={() => {
              if (groupId) {
                queryClient.invalidateQueries({ queryKey: ["group", groupId] });
                queryClient.invalidateQueries({
                  queryKey: ["members", groupId],
                });
              }
            }}
          />
        </div>
      </div>
    );
  }

  // Check if current user is group admin
  const isGroupAdmin = groupInfo?.adminId === user?._id;


  // Event handlers
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const closeModal = () => {
    setModalOpen(false);
    setEditingMember(null);
    setIsSubmitting(false);
  };

  const openAddModal = () => {
    setEditingMember(null);
    setModalOpen(true);
  };

  const openEditModal = (member: EnhancedUser) => {
    setEditingMember(member);
    setModalOpen(true);
  };

  // remove members
  const handleDelete = async (member: EnhancedUser) => {
    if (!isGroupAdmin || member.role === "admin") return;
    try {
      console.log("Deleting member form manage.tsx groupid: ", groupId);
      console.log(
        "Deleting member from manage.tsx id coder: ",
        member.uniqueId
      );

      await removeMember(member.uniqueId);

      // Remove from local state immediately for better UX
      setMembers((prev) => prev.filter((x) => x.uniqueId !== member.uniqueId));

      if (groupId) {
        queryClient.invalidateQueries({ queryKey: ["members", groupId] });
      }
    } catch (error) {
      toast.error("Failed to delete member! Please try again.", {
        position: "top-right",
        duration: 5000,
      });
      console.error("Failed to delete member:", error);
    }
  };

  // add member to group
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const email = (formData.get("email") as string)?.trim() || "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address");
        return;
      }
      await addMember.mutateAsync(email);
      closeModal();
    } catch (error) {
      console.error("Failed to save member:", error);
      // You might want to show a toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  // handle delete invited members
  const handleInviteDelete = async (member: InviteIdentifier) => {
    // Prepare the identifier object expected by mutation
    const identifier: InviteIdentifier = {
      groupId: member.groupId,
      ...(member.email ? { email: member.email } : {}),
      ...(member.phone ? { phone: member.phone } : {}),
    };

    if (!identifier) {
      toast.error("Cannot delete invite: missing email or phone");
      return;
    }

    try {
      await deleteInviteAsync(identifier);
      setIsInvitedModalOpen(false);
    } catch (error) {
      console.error("Failed to delete invite:", error);
    }

    // deleteInvite(identifier, {
    //   onSuccess: () => {
    //     setIsInvitedModalOpen(false);
    //   },
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   onError: (error: any) => {
    //     toast.error(
    //       error.message || "Failed to cancel invite. Please try again."
    //     );
    //   },
    // });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        onClose={toggleSidebar}
        onTabChange={() => {}}
        notifications={[]}
      />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        <Header
          darkMode={isDarkMode}
          setDarkMode={setIsDarkMode}
          someStyles={`${!isSidebarOpen ? "md:ml-10" : "md:ml-0"}`}
        />

        <main
          className={`flex-1 overflow-auto p-4 lg:p-6 ${
            !isSidebarOpen ? "md:ml-20" : "md:mr-0"
          }`}
        >
          {/* Page header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Manage Members
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {groupInfo?.name && `Group: ${groupInfo.name}`}
              </p>
            </div>

            <div className="flex w-full lg:w-auto gap-2 flex-col sm:flex-row">
              <div className="relative flex-1 lg:w-80">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                           dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100
                           dark:focus:ring-indigo-400 dark:focus:border-indigo-400
                           transition-colors"
                />
              </div>

              {isGroupAdmin ? (
                <button
                  type="button"
                  onClick={openAddModal}
                  className="flex items-center justify-center px-4 py-2.5 bg-indigo-600 
                           text-white rounded-lg hover:bg-indigo-700 focus:ring-2 
                           focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                           transition-colors font-medium"
                >
                  <Plus size={18} className="mr-2" />
                  Add Member
                </button>
              ) : (
                <Tooltip tip="Only group admin can add members">
                  <button
                    type="button"
                    disabled
                    className="flex items-center justify-center px-4 py-2.5 bg-gray-400 
                             text-white rounded-lg cursor-not-allowed font-medium"
                  >
                    <Plus size={18} className="mr-2" />
                    Add Member
                  </button>
                </Tooltip>
              )}
            </div>
          </div>

          {/* Members count */}
          <div className="mb-4 flex items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredMembers.length} of {members.length} members
            </p>
            {invitedMembers.length > 0 && (
              <button
                onClick={() => setIsInvitedModalOpen(true)}
                className="text-blue-600 hover:underline text-sm cursor-pointer"
              >
                View Your Invites ({invitedMembers.length})
              </button>
            )}
          </div>

          <InvitedMembersModal
            isOpen={isInvitedModalOpen}
            onClose={() => setIsInvitedModalOpen(false)}
            members={invitedMembers}
            onDelete={handleInviteDelete}
            isInviting={isLoading}
          />

          {/* Members table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    {isGroupAdmin && (
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredMembers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={isGroupAdmin ? 5 : 4}
                        className="px-6 py-12 text-center"
                      >
                        <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                          No members found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {searchQuery
                            ? "Try adjusting your search terms."
                            : "Get started by adding your first member."}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredMembers.map((member, index) => (
                      <>
                        <tr
                          key={index}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                                  <span className="text-sm font-medium text-white">
                                    {member.initials}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {member.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-gray-100">
                              {member.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(
                                member.role as string
                              )}`}
                            >
                              {(member.role as string)?.toUpperCase() ||
                                "MEMBER"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                                member.status as string
                              )}`}
                            >
                              {(member.status as string)?.toUpperCase() ||
                                "ACTIVE"}
                            </span>
                          </td>
                          {isGroupAdmin && (
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  type="button"
                                  onClick={() => openEditModal(member)}
                                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 
                                         dark:hover:text-indigo-300 transition-colors p-1"
                                  title="Edit member"
                                >
                                  <FaEdit size={14} />
                                </button>
                                {member.role !== "admin" && (
                                  <button
                                    type="button"
                                    onClick={() => {

                                      setisConfirmDeleteModalOpen(true)
                                    }
                                    }
                                    className={`text-red-600 hover:text-red-900 dark:text-red-400 
                                           dark:hover:text-red-300 transition-colors p-1 ${
                                             filteredMembers.length <= 2 &&
                                             "hidden"
                                           }`}
                                    title="Delete member"
                                  >
                                    <FiTrash2 size={14} />
                                  </button>
                                )}
                              </div>
                            </td>
                          )}
                        </tr>
                        <ConfirmModal
                          open={isConfirmDeleteModalOpen}
                          message={`Are you sure you want to remove ${member.firstName} from ${groupInfo?.name}? This action cannot be undone.`}
                          onCancel={() => setisConfirmDeleteModalOpen(false)}
                          onConfirm={async () => {
                            setisReMembeLoading(true);
                            await handleDelete(member);
                            setisReMembeLoading(false);
                          }}
                          loading={isReMembeLoading}
                        />
                      </>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add/Edit Member Modal */}
          {isModalOpen && (
            <AddMemberModal
              closeModal={() => setModalOpen(false)}
              editingMember={editingMember}
              isSubmitting={isSubmitting}
              handleSave={handleSave}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ManageMembersPage;
