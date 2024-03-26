

import React, { useState } from 'react';
import { HiOutlineDocumentText } from 'react-icons/hi';
import GenReq from '../components/SubscribeButtons/Genreq'; 
import HealthReq from '../components/SubscribeButtons/HealthReq'; 

const ValidatorDashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const renderGeneralRequests = () => {
        setSelectedComponent(<GenReq />);
    };

    const renderHealthRequests = () => {
        setSelectedComponent(<HealthReq />);
    };

    return (
        <div className="flex">
            <aside className="z-20 flex-shrink-0 hidden w-60 pl-2 overflow-y-auto bg-blue-600 md:block">
                <div className="text-white">
                    <div className="flex p-2 bg-blue-600">
                        <div className="flex py-3 px-2 items-center">
                            <p className="text-2xl text-white font-semibold">DHUBXON</p>
                        </div>
                    </div>
                    <div>
                        <ul className="mt-6 leading-10">
                            <li className="relative px-2 py-1">
                                <a className="inline-flex items-center w-full text-sm font-semibold text-white transition-colors duration-150 cursor-pointer hover:text-green-500" 
                                    href="#" onClick={renderGeneralRequests}>
                                    <HiOutlineDocumentText className="h-6 w-6 mr-4" />
                                    <span>General Requests</span>
                                </a>
                            </li>
                            <li className="relative px-2 py-1">
                                <div className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500  hover:text-yellow-400 cursor-pointer" onClick={renderHealthRequests}>
                                    <span className="inline-flex items-center text-sm font-semibold text-white hover:text-green-400">
                                        <HiOutlineDocumentText className="h-6 w-6 mr-4" />
                                        <span>Health Requests</span>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
            <main className="flex-1 bg-gray-200 p-6">
                {/* Conditional rendering of selected component */}
                {selectedComponent}
            </main>
        </div>
    );
};

export default ValidatorDashboard;
