const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Client = require('./clientmodel');
const Freelancer = require('./freelancermodel');

const Message = sequelize.define('Message', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fromUserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  toUserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fromUserType: {
    type: DataTypes.ENUM('client', 'freelancer'),
    allowNull: false,
  },
  toUserType: {
    type: DataTypes.ENUM('client', 'freelancer'),
    allowNull: false,
  },
});

// Define associations for messages sent by clients
Client.hasMany(Message, { foreignKey: 'fromUserId', constraints: false, as: 'sentMessages' });

// Define associations for messages received by clients
Client.hasMany(Message, { foreignKey: 'toUserId', constraints: false, as: 'receivedMessages' });

// Define associations for messages sent by freelancers
Freelancer.hasMany(Message, { foreignKey: 'fromUserId', constraints: false, as: 'sentMessages' });

// Define associations for messages received by freelancers
Freelancer.hasMany(Message, { foreignKey: 'toUserId', constraints: false, as: 'receivedMessages' });

// Define associations for sender
Message.belongsTo(Client, { foreignKey: 'fromUserId', constraints: false, as: 'clientSender', scope: { fromUserType: 'client' }});
Message.belongsTo(Freelancer, { foreignKey: 'fromUserId', constraints: false, as: 'freelancerSender', scope: { fromUserType: 'freelancer' }});

// Define associations for receiver
Message.belongsTo(Client, { foreignKey: 'toUserId', constraints: false, as: 'clientReceiver', scope: { toUserType: 'client' }});
Message.belongsTo(Freelancer, { foreignKey: 'toUserId', constraints: false, as: 'freelancerReceiver', scope: { toUserType: 'freelancer' }});

module.exports = Message;
