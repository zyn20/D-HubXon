import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

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

      // Decode the JWT token to get the current user's email
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
      <div key={index} className={`message is from ${msg.fromUserEmail} $`}>
        <p>Message is From ${msg.fromUserEmail}</p>
        {msg.content}

      </div>
    ))}
  </div>
  );
  
      };
export default FetchedMessagesCard;


