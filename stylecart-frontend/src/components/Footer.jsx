import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-gray-100 text-gray-700 py-10 px-6">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
        {/* Logo & about */}
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Your trusted online store bringing you quality and style. Shop with confidence and stay trendy every season.
          </p>
        </div>

        {/* Company links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-500">
            <li><a href="#" className="hover:text-black">About Us</a></li>
            <li><a href="#" className="hover:text-black">Careers</a></li>
            <li><a href="#" className="hover:text-black">Blog</a></li>
            <li><a href="#" className="hover:text-black">Contact</a></li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="text-gray-500 space-y-2">
            <li>Email: <a href="mailto:info@yourdomain.com" className="hover:text-gray-700">info@yourdomain.com</a></li>
            <li>Phone: <a href="tel:+911234567890" className="hover:text-gray-700">+91 12345 67890</a></li>
            <li>Address: 123, Green Valley, Mumbai, Maharashtra, India</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 border-t border-gray-300 pt-4 text-xs">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;