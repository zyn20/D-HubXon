import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const MessageBox = ({ selectedUser,addMessageToChat }) => {
  const [message, setMessage] = useState('');
 

  const sendMessage = async () => {
    if (!message.trim()) return;
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    const decodedToken = jwtDecode(token);
    // Determine fromUserEmail and fromUserType based on the token's payload
    let fromUserEmail, fromUserType;
    if (decodedToken.freelancerData) {
      fromUserEmail = decodedToken.freelancerData.email;
      fromUserType = 'freelancer'; // Assuming role needs to be either 'client' or 'freelancer'
    } else if (decodedToken.clientData) {
      fromUserEmail = decodedToken.clientData.email;
      fromUserType = 'client';
    } else {
      console.error('Invalid token data');
      return;
    }
  
    const toUserEmail = selectedUser.Email; // Make sure this matches your UserList component
    const toUserType = selectedUser.userType; // Make sure this matches your UserList component
    console.log('TO: ', toUserEmail);
    console.log('From',fromUserEmail);
    console.log('UserType To',toUserType);
    console.log('UserType From',fromUserType);


  
    const messageData = {
      content: message,
      fromUserEmail,
      toUserEmail,
      fromUserType,
      toUserType
    };
  



    try {
      const response = await fetch('http://127.0.0.1:5000/message/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Assuming your backend expects a Bearer token
        },
        body: JSON.stringify(messageData)
      });
  
      if (!response.ok) {
        throw new Error('Message sending failed');
      }
  
      const result = await response.json();
      addMessageToChat(result.data)
      console.log('Hello Jawad',result);
      setMessage(''); // Clear the message input after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  

  return (
    <div className="message-box p-4">
      <textarea
        className="message-input w-full p-2 border rounded mb-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button
        className="send-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default MessageBox;

