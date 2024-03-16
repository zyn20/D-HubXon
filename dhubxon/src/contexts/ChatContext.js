import React, { createContext, useState, useEffect, useContext } from 'react'; // Corrected imports
import * as chatService from '../services/chatService'; // Make sure this is at the top with other imports

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
            try {
                const { clients, freelancers } = await chatService.fetchClientsAndFreelancers();
                const combinedUsers = [...clients, ...freelancers].map(user => ({
                    ...user,
                    userType: user.hasOwnProperty('clientData') ? 'client' : 'freelancer',
                }));
                setUsers(combinedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const sendMessage = async (messageData) => {
        try {
            const newMessage = await chatService.sendMessage(messageData);
            setMessages(prevMessages => [...prevMessages, newMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <ChatContext.Provider value={{
            selectedUser,
            messages,
            users,
            sendMessage,
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext;
