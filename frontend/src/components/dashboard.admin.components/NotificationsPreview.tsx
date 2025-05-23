import React from "react";
import { Link } from "react-router-dom";

interface Notification {
  id: number;
  message: string;
  time: string;
  isRead: boolean;
  showLabels: boolean; 
}

interface NotificationsPreviewProps {
  notifications: Notification[];
  onViewAll: () => void;
  showLabels: boolean;  
}

const NotificationsPreview: React.FC<NotificationsPreviewProps> = ({
  notifications,
  onViewAll,
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-bold text-indigo-200 ml-3">NOTIFICATIONS</h3>
      <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
        {notifications.length}
      </span>
    </div>
    <div className="space-y-2 max-h-60 overflow-y-auto">
      {notifications.slice(0, 2).map((n) => (
        <div
          key={n.id}
          className={`p-2 rounded-lg text-sm ml-3 ${
            n.isRead ? "bg-indigo-600/30" : "bg-indigo-600"
          }`}
        >
          <div className="flex justify-between items-start">
            <p>{n.message}</p>
            {!n.isRead && (
              <div className="w-2 h-2 rounded-full bg-red-500 mt-1" />
            )}
          </div>
          <p className="text-xs text-indigo-300 mt-1">{n.time}</p>
        </div>
      ))}
      <button
        onClick={onViewAll}
        className="text-indigo-300 text-sm hover:text-white cursor-pointer whitespace-nowrap pb-3 ml-3"
      >
        <Link to="/notifications">View All</Link>
      </button>
    </div>
  </div>
);

export default NotificationsPreview;
