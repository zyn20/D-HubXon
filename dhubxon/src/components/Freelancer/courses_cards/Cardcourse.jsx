import React, { useState } from 'react';
import Stars from "./stars.png";

const TaskCard = ({ title, description, imageSrc }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Show the dropdown when hovering over the button
  const handleMouseEnter = () => setDropdownOpen(true);

  // Hide the dropdown when not hovering over the button or the dropdown
  const handleMouseLeave = () => setDropdownOpen(false);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 relative">
      <div className="flex justify-between items-start">
        <img className="w-full mb-4" src={imageSrc} alt="Task" />
        <div className="relative" onMouseLeave={handleMouseLeave}>
          <button onMouseEnter={handleMouseEnter} className="text-gray-700 p-2 rounded-md focus:outline-none z-10">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-0 mt-8 py-2 w-48 bg-white rounded-md shadow-lg z-50">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete</a>
            
            </div>
          )}
        </div>
      </div>
      <div className="text-center">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="stars-container flex justify-center">
          {[1, 2, 3, 4, 5].map((index) => (
            <img key={index} src={Stars} alt={`Star ${index}`} style={{ width: '9%' }} />
          ))}
        </div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
