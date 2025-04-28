import React from "react";
import Container from "../components/Container";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { quickLinks, socialLinks } from "../utils/footerlinks";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="md:col-span-1">
            <div
              className="flex items-center mb-4 cursor-pointer"
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 0);
              }}
            >
              <img src="/logo2.png" alt="Logo" className="w-8" />
              <span className="ml-2 text-xl font-bold text-blue-700">NAAS</span>
            </div>
            <p className="mb-4 text-gray-400">
              Modern Njangi SaaS platform for community savings and financial
              empowerment.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, to }, index) => (
                <RouterLink
                  key={index}
                  to={to}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <Icon size={20} />
                </RouterLink>
              ))}
            </div>
          </div>

          {/* Quick links */}
          {quickLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {section.title === "Product" ? (
                      <ScrollLink
                        to={link.to}
                        smooth={true}
                        duration={500}
                        offset={-70}
                        className="text-gray-400 hover:text-blue-500 transition-colors cursor-pointer"
                      >
                        {link.label}
                      </ScrollLink>
                    ) : (
                      <RouterLink
                        to={link.to}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        {link.label}
                      </RouterLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center md:text-left md:flex md:items-center md:justify-between">
          <p>&copy; {currentYear} NAAS. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <select className="bg-gray-800 text-gray-300 rounded p-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
