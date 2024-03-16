const { Op } = require('sequelize');
const Message = require('../models/message');
const Client = require('../models/clientmodel');
const Freelancer = require('../models/freelancermodel');

// Function to send a message
exports.sendMessage = async (req, res) => {
    const { fromUserEmail, toUserEmail, content, fromUserType, toUserType } = req.body;

    try {
        const newMessage = await Message.create({
            content,
            fromUserEmail,
            toUserEmail,
            fromUserType,
            toUserType,
            isRead: false
        });

        res.status(200).json({
            message: 'Message sent successfully',
            data: newMessage
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Error while sending message');
    }
};

// Function to get chat history between two users
exports.getChatHistory = async (req, res) => {
    const { userId, userType, otherUserId, otherUserType } = req.query;

    try {
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    {
                        fromUserEmail: userId,
                        fromUserType: userType,
                        toUserEmail: otherUserId,
                        toUserType: otherUserType
                    },
                    {
                        fromUserEmail: otherUserId,
                        fromUserType: otherUserType,
                        toUserEmail: userId,
                        toUserType: userType
                    }
                ]
            },
            order: [['createdAt', 'ASC']]
        });

        res.status(200).json({
            message: 'Chat history retrieved successfully',
            data: messages
        });
    } catch (error) {
        console.error('Error retrieving chat history:', error);
        res.status(500).send('Error while retrieving chat history');
    }
};

// Function to get unread messages for a user
exports.getUnreadMessages = async (req, res) => {
    const { userId } = req.query;

    try {
        const unreadMessages = await Message.findAll({
            where: {
                toUserEmail: userId,
                isRead: false
            }
        });

        res.status(200).json({
            message: 'Unread messages retrieved successfully',
            data: unreadMessages
        });
    } catch (error) {
        console.error('Error retrieving unread messages:', error);
        res.status(500).send('Error while retrieving unread messages');
    }
};

// Function to search chat history by keyword
exports.searchChatHistory = async (req, res) => {
    const { userId, keyword } = req.query;

    try {
        const messages = await Message.findAll({
            where: {
                [Op.and]: [
                    { [Op.or]: [{ fromUserEmail: userId }, { toUserEmail: userId }] },
                    { content: { [Op.iLike]: `%${keyword}%` } }
                ]
            }
        });

        res.status(200).json({
            message: 'Chat history retrieved successfully',
            data: messages
        });
    } catch (error) {
        console.error('Error searching chat history:', error);
        res.status(500).send('Error while searching chat history');
    }
};

// Function to filter chat history by date range
exports.filterChatByDateRange = async (req, res) => {
    const { userId, startDate, endDate } = req.query;

    try {
        const messages = await Message.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                },
                [Op.or]: [{ fromUserEmail: userId }, { toUserEmail: userId }]
            }
        });

        res.status(200).json({
            message: 'Chat history filtered by date range successfully',
            data: messages
        });
    } catch (error) {
        console.error('Error filtering chat history by date range:', error);
        res.status(500).send('Error while filtering chat history by date range');
    }
};

// Add more API functions as needed based on your use case requirements
