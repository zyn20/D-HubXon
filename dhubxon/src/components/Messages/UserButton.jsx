import React from 'react';

const UserButton = ({ userType, onClick }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded" onClick={onClick}>
      {userType}
    </button>
  );
};

export default UserButton;
