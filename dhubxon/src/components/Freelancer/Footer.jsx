import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-blue-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full lg:w-6/12 px-4 mb-8 lg:mb-0">
            <h4 className="text-2xl font-semibold text-white mb-4">Stay Connected with D-hubXon</h4>
            <h5 className="text-lg mb-6 text-white">
              Follow us on social media for the latest updates and announcements.
            </h5>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex space-x-4"
            >
              <a
                href="#"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
              </a>
            </motion.div>
          </div>
          <div className="w-full lg:w-6/12 px-4 text-center">
            <div className="text-sm text-white font-semibold mb-4">
              &copy; {new Date().getFullYear()} D-hubXon Freelance Marketplace
            </div>
            <div className="text-sm text-white font-light mb-4">
              Made with <FontAwesomeIcon icon={faHeart} className="text-red-500" /> by{' '}
              <a
                href="https://www.creative-tim.com?ref=njs-profile"
                className="text-blueGray-500 hover:text-blueGray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                D-hubXon Developers
              </a>
            </div>
            <div className="flex justify-center space-x-6 flex-wrap">
              <a
                href="#"
                className="text-white hover:text-gray-300 mb-2"
              >
                Explore Courses
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 mb-2"
              >
                Join Community
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 mb-2"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 mb-2"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 mb-2"
              >
                Find Jobs
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 mb-2"
              >
                Explore Software Projects
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 mb-2"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 mb-2"
              >
                Terms and Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
