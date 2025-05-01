import React from "react";
import { motion } from "framer-motion";
import njangiComImage from "../assets/njangicom.jpg";
import njangi1 from "../assets/njangi1.jpg";
import njangi2 from "../assets/njangi2.jpg";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AboutPage: React.FC = () => {
  const galleryImages = [njangi1, njangiComImage, njangi2];
  const navigate = useNavigate();

  return (
    <main className="bg-white text-gray-800 relative">
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
      {/* Hero Section */}
      <section className="px-6 py-16 bg-gray-50 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-blue-600 mb-4">About NAAS</h1>
          <p className="text-lg text-gray-700">
            Empowering communities with modern tools for traditional rotating
            savings systems.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <motion.img
            src={njangiComImage}
            alt="Mission"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg">
              We aim to modernize traditional njangi systems using digital tools
              while preserving their cultural and communal value. Whether you're
              forming a group with friends, family, or colleagues, NAAS makes
              contribution tracking, communication, and payout management
              seamless.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 text-lg">
              To build a trusted digital hub for njangi communities to thrive,
              grow, and achieve shared financial success. We believe in the
              power of collective growth, where technology meets tradition for a
              better tomorrow.
            </p>
          </div>
          <motion.img
            src={njangi1}
            alt="Vision"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-6 py-16 bg-white text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-10">
          Community Moments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-xl shadow-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-64 object-cover transition-transform hover:scale-105 duration-300"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-50 text-center text-sm py-4">
        <p className="text-gray-700">
          &copy; {new Date().getFullYear()} NAAS. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default AboutPage;
