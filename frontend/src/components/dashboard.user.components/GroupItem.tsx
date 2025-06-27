import React, { useEffect, useState } from "react";
import { HiOutlineChat, HiOutlineUserGroup, HiUsers } from "react-icons/hi";
import { Group } from "../../hooks/useAdmin";
import getRoleName from "../../utils/roles";
import MemberTooltip from "./member.tooltip";
import { secureGet } from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";

const useAuthStore = () => ({ user: { role: "admin" } });

// Mock Group type - replace with your actual typ

interface GroupItemProps {
  group: Group;
  setChatModalGroupId: (id: string) => void;
}

function GroupItem({ group, setChatModalGroupId }: GroupItemProps) {
  const { user } = useAuthStore();
  const [showMemberTooltip, setShowMemberTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const paidMembersCount =
    group.memberContributions?.filter(
      (contribution) => contribution.totalAmountPaid > 0
    ).length || 0;

  useEffect(() => {
    const interval = setInterval(() => {
      secureGet("/get-online-status");
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleMemberHover = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const tooltipWidth = 320;

    let x = rect.right + 12;
    if (x + tooltipWidth > viewportWidth) {
      x = rect.left - tooltipWidth - 12;
    }

    setTooltipPosition({
      x: Math.max(12, x),
      y: rect.top + rect.height / 2,
    });
    setShowMemberTooltip(true);
  };

  const handleMemberLeave = () => {
    setTimeout(() => {
      setShowMemberTooltip(false);
    }, 500);
  };

  const navigate = useNavigate();
  return (
    <>
      <div
        key={group._id}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col justify-between hover:scale-[1.02] group"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-lg p-3 group-hover:scale-110 transition-transform">
            <HiOutlineUserGroup className="w-8 h-8" />
          </span>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {group.name}
            </h2>
            <div
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer inline-flex items-center gap-1 p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
              onMouseEnter={handleMemberHover}
              onMouseLeave={handleMemberLeave}
              onClick={() =>
                navigate(
                  `/${getRoleName(user.role)}/group/${group._id}/members`
                )
              }
            >
              <HiUsers className="w-4 h-4" />
              <span className="font-medium">
                {group.groupMembers?.length || 0} member
                {(group.groupMembers?.length || 0) !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <div className="ml-auto">
            <span
              className={`inline-block text-xs font-semibold px-4 py-1 rounded-full transition-all ${
                group?.isAdmin
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 group-hover:bg-blue-200 dark:group-hover:bg-blue-800"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200 group-hover:bg-gray-200 dark:group-hover:bg-gray-600"
              }`}
            >
              {group?.isAdmin ? "Admin" : "Member"}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
            Payment Status
          </div>
          <div className="relative h-3 rounded-full bg-gray-200 dark:bg-gray-700 mb-2 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500 shadow-sm"
              style={{
                width: `${
                  (paidMembersCount / (group.groupMembers?.length || 1)) * 100
                }%`,
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              {paidMembersCount}/{group?.groupMembers?.length || 0} paid
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {Math.round(
                (paidMembersCount / (group.groupMembers?.length || 1)) * 100
              )}
              % complete
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center mb-4">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg px-5 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            onClick={() => group._id && setChatModalGroupId(group._id)}
          >
            <HiOutlineChat className="w-5 h-5" /> Chat
          </button>
        </div>

        <a
          href={`/${getRoleName(user?.role)}/group/${group._id}`}
          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors font-medium"
        >
          {user?.role == "admin" && "View Details →"}
        </a>
      </div>

      <MemberTooltip
        members={group.groupMembers}
        isVisible={showMemberTooltip}
        position={tooltipPosition}
        groupId={group._id}
        paidMembersCount={paidMembersCount}
      />
    </>
  );
}

export default GroupItem;
