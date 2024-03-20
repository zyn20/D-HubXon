import React, { useState } from 'react';
import Stars from "./stars.png";

const TaskCard = ({ id, title, description, imageSrc,onDelete,onEdit }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Toggle the full description view
  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  // Truncate description if it is too long
  const truncateDescription = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    // console.log('Attempting to log ID:', id);
    
    // Debugging line
    onEdit(id);
  };

  const handleDeleteClick = (event) => {
    event.preventDefault(); // Prevent the default anchor action
    onDelete(id); // Call the onDelete function passed as a prop
  };


  // Toggle the dropdown open/close
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 relative">
      <div className="flex justify-center items-start">
        <img 
          className="mb-4" 
          src={imageSrc} 
          alt="Task"
          style={{ width: '250px', height: '200px', objectFit: 'cover' }}
        />
      </div>
      <div className="text-center">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="stars-container flex justify-center mb-2">
          {[1, 2, 3, 4, 5].map((index) => (
            <img key={index} src={Stars} alt={`Star ${index}`} style={{ width: '9%' }} />
          ))}
        </div>
        <p className="text-gray-700 text-base mb-4">
          {showFullDescription ? description : truncateDescription(description, 100)}
        </p>
        <button 
          onClick={toggleDescription} 
          className="text-blue-500 hover:text-blue-800 text-sm"
        >
          {showFullDescription ? 'Show Less' : 'Show More'}
        </button>
      </div>
      <div className="absolute top-0 right-0">
        <button 
          onClick={toggleDropdown} 
          className="text-gray-700 p-2 rounded-md focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-8 py-2 w-48 bg-white rounded-md shadow-lg z-50">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleEditClick}>View Purchases</a>
            <a 
            href="#" 
            onClick={handleDeleteClick} // Use handleDeleteClick to handle the click event
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Delete
          </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

