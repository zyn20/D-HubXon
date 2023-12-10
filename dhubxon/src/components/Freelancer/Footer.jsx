import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-blue-900 py-12 mt-auto">
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
                <FontAwesomeIcon icon={faTwitter} className="text-white text-2xl" />
              </a>
              <a href="#linkedin">
                <FontAwesomeIcon icon={faLinkedin} className="text-white text-2xl" />
              </a>
              <a href="#instagram">
                <FontAwesomeIcon icon={faInstagram} className="text-white text-2xl" />
              </a>
            </motion.div>
          </div>
          <div className="w-full lg:w-6/12 px-4 text-center">
            <div className="text-sm text-white font-semibold mb-4">
              &copy; {new Date().getFullYear()} D-HubXon Freelance Marketplace
            </div>
            {/* Additional Footer Content */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
