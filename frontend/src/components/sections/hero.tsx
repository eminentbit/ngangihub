import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  containerVariants,
  itemVariants,
} from "../../utils/animation-constant";

export default function HeroSection() {
  return (
    <>
      <section className="w-full max-sm:mt-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center h-screen text-center px-4"
        >
          <motion.h1
            variants={itemVariants}
            className="md:text-6xl text-4xl font-bold mb-4"
          >
            Welcome to <span className="text-blue-600">NjangiHub</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="md:text-4xl text-lg font-medium text-gray-700 mb-2"
          >
            Empowering Community Savings & Financial Growth
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 md:text-lg text-base max-w-2xl mb-8 mt-3"
          >
            NjangiHub is your digital companion for managing rotating savings
            groups, boosting financial transparency, and strengthening trust
            within your community.
          </motion.p>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
            className="bg-blue-600 text-white md:px-20 md:py-4 px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center gap-2 shadow-lg shadow-blue-200"
          >
            Get Started
            <ArrowRight className="text-white" />
          </motion.button>
          <motion.div
            variants={itemVariants}
            className="mt-10 md:flex max-sm:flex-col max-sm:space-y-2 items-center gap-2"
          >
            <p className="hero-card">Digital Njangi Management</p>
            <p className="hero-card">Community Financial Empowerment</p>
            <p className="hero-card">Transparent & Secure Contributions</p>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
