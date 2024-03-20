import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserButton = ({ userType, onClick }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded flex items-center space-x-2 mb-5" onClick={onClick}>
      <FontAwesomeIcon icon={faUser} className="text-xl" />
      <span>{userType}</span>
    </button>
  );
};

export default UserButton;
