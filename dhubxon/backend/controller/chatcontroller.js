const { Op } = require('sequelize');
const Message = require('../models/message');
const Client = require('../models/clientmodel');
const Freelancer = require('../models/freelancermodel');

exports.sendMessage = async (req, res) => {
    const { fromUserEmail, toUserEmail, content, fromUserType, toUserType } = req.body;

    try {
        // Check if both sender and receiver exist
        const [sender, receiver] = await Promise.all([
            fromUserType === 'client' ? Client.findOne({ where: { Email: fromUserEmail } }) : Freelancer.findOne({ where: { Email: fromUserEmail } }),
            toUserType === 'client' ? Client.findOne({ where: { Email: toUserEmail } }) : Freelancer.findOne({ where: { Email: toUserEmail } })
        ]);

        if (!sender) {
            return res.status(400).json({ message: `Sender with email ${fromUserEmail} does not exist` });
        }

        if (!receiver) {
            return res.status(400).json({ message: `Receiver with email ${toUserEmail} does not exist` });
        }

        // If both sender and receiver exist, proceed to create the message
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

// exports.getChatHistory = async (req, res) => {
//     const { userEmail, userType, otherUserEmail, otherUserType } = req.query;

//     try {
//         const messages = await Message.findAll({
//             where: {
//                 [Op.or]: [
//                     { fromUserEmail: userEmail, fromUserType: userType, toUserEmail: otherUserEmail, toUserType: otherUserType },
//                     { fromUserEmail: otherUserEmail, fromUserType: otherUserType, toUserEmail: userEmail, toUserType: userType }
//                 ]
//             },
//             order: [['createdAt', 'ASC']]
//         });

//         res.status(200).json({ success: true, message: 'Chat history retrieved successfully', data: messages });
//     } catch (error) {
//         console.error('Error retrieving chat history:', error);
//         res.status(500).json({ success: false, message: 'Error while retrieving chat history', error: error.message });
//     }
// };


exports.getChatHistory = async (req, res) => {
    try {
      const { userEmail, userType, otherUserEmail, otherUserType } = req.query;
  
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { fromUserEmail: userEmail, fromUserType: userType, toUserEmail: otherUserEmail, toUserType: otherUserType },
            { fromUserEmail: otherUserEmail, fromUserType: otherUserType, toUserEmail: userEmail, toUserType: userType }
          ]
        },
        order: [['createdAt', 'ASC']] // Corrected line: Single 'order' keyword
      });
  
      res.status(200).json({ success: true, message: 'Chat history retrieved successfully', data: messages });
    } catch (error) {
      console.error('Error retrieving chat history:', error);
      res.status(500).json({ success: false, message: 'Error while retrieving chat history', error: error.message });
    }
  };
  