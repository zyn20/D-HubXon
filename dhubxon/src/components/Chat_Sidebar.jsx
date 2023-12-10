

  import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComment } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const dummyUsers = [
        { id: 1, name: 'Client 1' },
        { id: 2, name: 'Client 2' },
        { id: 3, name: 'Freelancer 1' },
      ];
    
      const dummyChats = [
        { id: 1, user: 'Client 1', lastMessage: 'Hello there!' },
        { id: 2, user: 'Client 2', lastMessage: 'How are you?' },
        { id: 3, user: 'Freelancer 1', lastMessage: 'Ready to work?' },
        // Existing dummy chats
      ];

  return (
    <div className="w-1/4 bg-gray-200 p-4 space-y-6 overflow-y-auto custom-scrollbar">
      <div className="rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold mb-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">Users</h2>
        {dummyUsers.map((user) => (
          <div key={user.id} className="flex items-center space-x-2 mb-2 px-4 py-2 hover:bg-gray-300 rounded-md transition duration-300">
            <img src={`avatar_${user.id}.png`} alt="avatar" className="w-6 h-6 rounded-full" />
            <FontAwesomeIcon icon={faUser} className="text-blue-500" />
            <span className="font-medium">{user.name}</span>
          </div>
        ))}
      </div>
      <div className="rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold mb-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">Chats</h2>
        {dummyChats.map((chat) => (
          <div key={chat.id} className="flex items-center space-x-2 mb-2 px-4 py-2 hover:bg-gray-300 rounded-md transition duration-300">
            <FontAwesomeIcon icon={faComment} className="text-green-500" />
            <div>
              <span className="font-semibold">{chat.user}</span>
              <p className="text-gray-500">{chat.lastMessage}</p>
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">New</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

