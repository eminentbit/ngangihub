import type React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Target, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const teamMembers = [
    {
      name: "Wepngong Shalom Ngwayi Afanyu",
      role: "Scrum Master - Frontend Engineer",
      image: "/team/shalom.jpg",
    },
    {
      name: "Ejoh Eshingwe Daryl",
      role: "CTO - Full Stack Engineer",
      image: "/team/ejong.jpg",
    },
    {
      name: "Ateh Damaris Anyah",
      role: "Product Owner - Frontend Engineer",
      image: "/team/damaris.jpg",
    },
    {
      name: "Fanyi Charllson Fanyi",
      role: "Developer - Full Stack Engineer",
      image: "/team/charllson.png",
    },
    {
      name: "Kouotou Jeff Lionel",
      role: "Developer - Frontend Engineer",
      image: "/team/jeff.jpg",
    },
    {
      name: "Kimbi Thierry Fon",
      role: "Developer - Frontend Engineer",
      image: "/team/thierry.jpg",
    },
  ];

  return (
    <main className="bg-white text-gray-800 relative min-h-screen">
      {/* Back Button */}
      <div
        className="absolute left-4 top-4 z-10 text-sm flex items-center gap-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 py-3 px-4 rounded-lg transition-all duration-300 group bg-white/80 backdrop-blur-sm shadow-sm"
        onClick={() => navigate("/")}
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-all duration-300"
        />
        Back to Home
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 text-center overflow-hidden">
        {/* dotted pattern background */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%233b82f6' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users size={16} />
            About Our Team
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">NjangiHub</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Empowering communities with modern tools for traditional rotating
            savings systems through innovation and collaboration.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <img
                src="/njangi1.jpg"
                alt="Our Mission"
                width={600}
                height={400}
                className="relative w-full rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                We aim to modernize traditional njangi systems using
                cutting-edge digital tools while preserving their cultural and
                communal value. Whether you're forming a group with friends,
                family, or colleagues, NjangiHub makes contribution tracking,
                communication, and payout management seamless and secure.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  Digital Innovation
                </span>
                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  Community First
                </span>
                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  Secure & Reliable
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Eye size={16} />
              Our Vision
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transforming{" "}
              <span className="text-blue-600">Financial Communities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We envision a world where traditional savings groups seamlessly
              blend with modern technology, creating stronger, more connected
              communities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🔒",
                title: "Trust & Security",
                description:
                  "Bank-level security with transparent tracking for every contribution and payout.",
              },
              {
                icon: "🌍",
                title: "Global Reach",
                description:
                  "Connect njangi groups across the country while preserving local traditions.",
              },
              {
                icon: "📱",
                title: "Simple & Intuitive",
                description:
                  "Easy-to-use interface that works for everyone, regardless of tech experience.",
              },
              {
                icon: "🚀",
                title: "Innovation",
                description:
                  "Cutting-edge features that enhance traditional savings without losing their essence.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group hover:-translate-y-2"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    2025
                  </div>
                  <div className="text-sm text-gray-600">
                    Development Started
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    Launched
                  </div>
                  <div className="text-sm text-gray-600">Current Phase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    2025
                  </div>
                  <div className="text-sm text-gray-600">Official Launch</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users size={16} />
              Meet Our Team
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The People Behind <span className="text-blue-600">NjangiHub</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our diverse team of passionate developers and designers working
              together to build the future of community savings.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="relative w-full aspect-square object-cover object-top rounded-xl"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-4">
                      {member.role}
                    </p>
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Journey Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target size={16} />
              Our Development Journey
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Building <span className="text-blue-600">NjangiHub</span> Step by
              Step
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From concept to reality - here's how we're bringing modern
              technology to traditional savings groups.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600 rounded-full hidden lg:block"></div>

            <div className="space-y-12">
              {[
                {
                  phase: "Phase 1",
                  title: "Research & Planning",
                  description:
                    "Understanding traditional njangi systems and identifying pain points that technology can solve.",
                  status: "Completed",
                  color: "bg-green-100 text-green-700",
                  side: "left",
                },
                {
                  phase: "Phase 2",
                  title: "Design & Prototyping",
                  description:
                    "Creating user-friendly interfaces that respect cultural practices while introducing modern features.",
                  status: "Completed",
                  color: "bg-green-100 text-green-700",
                  side: "right",
                },
                {
                  phase: "Phase 3",
                  title: "Core Development",
                  description:
                    "Building the foundation - user management, group creation, contribution tracking, and secure payments.",
                  status: "Completed",
                  color: "bg-blue-100 text-blue-700",
                  side: "left",
                },
                {
                  phase: "Phase 4",
                  title: "Testing & Refinement",
                  description:
                    "Beta testing with real njangi groups to ensure the platform meets community needs.",
                  status: "Completed",
                  color: "bg-yellow-100 text-yellow-600",
                  side: "right",
                },
                {
                  phase: "Phase 5",
                  title: "Launch & Scale",
                  description:
                    "Official launch with community onboarding, support systems, and continuous feature development.",
                  status: "Completed",
                  color: "bg-gray-100 text-gray-600",
                  side: "left",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: item.side === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    item.side === "left" ? "lg:justify-start" : "lg:justify-end"
                  } justify-center`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 hidden lg:block"></div>

                  <div
                    className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 max-w-md ${
                      item.side === "left" ? "lg:mr-8" : "lg:ml-8"
                    } w-full lg:w-auto group hover:-translate-y-2`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-blue-600">
                        {item.phase}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${item.color}`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Want to be part of our journey?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We're always looking for feedback from njangi group organizers
                and members. Your insights help us build a better platform for
                everyone.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-6 py-3 bg-blue-100 text-blue-700 rounded-full font-medium">
                  📧 Feedback Welcome
                </span>
                <span className="px-6 py-3 bg-blue-100 text-blue-700 rounded-full font-medium">
                  🤝 Beta Testing Soon
                </span>
                <span className="px-6 py-3 bg-blue-100 text-blue-700 rounded-full font-medium">
                  🚀 Early Access Available
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">
                <span className="text-blue-400">NjangiHub</span>
              </h3>
              <p className="text-gray-400">
                Empowering communities through digital innovation
              </p>
            </div>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} NjangiHub. All rights
                reserved. Built with ❤️ by our amazing team.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default AboutPage;
