import React, { useState } from 'react';
import CircularButton from './separate_components/CircularButton';
import profile_img from '../../assets/profile image.png';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { IoMdMenu } from 'react-icons/io';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 font-poppins navbar-with-shadow py-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <NavLink to="/" className="flex items-center">
          <img src={logo} className="h-6 mr-3 sm:h-9" alt="Logo" />
        </NavLink>

        {/* Centered NavLinks for Desktop */}
        <div className="hidden lg:flex lg:justify-center">
          <ul className="flex mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <NavLink to="/" activeClassName="font-semibold" className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/find-work" activeClassName="font-semibold" className="nav-link">
                Find Work
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-jobs" activeClassName="font-semibold" className="nav-link">
                My Jobs
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" activeClassName="font-semibold" className="nav-link">
                Reports
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Mobile Menu for smaller screens */}
        <div className="flex items-center lg:order-2">
          <button
            onClick={handleMobileMenuToggle}
            className="lg:hidden p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded={isMobileMenuOpen}
          >
            <IoMdMenu size={24} />
          </button>

          {/* Profile Button for Desktop */}
          <CircularButton imageUrl={profile_img} altText="profile_image" onClick={handleButtonClick} />
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <ul className="flex flex-col mt-4 font-medium">
            <li>
              <NavLink to="/" activeClassName="font-semibold" className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/find-work" activeClassName="font-semibold" className="nav-link">
                Find Work
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-jobs" activeClassName="font-semibold" className="nav-link">
                My Jobs
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" activeClassName="font-semibold" className="nav-link">
                Reports
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
