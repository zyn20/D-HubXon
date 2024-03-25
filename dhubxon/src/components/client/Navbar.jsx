import React, { useState,useRef,useEffect } from 'react';
import CircularButton from '../../components/Freelancer/separate_components/CircularButton';

import { NavLink , Link} from 'react-router-dom';
import logo from '../../assets/logo.png';
import { IoMdMenu } from 'react-icons/io';
import { FaComments } from 'react-icons/fa'; // Import the chat icon
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import {jwtDecode} from 'jwt-decode';
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [profileURL, setProfileURL] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownAnchorRef = useRef(null);
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const response = await axios.get(
        "http://127.0.0.1:5000/client/fetchprofileurl",
        { params: { Email: decodedToken.clientData.email } }
      );
      // console.log("Navbar Imag
      setProfileURL(response.data);
    };
    fetchData();
  }, []);


  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    Swal.fire({
      title: "Done!",
      text: "Logged Out Successfully.",
      icon: "success"
    });
    console.log("Token has been Removed");
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
            <NavLink to="/proposals" activeClassName="font-semibold" className="nav-link">
              Proposals
            </NavLink>
          </li>
            <li>
              <NavLink to="/client/chat" activeClassName="font-semibold" className="nav-link">
               Chat
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
            {/* Replace the image source below with your profile image */}
            <img src={profileURL} alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" onClick={handleDropdownToggle} />

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                <Link to="/client/set-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
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
