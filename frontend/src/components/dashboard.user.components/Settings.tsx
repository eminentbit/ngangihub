"use client";

import { useState } from "react";
import Sidebar from "../dashboard.admin.components/Sidebar";
import SettingsSidebar from "./SettingsSidebar";
import SettingsProfileForm from "./Profile";
import SettingsPasswordForm from "./Password";
import SettingsPayment from "./SettingsPayment";
import SettingsNotifications from "./SettingsNotification";
import SettingsSecurity from "./Security";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(true)}
        onToggle={() => setIsOpen((o) => !o)}
       
      />
      <div
        className={`space-y-6 px-20 py-10 mx-auto ${
          isOpen ? "lg:ml-64" : "lg:ml-16"
        } transition-all duration-300`}
      >
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Settings</h1>
          <p className="text-gray-600 dark:text-blue-400  mt-400 mt-1">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 shrink-0">
            <SettingsSidebar 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
              isOpen={isOpen}
              onToggle={() => setIsOpen((o) => !o)}
            />
          </div>
          <div className="flex-1">
            {activeTab === "profile" && <SettingsProfileForm />}
            {activeTab === "password" && <SettingsPasswordForm />}
            {activeTab === "payment" && <SettingsPayment />}
            {activeTab === "notifications" && <SettingsNotifications />}
            {activeTab === "security" && <SettingsSecurity />}
          </div>
        </div>
      </div>
    </div>
  );
}