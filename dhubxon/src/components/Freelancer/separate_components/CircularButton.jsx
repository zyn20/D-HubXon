import React from 'react';

const CircularButton = ({ imageUrl, altText, onClick }) => {
  return (
    <button
      className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none focus:border-blue-500"
      onClick={onClick}
    >
    
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-cover"
      />
    </button>
    
  );
};

export default CircularButton;
