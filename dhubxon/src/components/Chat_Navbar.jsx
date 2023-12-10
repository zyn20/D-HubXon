import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCog } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Your Logo" className="h-8 w-48 rounded-full" />
        <h1 className="text-lg font-semibold italic">Messages</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-blue-700 text-white border border-gray-50 rounded-full py-1 px-3 focus:outline-none focus:ring focus:border-white"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute text-gray-300 right-3 top-1/2 transform -translate-y-1/2"
          />
        </div>
        <FontAwesomeIcon icon={faCog} className="text-gray-300" />
        {/* Additional icons or user-related features */}
      </div>
    </div>
  );
};

export default Navbar;
