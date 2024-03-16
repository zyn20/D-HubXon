import React, { useState, useEffect } from 'react';
import { useChat } from '../contexts/ChatContext'; // Import useChat hook
import * as chatService from '../services/chatService'; // Import chat service

const ChatArea = () => {
    const [messageContent, setMessageContent] = useState('');
    const { selectedUser, messages, setMessages, sendMessage } = useChat(); // Destructure needed states and functions from context

    useEffect(() => {
        if (selectedUser) {
            // Assuming a fetchChatHistory function is implemented in chatService and integrated into useChat
            // This is where you would call it to fetch and display the chat history with the selected user
            console.log('Fetching chat history with', selectedUser);
        }
    }, [selectedUser]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!messageContent.trim()) return; // Prevent sending empty messages

        // Prepare message data based on your backend requirements
        const messageData = {
            fromUserEmail: 'currentUser@example.com', // This should be dynamically set based on the current user
            toUserEmail: selectedUser.email,
            content: messageContent,
            fromUserType: 'client', // Adjust according to the current user's role
            toUserType: selectedUser.userType,
        };

        // Use sendMessage from ChatContext which should internally use chatService to send the message
        await sendMessage(messageData);

        setMessageContent(''); // Clear input field after sending
    };

    return (
        <div className="flex flex-col h-full bg-gray-200">
            <div className="flex-grow overflow-auto p-4">
                {/* Render chat messages here */}
                {messages.map((message, index) => (
                    <div key={index} className="mb-2">
                        <span className="font-bold">{message.fromUserEmail}: </span>
                        <span>{message.content}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex items-center justify-between p-2 border-t">
                <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow px-4 py-2 mr-2 border rounded-lg focus:outline-none"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">Send</button>
            </form>
        </div>
    );
};

export default ChatArea;
