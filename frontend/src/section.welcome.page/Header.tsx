import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import Container from "../components/Container";
import Button from "../components/Button";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Features", to: "features" },
    { label: "How It Works", to: "how-it-works" },
    { label: "Pricing", to: "pricing" },
    { label: "Testimonials", to: "testimonials" },
    { label: "FAQ", to: "faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            <img src="/logo3.png" alt="Logo" className="w-8" />
            <span className="ml-2 text-xl font-bold text-blue-700">NAAS</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <ScrollLink
                key={index}
                to={link.to}
                smooth={true}
                duration={500}
                className="text-gray-600 cursor-pointer hover:text-blue-700 font-medium"
              >
                {link.label}
              </ScrollLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button variant="primary" size="sm">
              Sign up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <Container>
            <nav className="flex flex-col py-4 space-y-4">
              {navLinks.map((link, index) => (
                <ScrollLink
                  key={index}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  className="text-gray-600 cursor-pointer hover:text-blue-700 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </ScrollLink>
              ))}
              <div className="flex flex-col space-y-3 pt-3 border-t border-gray-200">
                <Button variant="outline" fullWidth>
                  Log in
                </Button>
                <Button variant="primary" fullWidth>
                  Sign up
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;
