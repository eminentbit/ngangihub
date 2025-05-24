import React from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  showLabels?: boolean;
  onClick?: () => void;
  className?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active,
  showLabels = true,
  onClick,
  className = "",
}) => (
  <button
    className={`
      flex items-center w-full px-4 py-3 text-left hover:bg-blue-900 transition
      ${active ? "bg-blue-900 font-bold rounded-md" : ""}
      ${showLabels ? "" : "justify-center"}
      ${className}
    `}
    onClick={onClick}
    title={!showLabels ? label : undefined}
    aria-label={!showLabels ? label : undefined}
    type="button"
  >
    <span className="text-xl">{icon}</span>
    {showLabels && <span className="ml-4">{label}</span>}
  </button>
);

export default SidebarItem;