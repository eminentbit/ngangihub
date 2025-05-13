import type React from "react"
import GroupCard from "./GroupCard"
import { FaEllipsisH } from "react-icons/fa"

const groups = [
  {
    id: 1,
    name: "Team Alpha",
    members: 8,
    paymentStatus: "6/8 paid",
    paymentPercentage: 75,
    isAdmin: true,
  },
  {
    id: 2,
    name: "Project Beta",
    members: 5,
    paymentStatus: "3/5 paid",
    paymentPercentage: 60,
  },
  {
    id: 3,
    name: "Finance Club",
    members: 12,
    paymentStatus: "10/12 paid",
    paymentPercentage: 83,
  },
]

const GroupsList: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Groups</h2>
        <button>
          <FaEllipsisH className="text-gray-400" />
        </button>
      </div>
      <div className="space-y-4">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-center text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors">
        View All Groups
      </button>
    </div>
  )
}

export default GroupsList
