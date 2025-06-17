"use client";

import { useState } from "react";
import Sidebar from "../dashboard.admin.components/Sidebar";
import SettingsSidebar from "./SettingsSidebar";
import SettingsProfileForm from "./Profile";
import SettingsPasswordForm from "./Password";
import SettingsPayment from "./SettingsPayment";
import SettingsNotifications from "./SettingsNotification";
import SettingsSecurity from "./Security";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile"); // Tracks currently active tab
  const [isOpen, setIsOpen] = useState(true); // Tracks sidebar open/closed state

  const toggleSidebar = () => setIsOpen((prev) => !prev); // Toggle sidebar state

  // Define animation for sidebar open/close
  const sidebarVariants = {
    open: {
      width: 256,
      transition: { type: "spring", stiffness: 200, damping: 25 },
    },
    closed: {
      width: 64,
      transition: { type: "spring", stiffness: 200, damping: 25 },
    },
  };

  // Define animation for tab content transitions
  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="flex h-full">
      {/* Animated sidebar using framer-motion */}
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="relative bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen shrink-0 overflow-hidden"
      >
        {/* Sidebar component */}
        <Sidebar
          isOpen={isOpen}
          onClose={() => setIsOpen(true)}
          onToggle={toggleSidebar}
        />

        {/* Sidebar collapse/expand button */}
        <button
          onClick={toggleSidebar}
          className="absolute bottom-4 right-[-12px] p-1 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 focus:outline-none"
          style={{ transform: "translateX(50%)" }}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {/* Icon changes depending on sidebar state */}
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </motion.div>

      {/* Main content section */}
      <div className="flex-1 overflow-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header section */}
          <div>
            <h1 className="text-3xl font-bold text-blue-700">Settings</h1>
            <p className="text-gray-600 dark:text-blue-400 mt-1">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Settings layout with sidebar and content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar tabs with animated opacity based on open state */}
            <motion.div
              className="md:w-64 shrink-0"
              initial={false}
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { opacity: 1 },
                closed: { opacity: 0.6 },
              }}
            >
              <SettingsSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                isOpen={isOpen}
                onToggle={toggleSidebar}
              />
            </motion.div>

            {/* Tab content area with transition */}
            <div className="flex-1  dark:bg-gray-800 p-6 ">
              <AnimatePresence mode="wait">
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <SettingsProfileForm />
                  </motion.div>
                )}
                {activeTab === "password" && (
                  <motion.div
                    key="password"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <SettingsPasswordForm />
                  </motion.div>
                )}
                {activeTab === "payment" && (
                  <motion.div
                    key="payment"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <SettingsPayment />
                  </motion.div>
                )}
                {activeTab === "notifications" && (
                  <motion.div
                    key="notifications"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <SettingsNotifications />
                  </motion.div>
                )}
                {activeTab === "security" && (
                  <motion.div
                    key="security"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <SettingsSecurity />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
