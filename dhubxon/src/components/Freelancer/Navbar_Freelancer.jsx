import React, { useEffect, useState } from 'react';
import CircularButton from './separate_components/CircularButton';
import profile_img from '../../assets/profile image.png';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { IoMdMenu } from 'react-icons/io';
import { FaComments } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from "axios";


import Swal from 'sweetalert2'
import { FaCaretDown } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileURL, setProfileURL] = useState("");
  const [isSubscriptionDropdownOpen, setIsSubscriptionDropdownOpen] = useState(false); // State to manage subscription dropdown visibility

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSubscriptionDropdownToggle = () => {
    setIsSubscriptionDropdownOpen(!isSubscriptionDropdownOpen);
  };

 


  const handleButtonClick = () => {
  };
  const handleLogout = () => {
  
    localStorage.removeItem("token");
    Swal.fire({
      title: "Done!",
      text: "Logged Out Successfully.",
      icon: "success"
    });
    navigate('/login');

  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const response = await axios.get(
        "http://127.0.0.1:5000/freelancer/fetchprofileurl",
        { params: { Email: decodedToken.freelancerData.email } }
      );
      setProfileURL(response.data);
    };
    fetchData();
  }, []);

  return (
    <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900 font-poppins navbar-with-shadow py-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <NavLink to="#" className="flex items-center">
          <img src={logo} className="h-6 mr-3 sm:h-9" alt="Logo" />
        </NavLink>

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
            <li className="flex items-center">
              <NavLink to="/freelancer/chat" activeClassName="font-semibold" className="nav-link flex items-center">
                <FaComments className="mr-1" /> Chat
              </NavLink>
            </li>

            <li className="relative">
              <button onClick={handleSubscriptionDropdownToggle} className="nav-link flex items-center cursor-pointer">
                Subscriptions <FaCaretDown className="ml-1" />
              </button>
              {isSubscriptionDropdownOpen && (
                <ul className="absolute left-0 w-48 mt-2 py-2 bg-white border rounded shadow-xl">
                  <li>
                    <NavLink to="/freelancer/pricing-freelance-services?type=Freelance" className="block px-4 py-2 hover:bg-gray-100">Freelance Subscriptions</NavLink>
                  </li>
                  <li>
                    <NavLink to="/freelancer/pricing-healthcare?type=Healthcare" className="block px-4 py-2 hover:bg-gray-100">Healthcare Subscriptions</NavLink>
                  </li>
                </ul>
              )}
            </li>


            <li>
            <button onClick={handleLogout} className="nav-link cursor-pointer">
              Logout
            </button>
          </li>
          <li className="flex items-center">
              <NavLink to="/freelancer/set-profile" activeClassName="font-semibold" className="nav-link flex items-center">
                Profile
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
          <CircularButton  imageUrl={profileURL} altText="profile_image" onClick={handleButtonClick} />
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
