


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';






// Adjust the props to include chatMessages
const FetchedMessagesCard = ({ selectedUser, chatMessages, UserName}) => {
  // Use the UserName directly from the selectedUser prop if available
  const userName = UserName;

  if (!chatMessages.data.length) {
    return <p>No messages to display.</p>; // Show a message if no chat data
  }

  return (
    <div className="fetched-messages-container">
      {chatMessages.data.map((msg, index) => (
        <div key={index} className="message-card bg-gray-100 shadow-md rounded-lg p-4 mb-4">
          <div className=''>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="user-icon text-gray-600 mr-2" />
              {/* Use the userName for displaying the user's name */}
              <p className="user-name text-lg font-semibold text-gray-900">{msg.fromUserName}</p>
            </div>
          </div>
          <div className="message-content mt-2">
            <p className="message-text text-gray-800">{msg.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchedMessagesCard;
