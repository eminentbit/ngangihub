import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export const socialLinks = [
    { icon: Facebook, to: "#" },
    { icon: Twitter, to: "#" },
    { icon: Instagram, to: "#" },
    { icon: Linkedin, to: "#" },
  ];

export  const quickLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", to: "features" },
        { label: "Pricing", to: "pricing" },
        { label: "Testimonials", to: "testimonials" },
        { label: "FAQ", to: "faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", to: "/about" },
        { label: "Blog", to: "#" },
        { label: "Careers", to: "#" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", to: "#" },
        { label: "Terms of Service", to: "#" },
        { label: "Security", to: "#" },
      ],
    },
  ];