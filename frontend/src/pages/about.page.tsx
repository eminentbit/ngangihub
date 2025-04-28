import React from "react";
import { motion } from "framer-motion";
import njangiComImage from "../assets/njangicom.jpg";
import njangi1 from "../assets/njangi1.jpg";
import njangi2 from "../assets/njangi2.jpg";
import Footer from "../components/footer";


const AboutPage: React.FC = () => {
  // now galleryImages is an array of imported modules
  const galleryImages = [njangi1, njangiComImage, njangi2];

  return (
    <main className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="px-6 py-16 bg-gray-50 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-blue-600 mb-4">About NjangiHub</h1>
          <p className="text-lg text-gray-700">
            Empowering communities with modern tools for traditional rotating savings systems.
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
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg">
              We aim to modernize traditional njangi systems using digital tools while preserving their cultural and communal value. Whether you're forming a group with friends, family, or colleagues, NjangiHub makes contribution tracking, communication, and payout management seamless.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Our Vision</h2>
            <p className="text-gray-700 text-lg">
              To build a trusted digital hub for njangi communities to thrive, grow, and achieve shared financial success. We believe in the power of collective growth, where technology meets tradition for a better tomorrow.
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
  <h2 className="text-2xl font-bold text-blue-600 mb-10">Community Moments</h2>
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

      <Footer />
    </main>
  );
};

export default AboutPage;
