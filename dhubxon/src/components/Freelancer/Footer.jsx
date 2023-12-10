import React from 'react';
import { FaTwitter, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-12 mt-auto fixed-bottom w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full lg:w-6/12 px-4 mb-8 lg:mb-0">
            <h4 className="text-2xl font-semibold text-white mb-4">Stay Connected with D-HubXon</h4>
            <h5 className="text-lg mb-6 text-white">
              Follow us on social media for the latest updates and announcements.
            </h5>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex space-x-4"
            >
              {/* Social Media Icons */}
              <a href="#twitter">
                <FaTwitter className="text-white text-2xl" />
              </a>
              <a href="#linkedin">
                <FaLinkedin className="text-white text-2xl" />
              </a>
              <a href="#instagram">
                <FaInstagram className="text-white text-2xl" />
              </a>
              <a href="#email">
                <FaEnvelope className="text-white text-2xl" />
              </a>
            </motion.div>
          </div>
          <div className="w-full lg:w-6/12 px-4 text-center">
            <div className="text-sm text-white font-semibold mb-4">
              &copy; {new Date().getFullYear()} D-HubXon Freelance Marketplace
            </div>
            <div className="flex justify-center space-x-6 flex-wrap">
              {/* Additional Footer Links */}
              <a href="#find-jobs" className="text-white hover:text-gray-300 mb-2">
                Find Jobs
              </a>
              <a href="#terms-and-conditions" className="text-white hover:text-gray-300 mb-2">
                Terms and Conditions
              </a>
              <a href="#privacy-policy" className="text-white hover:text-gray-300 mb-2">
                Privacy Policy
              </a>
              <a href="#explore-courses" className="text-white hover:text-gray-300 mb-2">
                Explore Courses
              </a>
              <a href="#explore-software-products" className="text-white hover:text-gray-300 mb-2">
                Explore Software Products
              </a>
              <a href="#join-community" className="text-white hover:text-gray-300 mb-2">
                Join Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
