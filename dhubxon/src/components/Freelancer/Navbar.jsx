import React, { useState } from 'react';
import CircularButton from './separate_components/CircularButton';
import profile_img from '../../assets/profile image.png';
import { Link,NavLink } from 'react-router-dom';
//import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <nav className=" bg-white border-gray-200  dark:bg-gray-900 font-poppins navbar-with-shadow py-4">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <Link to="/" className="flex items-center">
          <img src="https://www.svgrepo.com/show/499962/music.svg" className="h-6 mr-3 sm:h-9" alt="Landwind Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">D-HubXon</span>
        </Link>
        <div className="flex items-center lg:order-2">
          <div className="hidden mt-2 mr-4 sm:inline-block">
            <span></span>
          </div>
          
          <CircularButton imageUrl={profile_img} altText="profile_image" onClick={handleButtonClick} />
          <button
            onClick={handleMobileMenuToggle}
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
            </svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div class="hidden md:flex items-center justify-center">
        <div class="relative shadow-md max-w-2xl mx-auto">
    <input
      type="text"
      placeholder="Search for jobs..."
      class="w-96 pl-4 pr-10 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <button class="absolute inset-y-0 right-0 px-4 py-2 bg-blue-900 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01"></path>
      </svg>
    </button>
</div>

</div>
        <div className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>

              <NavLink to="/" className=" font-semibold block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 hover:text-purple-700 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/find-work" className="font-semibold block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 hover:text-purple-700 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                Find Work
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-jobs" className="font-semibold block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 hover:text-purple-700 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                My Jobs
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" className="font-semibold block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 hover:text-purple-700 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                Reports
              </NavLink>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
