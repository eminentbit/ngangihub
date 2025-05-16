/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Plus,
  MessageSquare,
  Info,
  MoreHorizontal,
  UserPlus,
  DollarSign,
  Calendar,
  AlertTriangle,
  Settings,
  BarChart,
} from "lucide-react";
import { useForm } from "react-hook-form";
import ChatInterface from "./chat-interface";
import SubscriptionModal from "./subscription-modal";
import GroupDetailsModal from "./group-details-modal";
import ReactDOM from "react-dom/client";
import { useSearchParams } from "react-router-dom";

// Exchange rate: 1 USD = approximately 600 CFA
const CFA_EXCHANGE_RATE = 600;

const MyGroups = () => {
  const [searchParams] = useSearchParams();
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Team Alpha",
      description: "Project development team",
      members: 8,
      paid: 6,
      totalAmount: 2400 * CFA_EXCHANGE_RATE,
      isAdmin: true,
      createdAt: "Jan 15, 2023",
    },
    {
      id: 2,
      name: "Project Beta",
      description: "Research and development",
      members: 5,
      paid: 3,
      totalAmount: 1500 * CFA_EXCHANGE_RATE,
      isAdmin: false,
      createdAt: "Mar 22, 2023",
    },
    {
      id: 3,
      name: "Finance Club",
      description: "Investment discussion group",
      members: 12,
      paid: 10,
      totalAmount: 3600 * CFA_EXCHANGE_RATE,
      isAdmin: false,
      createdAt: "May 10, 2023",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  interface Group {
    id: number;
    name: string;
    description: string;
    members: number;
    paid: number;
    totalAmount: number;
    isAdmin: boolean;
    createdAt: string;
  }

  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [hasCreatedGroup, setHasCreatedGroup] = useState(true); // Set to true since user is admin of Team Alpha
  const [showGroupMenu, setShowGroupMenu] = useState<number | null>(null);
  const [showChat, setShowChat] = useState<Group | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showGroupDetails, setShowGroupDetails] = useState<Group | null>(null);
  // const [showMemberManagement, setShowMemberManagement] = useState<Group | null>(null);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  interface CreateGroupFormData {
    name: string;
    description: string;
    email?: string;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGroupFormData>();

  const {
    register: registerMember,
    handleSubmit: handleSubmitMember,
    reset: resetMember,
  } = useForm();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue: setEditValue,
  } = useForm<CreateGroupFormData>();

  useEffect(() => {
    // Check if user has created a group (is admin of any group)
    const isAdmin = groups.some((group) => group.isAdmin);
    setHasCreatedGroup(isAdmin);

    // Check if we should open create modal from URL param
    const createParam = searchParams.get("create");
    if (createParam === "true") {
      setShowCreateModal(true);
    }

    // Check if we should show a specific group from URL param
    const groupParam = searchParams.get("group");
    if (groupParam) {
      const group = groups.find((g) => g.id === Number.parseInt(groupParam));
      if (group) {
        setSelectedGroup(group);
        if (group.isAdmin) {
          setShowEditGroupModal(true);
        }
      }
    }
  }, [searchParams, groups]);

  const onCreateGroup = (data: CreateGroupFormData) => {
    setIsCreatingGroup(true);

    // Simulate API call delay
    setTimeout(() => {
      const newGroup = {
        id: groups.length + 1,
        name: data.name,
        description: data.description,
        members: 1,
        paid: 0,
        totalAmount: 0,
        isAdmin: true,
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };

      setGroups([...groups, newGroup]);
      setShowCreateModal(false);
      setHasCreatedGroup(true);
      reset();
      setIsCreatingGroup(false);

      // Show success message
      alert(`Group "${data.name}" created successfully!`);
    }, 1500);
  };

  const onAddMember = (data: CreateGroupFormData) => {
    if (selectedGroup) {
      // Update the group with new member count
      const updatedGroups = groups.map((group) =>
        group.id === selectedGroup.id
          ? { ...group, members: group.members + 1 }
          : group
      );
      setGroups(updatedGroups);
      setShowAddMemberModal(false);
      resetMember();

      // Show success message
      alert(`Invitation sent to ${data.email} to join ${selectedGroup.name}`);
    }
  };

  const onRemoveMember = (data: CreateGroupFormData) => {
    if (selectedGroup && selectedGroup.members > 1) {
      // Update the group with reduced member count
      const updatedGroups = groups.map((group) =>
        group.id === selectedGroup.id
          ? {
              ...group,
              members: group.members - 1,
              paid: Math.min(group.paid, group.members - 1),
            }
          : group
      );
      setGroups(updatedGroups);
      setShowRemoveMemberModal(false);

      // Show success message
      alert(`Member ${data.email} removed from ${selectedGroup.name}`);
    }
  };

  const onEditGroup = (data: CreateGroupFormData) => {
    if (selectedGroup) {
      // Update the group with new data
      const updatedGroups = groups.map((group) =>
        group.id === selectedGroup.id
          ? { ...group, name: data.name, description: data.description }
          : group
      );
      setGroups(updatedGroups);
      setShowEditGroupModal(false);
      resetEdit();

      // Show success message
      alert(`Group "${data.name}" updated successfully!`);
    }
  };

  const onDeleteGroup = () => {
    if (selectedGroup) {
      // Remove the group
      const updatedGroups = groups.filter(
        (group) => group.id !== selectedGroup.id
      );
      setGroups(updatedGroups);
      setShowDeleteGroupModal(false);

      // Update hasCreatedGroup if no more admin groups
      const stillAdmin = updatedGroups.some((group) => group.isAdmin);
      setHasCreatedGroup(stillAdmin);

      // Show success message
      alert(`Group "${selectedGroup.name}" deleted successfully!`);
    }
  };

  const openAddMemberModal = (group: Group) => {
    setSelectedGroup(group);
    // Use the new MemberManagement component instead of the simple modal
    const memberManagementComponent = document.createElement("div");
    memberManagementComponent.id = "member-management-modal";
    document.body.appendChild(memberManagementComponent);

    // Render the MemberManagement component
    import("./member-management").then((module) => {
      const MemberManagement = module.default;
      const root = ReactDOM.createRoot(memberManagementComponent);
      root.render(
        <MemberManagement
          groupId={group.id}
          groupName={group.name}
          isAdmin={group.isAdmin}
          onClose={() => {
            document.body.removeChild(memberManagementComponent);
          }}
        />
      );
    });
  };

  const openRemoveMemberModal = (group: Group) => {
    setSelectedGroup(group);
    setShowRemoveMemberModal(true);
  };

  const openEditGroupModal = (group: Group) => {
    setSelectedGroup(group);
    setEditValue("name", group.name);
    setEditValue("description", group.description);
    setShowEditGroupModal(true);
  };

  const openDeleteGroupModal = (group: Group) => {
    setSelectedGroup(group);
    setShowDeleteGroupModal(true);
  };

  const handleGroupChat = (group: Group) => {
    setShowChat(group);
  };

  const handleGroupDetails = (group: Group) => {
    setShowGroupDetails(group);
  };

  const handleSubscribe = () => {
    setShowSubscriptionModal(false);
    setIsSubscribed(true);
    setHasCreatedGroup(false); // Allow creating a group after subscribing

    // Show success message
    alert("Subscription successful! You can now create more groups.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Groups</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your groups and memberships
          </p>
        </div>
        {hasCreatedGroup ? (
          <button
            className="btn btn-secondary flex items-center gap-2"
            onClick={() => setShowSubscriptionModal(true)}
          >
            <span>Subscribe</span>
          </button>
        ) : (
          <button
            className={`btn btn-primary flex items-center gap-2 ${
              isCreatingGroup ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={() => setShowCreateModal(true)}
            disabled={isCreatingGroup}
          >
            {isCreatingGroup ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Creating...</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Create Group</span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="card">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{group.name}</h3>
                    {group.isAdmin && (
                      <span className="text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 px-2 py-0.5 rounded">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {group.description}
                  </p>
                </div>
              </div>
              <div className="relative">
                <button
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() =>
                    setShowGroupMenu(
                      showGroupMenu === group.id ? null : group.id
                    )
                  }
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>

                {showGroupMenu === group.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setShowGroupMenu(null);
                        handleGroupChat(group);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Open Chat</span>
                      </div>
                    </button>

                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setShowGroupMenu(null);
                        handleGroupDetails(group);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        <span>View Details</span>
                      </div>
                    </button>

                    {group.isAdmin && (
                      <>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => {
                            setShowGroupMenu(null);
                            openEditGroupModal(group);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            <span>Edit Group</span>
                          </div>
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => {
                            setShowGroupMenu(null);
                            openAddMemberModal(group);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            <span>Manage Members</span>
                          </div>
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => {
                            setShowGroupMenu(null);
                            alert("Analytics feature coming soon!");
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <BarChart className="h-4 w-4" />
                            <span>Analytics</span>
                          </div>
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                          onClick={() => {
                            setShowGroupMenu(null);
                            openDeleteGroupModal(group);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span>Delete Group</span>
                          </div>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <Users className="h-4 w-4" />
                  <span>Members</span>
                </div>
                <p className="font-medium">{group.members}</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span>Total Amount</span>
                </div>
                <p className="font-medium">
                  {group.totalAmount.toLocaleString()} CFA
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>Created</span>
                </div>
                <p className="font-medium">{group.createdAt}</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span>Payment Status</span>
                </div>
                <p className="font-medium">
                  {group.paid}/{group.members} paid
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="progress-bar">
                <div
                  className="progress-value"
                  style={{ width: `${(group.paid / group.members) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                className="btn btn-secondary flex items-center gap-2"
                onClick={() => handleGroupChat(group)}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </button>

              {group.isAdmin ? (
                <button
                  className="btn btn-primary flex items-center gap-2"
                  onClick={() => openAddMemberModal(group)}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Manage Members</span>
                </button>
              ) : (
                <button
                  className="btn btn-secondary flex items-center gap-2"
                  onClick={() => handleGroupDetails(group)}
                >
                  <Info className="h-4 w-4" />
                  <span>Details</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Group</h2>
            <form onSubmit={handleSubmit(onCreateGroup)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Group name is required" })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name?.message?.toString()}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  rows={3}
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowCreateModal(false);
                    reset();
                  }}
                  disabled={isCreatingGroup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex items-center gap-2"
                  disabled={isCreatingGroup}
                >
                  {isCreatingGroup ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <span>Create Group</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Group Modal */}
      {showEditGroupModal && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Group</h2>
            <form onSubmit={handleSubmitEdit(onEditGroup)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  {...registerEdit("name", {
                    required: "Group name is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  {...registerEdit("description")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  rows={3}
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditGroupModal(false);
                    resetEdit();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Group Modal */}
      {showDeleteGroupModal && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Delete Group</h2>

            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800 dark:text-red-200">
                    Are you sure you want to delete this group?
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    This action cannot be undone. All group data, including
                    messages and payment records, will be permanently deleted.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowDeleteGroupModal(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                onClick={onDeleteGroup}
              />
            </div>
          </div>
        </div>
      )}

      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <ChatInterface
              groupName={showChat?.name}
              groupId={showChat?.id}
              onClose={() => setShowChat(null)}
            />
          </div>
        </div>
      )}

      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onSubscribe={handleSubscribe}
        />
      )}

      {showGroupDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <GroupDetailsModal
              group={showGroupDetails}
              onClose={() => setShowGroupDetails(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGroups;
