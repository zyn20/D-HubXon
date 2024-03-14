const { Op } = require('sequelize');
const Message = require('../models/message'); // adjust the path as necessary
const Client = require('../models/clientmodel'); // adjust the path as necessary
const Freelancer = require('../models/freelancermodel'); // adjust the path as necessary

// Function to send a message
exports.sendMessage = async (req, res) => {
    const { fromUserId, toUserId, content, fromUserType, toUserType } = req.body;

    try {
        // You can add additional logic here to validate the sender and recipient
        
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
