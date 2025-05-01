import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main className="flex relative flex-col min-h-screen bg-gray-50">
      <div
        className="absolute left-4 top-4 text-sm flex items-center gap-1 cursor-pointer hover:bg-blue-100 hover:text-blue-600 py-2 px-4 hover:rounded-md transition-colors duration-300 group"
        onClick={() => navigate("/")}
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-all duration-300"
        />
        Back to Home
      </div>
      <section className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-md"
        >
          <h2 className="text-3xl font-semibold text-indigo-600 mb-8 text-center">
            Get in Touch with NAAS  
          </h2>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="fullName" className="text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
              />
            </div>

            {/* Message (spans both columns) */}
            <div className="sm:col-span-2 flex flex-col">
              <label htmlFor="message" className="text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message..."
                rows={6}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow resize-none"
              ></textarea>
            </div>

            {/* Submit Button (spans both columns) */}
            <div className="sm:col-span-2 text-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Footer Component */}
      <footer className="py-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} NAAS. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default ContactPage;
