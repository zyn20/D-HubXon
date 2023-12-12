import React, { useState, useRef } from 'react';
import CircularButton from './separate_components/CircularButton';
import profile_img from '../../assets/profile image.png';
import { NavLink,Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { IoMdMenu } from 'react-icons/io';
import { FaComments } from 'react-icons/fa'; // Import the chat icon
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownAnchorRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

 

  const handleLogout = () => {
    // Perform logout actions, e.g., clear user session, redirect to login page
    // For now, let's simulate a logout by redirecting to the login page
    localStorage.removeItem('token');
    Swal.fire({
      title: 'Done!',
      text: 'Logged Out Successfully.',
      icon: 'success',
    });
    console.log('Token has been Removed');
    navigate('/login');
  };

  return (
    <nav className="bg-[#E1E1E1] border-gray-200  font-poppins navbar-with-shadow py-4 fixed top-0 left-0 mb-28 right-0 z-10">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <NavLink to="#" className="flex items-center">
          <img src={logo} className="h-6 mr-3 sm:h-9" alt="Logo" />
        </NavLink>

        {/* Centered NavLinks for Desktop */}
        <div className="hidden lg:flex lg:justify-center">
          <ul className="flex mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <NavLink to="/freelancer" activeClassName="font-semibold" className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/freelancer/search-jobs" activeClassName="font-semibold" className="nav-link">
                Find Work
              </NavLink>
            </li>
            <li>
              <NavLink to="/freelancer/my-jobs" activeClassName="font-semibold" className="nav-link">
                My Jobs
              </NavLink>
            </li>
            <li>
              <NavLink to="/freelancer/community" activeClassName="font-semibold" className="nav-link">
                D-Community
              </NavLink>
            </li>
            {/* Chat NavLink */}
            <li className="flex items-center">
              <NavLink to="/freelancer/chat" activeClassName="font-semibold" className="nav-link flex items-center">
                <FaComments className="mr-1" /> Chat
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

          <div ref={dropdownAnchorRef} className="relative">
          <CircularButton
            imageUrl={profile_img}
            altText="profile_image"
            onClick={handleDropdownToggle}
          />

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
              {/* Dropdown items */}
              <Link to="/freelancer/set-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"> Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
      Logout
    </button>
              {/* Add more dropdown items here */}
            </div>
          )}
        </div>
       
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
              <NavLink to="/freelancer/community" activeClassName="font-semibold" className="nav-link">
                D-Community
              </NavLink>
            </li>
            {/* Chat NavLink */}
            <li>
              <NavLink to="/chat" activeClassName="font-semibold" className="nav-link">
                <FaComments className="mr-1" /> Chat
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
