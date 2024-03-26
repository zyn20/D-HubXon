



import React, { useState } from 'react';
import { HiOutlineDocumentText, HiOutlineUserCircle } from 'react-icons/hi'; // Importing icons from react-icons library

const ValidatorDashboard = () => {
    // State for managing sidebar open/close
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    // Function to toggle sidebar open/close
    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    };

    // Function to close sidebar
    const closeSideMenu = () => {
        setIsSideMenuOpen(false);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="z-20 flex-shrink-0 hidden w-60 pl-2 overflow-y-auto bg-blue-600 md:block">
                <div className="text-white">
                    {/* Logo and Dashboard title */}
                    <div className="flex p-2 bg-blue-600">
                        <div className="flex py-3 px-2 items-center">
                            <p className="text-2xl text-white font-semibold">DHUBXON</p>
                        </div>
                    </div>
                    {/* User profile section */}
                    <div className="flex justify-center">
                        <div>
                            <HiOutlineUserCircle className="hidden h-24 w-24 sm:block text-white" />
                            <p className="font-bold text-base text-gray-400 pt-2 text-center w-24">Zain</p>
                        </div>
                    </div>
                    {/* Sidebar menu items */}
                    <div>
                        <ul className="mt-6 leading-10">
                            {/* Dashboard item */}
                            <li className="relative px-2 py-1">
                                <a className="inline-flex items-center w-full text-sm font-semibold text-white transition-colors duration-150 cursor-pointer hover:text-green-500" 
                                    href="#">
                                    <HiOutlineDocumentText className="h-6 w-6 mr-4" />
                                    <span>General Requests</span>
                                </a>
                            </li>
                            {/* Item section with submenu */}
                            <li className="relative px-2 py-1">
                                <div className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500  hover:text-yellow-400 cursor-pointer">
                                    <span className="inline-flex items-center text-sm font-semibold text-white hover:text-green-400">
                                        <HiOutlineDocumentText className="h-6 w-6 mr-4" />
                                        <span>Subscriptions Requests</span>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 bg-gray-200 p-6">
                <div className="bg-white rounded-lg shadow-lg p-6 mt-3">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">Main Content Area</h1>
                    <p className="text-gray-600">
                        This is the main content area. You can add your components, data, or any other content here.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mt-3">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">Main Content Area</h1>
                    <p className="text-gray-600">
                        This is the main content area. You can add your components, data, or any other content here.
                    </p>
                </div>

                

                <div className="bg-white rounded-lg shadow-lg p-6 mt-3">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">Main Content Area</h1>
                    <p className="text-gray-600">
                        This is the main content area. You can add your components, data, or any other content here.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mt-3">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">Main Content Area</h1>
                    <p className="text-gray-600">
                        This is the main content area. You can add your components, data, or any other content here.
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 mt-3">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">Main Content Area</h1>
                    <p className="text-gray-600">
                        This is the main content area. You can add your components, data, or any other content here.
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 mt-3">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">Main Content Area</h1>
                    <p className="text-gray-600">
                        This is the main content area. You can add your components, data, or any other content here.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mt-3">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">Main Content Area</h1>
                    <p className="text-gray-600">
                        This is the main content area. You can add your components, data, or any other content here.
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 mt-3">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">Main Content Area</h1>
                    <p className="text-gray-600">
                        This is the main content area. You can add your components, data, or any other content here.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default ValidatorDashboard;
