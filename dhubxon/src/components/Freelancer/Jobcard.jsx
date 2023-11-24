import React from 'react';
import { FaClock, FaTag, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';

const Jobcard = ({ 
  title, 
  description, 
  projectType, 
  price, 
  projectTime, 
  location, 
  budget, 
  keywords, 
  onClick ,
}) => {
  return (
    <div
      className="bg-blue-50 p-4 rounded-md mb-4 shadow-md cursor-pointer hover:bg-blue-200 transition duration-200"
      onClick={() => onClick({ title, description })}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <FaMapMarkerAlt className="mr-2" /> {location}
      </div>
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <FaClock className="mr-2" /> Posted {projectTime}
      </div>
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <FaTag className="mr-2" /> {projectType}
      </div>
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <FaMoneyBillWave className="mr-2" /> Budget: {budget}
      </div>
      <p className="text-gray-600 text-sm mb-2">Price: {price}</p>
      <div className="flex flex-wrap items-center text-gray-600 text-sm">
        {keywords.map((keyword, index) => (
          <span key={index} className="mr-2 mb-2 bg-blue-900 text-white rounded-full px-3 py-1">{keyword}</span>
        ))}
      </div>
    </div>
  );
};

export default Jobcard;
