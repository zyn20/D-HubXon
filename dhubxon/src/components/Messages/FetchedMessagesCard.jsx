import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const FetchedMessagesCard = ({ selectedUser }) => {
    const [chatMessages, setChatMessages] = useState({ data: [] });
  const [loading, setLoading] = useState(false);

 

  useEffect(() => {
    const fetchChatMessages = async () => {
      const token = localStorage.getItem('token');
      if (!token || !selectedUser) {
        console.error('No token found or no user selected');
        return;
      }
      const decodedToken = jwtDecode(token);
      const fromUserEmail = decodedToken?.freelancerData?.email || decodedToken?.clientData?.email;
      console.log(fromUserEmail);
      if (!fromUserEmail) {
        console.error('Invalid token data');
        return;
      }
      const toUserEmail = selectedUser.Email;
      console.log(toUserEmail);

      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/message/fetch-chat?fromUserEmail=${fromUserEmail}&toUserEmail=${toUserEmail}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chat messages');
        }

        const messages = await response.json();
        //console.log(messages);
        setLoading(false);
        setChatMessages(messages);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching chat messages:', error);
      }
    };

    fetchChatMessages();
  }, [selectedUser]);

  if (loading) {
    return <p>Loading messages...</p>;
  }

return (
    <div className="fetched-messages-container">
    {chatMessages.data.map((msg, index) => (
      <div key={index} className="message-card bg-gray-100 shadow-md rounded-lg p-4 mb-4">
        <div className=''>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="user-icon text-gray-600 mr-2" />
            <p className="user-name text-lg font-semibold text-gray-900"></p>
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


