const { Op } = require('sequelize');
const Message = require('../models/message');
const Client = require('../models/clientmodel');
const Freelancer = require('../models/freelancermodel');

exports.sendMessage = async (req, res) => {
  const { fromUserEmail, toUserEmail, content, fromUserType, toUserType } = req.body;

  try {
      // Parallel checks for sender and receiver existence in their respective models
      const [sender, receiver] = await Promise.all([
          fromUserType === 'client'
              ? Client.findOne({ where: { Email: fromUserEmail } })
              : Freelancer.findOne({ where: { Email: fromUserEmail } }),
          toUserType === 'client'
              ? Client.findOne({ where: { Email: toUserEmail } })
              : Freelancer.findOne({ where: { Email: toUserEmail } })
      ]);

      // Validate existence of both sender and receiver
      if (!sender) {
          return res.status(400).json({ message: `Sender with email ${fromUserEmail} does not exist.` });
      }

      if (!receiver) {
          return res.status(400).json({ message: `Receiver with email ${toUserEmail} does not exist.` });
      }

      // Sender and receiver exist; proceed to create the message
      const newMessage = await Message.create({
          content,
          fromUserEmail,
          toUserEmail,
          fromUserType,
          toUserType,
          isRead: false
      });

      // Respond with success and the created message data
      res.status(200).json({
          message: 'Message sent successfully.',
          data: newMessage
      });
  } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).send('Error while sending message.');
  }
};
exports.getMessagesBetweenUsers = async (req, res) => {
    const { fromUserEmail, toUserEmail } = req.query; // Using query parameters for a GET request
  
    // Check if both emails are provided
    if (!fromUserEmail || !toUserEmail) {
      return res.status(400).json({
        message: "Both 'fromUserEmail' and 'toUserEmail' query parameters are required."
      });
    }
  
    try {
        // Fetch messages where the current user is either the sender or receiver
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { fromUserEmail: fromUserEmail, toUserEmail: toUserEmail },
                    { fromUserEmail: toUserEmail, toUserEmail: fromUserEmail } 
                ]
            },
            order: [['createdAt', 'ASC']] // Assuming you might want to order messages by creation time
        });
  
        if (messages.length > 0) {
            res.status(200).json({
                message: 'Messages retrieved successfully',
                data: messages
            });
        } else {
            res.status(404).json({ message: 'No messages found between the specified users' });
        }
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).send('Error while fetching messages');
    }
  };


  exports.deleteMessage = async (req, res) => {
    const { messageId } = req.params; // Extract the message ID from request parameters

    try {
        // Find the message by ID
        const message = await Message.findByPk(messageId);

        // Check if the message exists
        if (!message) {
            return res.status(404).json({ message: `Message with ID ${messageId} not found.` });
        }

        // Delete the message
        await message.destroy();

        // Respond with success message
        res.status(200).json({ message: 'Message deleted successfully.' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).send('Error while deleting message.');
    }
};





exports.getmsg = async (req, res) => {
    const { fromUserEmail, toUserEmail, fromUserType } = req.query;

    if (!fromUserEmail || !toUserEmail || !fromUserType) {
        return res.status(400).json({
            message: "'fromUserEmail', 'toUserEmail', and 'fromUserType' query parameters are required."
        });
    }

    try {
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { fromUserEmail: fromUserEmail, toUserEmail: toUserEmail },
                    { fromUserEmail: toUserEmail, toUserEmail: fromUserEmail }
                ]
            },
            order: [['createdAt', 'ASC']]
        });

        const userEmails = messages.map(msg => msg.fromUserEmail);
        const uniqueUserEmails = [...new Set(userEmails)];

        let user;
        if (fromUserType === 'freelancer') {
            user = await Freelancer.findOne({ 
                where: { Email: fromUserEmail }, 
                attributes: ['Email', 'Name'] 
            });
        } else {
            user = await Client.findOne({ 
                where: { Email: fromUserEmail }, 
                attributes: ['Email', 'Name'] 
            });
        }

        const enrichedMessages = messages.map(message => ({
            ...message.toJSON(),
            fromUserName: user ? user.Name : 'Unknown User'
        }));

        if (messages.length > 0) {
            res.json({
                message: 'Messages retrieved successfully',
                data: enrichedMessages
            });
        } else {
            res.status(404).json({ message: 'No messages found between the specified users' });
        }
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).send('Error while fetching messages');
    }
};