import React from "react";

const DataForClaim = ({ onClose }) => {
  // Implement your form logic here

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl">
      {/* Your form elements go here */}
      <h2 className="text-2xl font-bold mb-4">Claim Form</h2>
      {/* Add form elements here */}
      <button
        onClick={onClose}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Close
      </button>
    </div>
  );
};

export default DataForClaim;
