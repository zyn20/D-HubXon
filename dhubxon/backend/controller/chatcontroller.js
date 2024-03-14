const { Op } = require('sequelize');
const Message = require('../models/message'); // adjust the path as necessary
const Client = require('../models/clientmodel'); // adjust the path as necessary
const Freelancer = require('../models/freelancermodel'); // adjust the path as necessary

// Function to send a message
exports.sendMessage = async (req, res) => {
    const { fromUserId, toUserId, content, fromUserType, toUserType } = req.body;

    try {
       
        
        const newMessage = await Message.create({
            content,
            fromUserId,
            toUserId,
            fromUserType,
            toUserType
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
                        fromUserId: userId,
                        fromUserType: userType,
                        toUserId: otherUserId,
                        toUserType: otherUserType
                    },
                    {
                        fromUserId: otherUserId,
                        fromUserType: otherUserType,
                        toUserId: userId,
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

// Use Case: Get Unread Messages
exports.getUnreadMessages = async (req, res) => {
    const { userId } = req.query;

    try {
        const unreadMessages = await Message.findAll({
            where: {
                toUserId: userId,
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

// Use Case: Search Chat History
exports.searchChatHistory = async (req, res) => {
    const { userId, keyword } = req.query;

    try {
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    {
                        content: {
                            [Op.iLike]: `%${keyword}%`
                        }
                    },
                    {
                        senderId: userId,
                        senderType: 'user'
                    }
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

// Use Case: Filter Chat History by Date Range
exports.filterChatByDateRange = async (req, res) => {
    const { userId, startDate, endDate } = req.query;

    try {
        const messages = await Message.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
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

// Additional use case: Get Chat Count
exports.getChatCount = async (req, res) => {
    try {
        const count = await Message.count();
        res.status(200).json({
            message: 'Chat count retrieved successfully',
            data: count
        });
    } catch (error) {
        console.error('Error retrieving chat count:', error);
        res.status(500).send('Error while retrieving chat count');
    }
};

// Additional use case: Delete Message
exports.deleteMessage = async (req, res) => {
    const { messageId } = req.params;

    try {
        const deletedMessage = await Message.destroy({ where: { id: messageId } });
        res.status(200).json({
            message: 'Message deleted successfully',
            data: deletedMessage
        });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).send('Error while deleting message');
    }
};

// Additional use case: Update Message
exports.updateMessage = async (req, res) => {
    const { messageId } = req.params;
    const { content } = req.body;

    try {
        const updatedMessage = await Message.update({ content }, { where: { id: messageId } });
        res.status(200).json({
            message: 'Message updated successfully',
            data: updatedMessage
        });
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).send('Error while updating message');
    }
};

// Additional use case: Get Message by ID
exports.getMessageById = async (req, res) => {
    const { messageId } = req.params;

    try {
        const message = await Message.findByPk(messageId);
        if (!message) {
            res.status(404).json({
                message: 'Message not found'
            });
        } else {
            res.status(200).json({
                message: 'Message retrieved successfully',
                data: message
            });
        }
    } catch (error) {
        console.error('Error retrieving message:', error);
        res.status(500).send('Error while retrieving message');
    }
};

// Additional use case: Mark Message as Read
exports.markMessageAsRead = async (req, res) => {
    const { messageId } = req.params;

    try {
        const updatedMessage = await Message.update({ isRead: true }, { where: { id: messageId } });
        res.status(200).json({
            message: 'Message marked as read successfully',
            data: updatedMessage
        });
    } catch (error) {
        console.error('Error marking message as read:', error);
        res.status(500).send('Error while marking message as read');
    }
};

// Additional use case: Get Chat Participants
exports.getChatParticipants = async (req, res) => {
    try {
        const participants = await Message.findAll({
            attributes: ['fromUserId', 'toUserId'],
            group: ['fromUserId', 'toUserId']
        });
        res.status(200).json({
            message: 'Chat participants retrieved successfully',
            data: participants
        });
    } catch (error) {
        console.error('Error retrieving chat participants:', error);
        res.status(500).send('Error while retrieving chat participants');
    }
};

// Additional use case: Get Message Statistics
exports.getMessageStatistics = async (req, res) => {
    try {
        const statistics = await Message.aggregate('fromUserId', 'count', { distinct: true });
        res.status(200).json({
            message: 'Message statistics retrieved successfully',
            data: statistics
        });
    } catch (error) {
        console.error('Error retrieving message statistics:', error);
        res.status(500).send('Error while retrieving message statistics');
    }
};

exports.getLastMessage = async (req, res) => {
    try {
        const lastMessage = await Message.findOne({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({
            message: 'Last message retrieved successfully',
            data: lastMessage
        });
    } catch (error) {
        console.error('Error retrieving last message:', error);
        res.status(500).send('Error while retrieving last message');
    }
};
