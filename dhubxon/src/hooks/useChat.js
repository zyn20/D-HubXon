import React, { createContext, useContext, useState, useEffect } from 'react';
import * as chatService from '../services/chatService';

const ChatContext = createContext(); // Create a chat context

// Custom hook for consuming chat context
export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};

export const ChatProvider = ({ children }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            // Your fetch logic here
        };
        fetchUsers();
    }, []);

    const sendMessage = async (messageData) => {
        // Your sendMessage logic here
    };

    // Other context properties and functions

    return (
        <ChatContext.Provider value={{
            selectedUser,
            setSelectedUser,
            messages,
            setMessages,
            users,
            sendMessage,
            // Add other values you want to provide through context here
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext;
