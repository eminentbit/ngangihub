import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/theme.context";
import Header from "../../components/dashboard.bod.components/Header";
import Sidebar from "../../components/dashboard.bod.components/Sidebar";
import MeetingList from "../../components/dashboard.bod.components/MeetingList";
import MeetingFilter from "../../components/dashboard.bod.components/MeetingFilter";
import ScheduleMeetingForm from "../../components/dashboard.bod.components/ScheduleMeetingForm";

const MeetingSchedule: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const onResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const mainVariants = {
    visible: {
      transition: { type: "spring", stiffness: 70, damping: 15 },
    },
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <motion.div
        className={`flex-1 flex flex-col overflow-hidden ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
        variants={mainVariants}
        animate="visible"
      >
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Meeting Schedule <span className="text-green-500">📅</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <MeetingFilter filter={filter} setFilter={setFilter} />
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <ScheduleMeetingForm isDarkMode={isDarkMode} />
            </motion.div>
          </div>

          <section>
            <MeetingList isDarkMode={isDarkMode} filter={filter} />
          </section>
        </main>
      </motion.div>
    </div>
  );
};

export default MeetingSchedule;
