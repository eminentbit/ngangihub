import type React from "react"
import { FaDollarSign, FaUsers, FaCreditCard } from "react-icons/fa"

interface StatisticsCardProps {
  icon: "contribution" | "groups" | "payments"
  title: string
  value: string
  bgColor: string
  iconColor: string
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ icon, title, value, bgColor, iconColor }) => {
  const getIcon = () => {
    switch (icon) {
      case "contribution":
        return <FaDollarSign className={`h-6 w-6 ${iconColor}`} />
      case "groups":
        return <FaUsers className={`h-6 w-6 ${iconColor}`} />
      case "payments":
        return <FaCreditCard className={`h-6 w-6 ${iconColor}`} />
      default:
        return null
    }
  }

  return (
    <div className={`${bgColor} p-6 rounded-lg`}>
      <div className="flex items-center">
        <div className="mr-4">{getIcon()}</div>
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default StatisticsCard
