

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserList = ({ users, handleUserClick, selectedUser }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-full overflow-y-auto custom-scrollbar">
        <div className="rounded-lg shadow-xl">
          <div className="divide-y divide-gray-300">
            {users.map((user) => (
              <div key={user.Email} className={`flex items-center space-x-4 py-3 px-4 hover:bg-gray-100 cursor-pointer transition duration-300 ${selectedUser && selectedUser.Email === user.Email ? 'bg-gray-100' : ''}`} onClick={() => handleUserClick(user)}>
                <FontAwesomeIcon icon={faUser} className="text-blue-500 text-lg" />
                <span className="text-gray-800 font-medium overflow-hidden whitespace-nowrap">{user.Name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
