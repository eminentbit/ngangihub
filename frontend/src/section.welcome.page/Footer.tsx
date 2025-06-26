import React from "react";
import Container from "../components/Container";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { quickLinks } from "../utils/footerlinks";
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
              <h3 className="text-3xl font-bold">
                <span className="text-blue-400">NjangiHub</span>
              </h3>
            </div>
            <p className="mb-4 text-gray-400">
              Modern Njangi SaaS platform for community savings and financial
              empowerment.
            </p>
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

        <div className="border-t border-gray-800 mt-12 pt-8 text-center mx-auto">
          <p>&copy; {currentYear} NjangiHub- NAAS. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
