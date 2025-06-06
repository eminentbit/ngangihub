import { HiOutlineChat, HiOutlineUserGroup } from "react-icons/hi";
import { Link } from "react-router-dom";
import { GroupDetails } from "../../types/create-njangi-types";
import getRoleName from "../../utils/roles";
import { useAuthStore } from "../../store/create.auth.store";

interface GroupItemProps {
  group: GroupDetails;
  setChatModalGroupId: (id: string) => void;
}

function GroupItem({ group, setChatModalGroupId }: GroupItemProps) {
  const { user } = useAuthStore();

  const paidMembersCount = group.memberContributions?.filter(
    (contribution) => contribution.paymentsCount > 0
  ).length;
  return (
    <div
      key={group._id}
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-200 dark:border-gray-700 flex flex-col justify-between"
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-lg p-3">
          <HiOutlineUserGroup className="w-8 h-8" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {group.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {group.groupMembers?.length} members
          </p>
        </div>
        <div className="ml-auto">
          <span
            className={`inline-block text-xs font-semibold px-4 py-1 rounded-full ${
              group.isAdmin
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {group.isAdmin ? "Admin" : "Member"}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Payment Status
        </div>
        <div className="relative h-3 rounded-full bg-gray-200 dark:bg-gray-700 mb-2 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-3 rounded-full bg-green-500 transition-all"
            style={{
              width: `${
                (paidMembersCount! / (group.groupMembers?.length || 1)) * 100
              }%`,
            }}
          />
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
          {paidMembersCount}/{group?.groupMembers?.length} paid
        </p>
      </div>

      <div className="flex gap-4 items-center mb-4">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg px-5 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium shadow-md transition"
          onClick={() => group._id && setChatModalGroupId(group._id)}
        >
          <HiOutlineChat className="w-5 h-5" /> Chat
        </button>
      </div>

      <Link
        to={`/${getRoleName(user?.role)}/group/${group._id}`}
        state={{ group }}
        className="text-blue-500 hover:underline"
      >
        Details
      </Link>
    </div>
  );
}

export default GroupItem;
