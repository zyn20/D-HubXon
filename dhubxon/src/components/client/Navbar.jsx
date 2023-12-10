import React, { useState } from 'react';
import CircularButton from '../../components/Freelancer/separate_components/CircularButton';
import profile_img from '../../assets/profile image.png';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { IoMdMenu } from 'react-icons/io';
import { FaComments } from 'react-icons/fa'; // Import the chat icon
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  const handleLogout = () => {
    // Perform logout actions, e.g., clear user session, redirect to login page
    // For now, let's simulate a logout by redirecting to the login page
    navigate('/login');
  };

  return (
    <nav className="bg-green-500 border-gray-200 dark:bg-green-700 font-poppins navbar-with-shadow py-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <NavLink to="#" className="flex items-center">
          <img src={logo} className="h-6 mr-3 sm:h-9" alt="Logo" />
        </NavLink>

        {/* Centered NavLinks for Desktop */}
        <div className="hidden lg:flex lg:justify-center">
          <ul className="flex mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <NavLink to="/client" activeClassName="font-semibold" className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/client/postproject" activeClassName="font-semibold" className="nav-link">
                Post Project
              </NavLink>
            </li>
            <li>
              <NavLink to="/client/progress" activeClassName="font-semibold" className="nav-link">
                Progress
              </NavLink>
            </li>
            <li>
              <NavLink to="/client/chat" activeClassName="font-semibold" className="nav-link">
               Chat
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-link cursor-pointer">
                Logout
              </button>
            </li>
            <li>
            <NavLink to="/client/set-profile" activeClassName="font-semibold" className="nav-link">
               Profile
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Mobile Menu for smaller screens */}
        <div className="flex items-center lg:order-2">
          <button
            onClick={handleMobileMenuToggle}
            className="lg:hidden p-2 ml-1 text-sm text-gray-100 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-200 dark:text-gray-400 dark:hover:bg-green-800 dark:focus:ring-green-600"
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
              <NavLink to="/client" activeClassName="font-semibold" className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/client/post-project" activeClassName="font-semibold" className="nav-link">
                Post Project
              </NavLink>
            </li>
            <li>
              <NavLink to="/client/progress" activeClassName="font-semibold" className="nav-link">
                Progress
              </NavLink>
            </li>
            <li>
              <NavLink to="/client/chat" activeClassName="font-semibold" className="nav-link">
                <FaComments className="mr-1" /> Chat
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-link cursor-pointer">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
