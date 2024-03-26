import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { IoMdMenu } from 'react-icons/io';
import { FaUser, FaSignInAlt } from 'react-icons/fa'; // Import icons as needed

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#e4e4e4] border-b-2 font-poppins navbar-with-shadow py-4 fixed top-0 left-0 right-0 z-10 ">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <NavLink to="/" className="flex items-center">
          <img src={logo} className="h-6 sm:h-16 w-36" alt="Logo" />
        </NavLink>

        {/* Mobile Menu for smaller screens */}
        <div className="flex items-center lg:order-2">
          <button
            onClick={handleMobileMenuToggle}
            className="lg:hidden p-2 ml-1 text-sm text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded={isMobileMenuOpen}
          >
            <IoMdMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <ul className="flex mt-4 font-medium">
            <li className="mr-4">
              <NavLink to="/login" activeClassName="font-semibold" className="nav-link">
                <FaSignInAlt /> Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" activeClassName="font-semibold" className="nav-link">
                <FaUser /> Signup
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
