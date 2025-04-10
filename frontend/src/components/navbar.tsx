import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setisSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => {
    setisSidebarOpen(false);
  }, []);
  return (
    <header className="w-full bg-white shadow-md px-4 py-2 fixed top-0 z-50">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <img
          src="/logo5.png"
          alt="NjangiHub Logo"
          className="md:h-12 h-10 object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
        {/* Desktop navigation */}
        <nav className="md:flex items-center gap-4 hidden">
          <ul className="flex items-center gap-4">
            <li>
              <Link to="/about" className="li-style">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="li-style">
                Contact
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <button
              className="bg-gray-200 text-sm font-semibold text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
            <button
              className="bg-blue-600 px-4 py-2 text-sm font-semibold transition-colors duration-300 text-white rounded-md hover:bg-blue-500"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </nav>

        {/* Hamburger icon for mobile navigation */}
        <div
          className="md:hidden flex items-center gap-4 cursor-pointer"
          onClick={() => setisSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-8 w-8 font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300" />
        </div>
      </div>

      {/* Mobile Nav item/sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
            />
            {/* Sidebar */}
            <motion.aside
              className="fixed top-0 left-0 w-64 h-full bg-white z-50 px-2 py-2 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2
                  className="text-xl font-bold pl-2 text-blue-600 cursor-pointer"
                  onClick={() => {
                    closeSidebar();
                    navigate("/");
                  }}
                >
                  NjangiHub
                </h2>
                <X
                  className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors duration-300"
                  onClick={closeSidebar}
                />
              </div>
              <div className="space-y-2">
                <div
                  className="text-sm hover:bg-blue-100 transition-all duration-300 cursor-pointer py-2 rounded-md"
                  onClick={() => navigate("/about")}
                >
                  <span className="pl-2">About</span>
                </div>
                <div
                  className="text-sm hover:bg-blue-100 transition-all duration-300 cursor-pointer py-2 rounded-md"
                  onClick={() => navigate("/contact")}
                >
                  <span className="pl-2">Contact</span>
                </div>
                <div className="bg-blue-100 py-2 text-sm rounded-md cursor-pointer">
                  <span className="pl-2">Sign Up</span>
                </div>
                <div
                  className="bg-blue-600 py-2 text-white text-sm rounded-md cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  <span className="pl-2">Login</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
