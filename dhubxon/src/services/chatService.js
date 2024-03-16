import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Adjust according to your API base URL

export const fetchClientsAndFreelancers = async () => {
    try {
        const [clientsResponse, freelancersResponse] = await Promise.all([
            axios.get(`${API_BASE_URL}/client/clients`),
            axios.get(`${API_BASE_URL}/freelancer/freelancers`),
        ]);
        return {
            clients: clientsResponse.data.data,
            freelancers: freelancersResponse.data.data,
        };
    } catch (error) {
        console.error('Error fetching clients and freelancers:', error);
        throw error;
    }
};

export const sendMessage = async (messageData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/message/send`, messageData);
        return response.data.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const fetchChatHistory = async ({ userId, userType, otherUserId, otherUserType }) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/message/history`, {
            params: { userId, userType, otherUserId, otherUserType },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching chat history:', error);
        throw error;
    }
};

// Implement other functions as needed (e.g., getUnreadMessages, searchChatHistory, filterChatByDateRange)
