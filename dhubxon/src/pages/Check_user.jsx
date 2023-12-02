// Check.js

import React from 'react';

const Check = ({ onSelect }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Choose your role:</h2>
        <div className="space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => onSelect('Freelancer')}
          >
            Freelancer
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => onSelect('Client')}
          >
            Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default Check;
