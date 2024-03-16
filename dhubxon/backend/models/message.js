const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Client = require('./clientmodel');
const Freelancer = require('./freelancermodel');

const Message = sequelize.define('Message', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fromUserEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  toUserEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fromUserType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  toUserType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
});

// Define associations for messages sent by clients
Client.hasMany(Message, { foreignKey: 'fromUserEmail', sourceKey: 'Email', constraints: false, as: 'sentMessages' });

// Define associations for messages received by clients
Client.hasMany(Message, { foreignKey: 'toUserEmail', sourceKey: 'Email', constraints: false, as: 'receivedMessages' });

// Define associations for messages sent by freelancers
Freelancer.hasMany(Message, { foreignKey: 'fromUserEmail', sourceKey: 'Email', constraints: false, as: 'sentMessages' });

// Define associations for messages received by freelancers
Freelancer.hasMany(Message, { foreignKey: 'toUserEmail', sourceKey: 'Email', constraints: false, as: 'receivedMessages' });

// Define associations for sender
Message.belongsTo(Client, { foreignKey: 'fromUserEmail', targetKey: 'Email', constraints: false, as: 'clientSender', scope: { fromUserType: 'client' }});
Message.belongsTo(Freelancer, { foreignKey: 'fromUserEmail', targetKey: 'Email', constraints: false, as: 'freelancerSender', scope: { fromUserType: 'freelancer' }});

// Define associations for receiver
Message.belongsTo(Client, { foreignKey: 'toUserEmail', targetKey: 'Email', constraints: false, as: 'clientReceiver', scope: { toUserType: 'client' }});
Message.belongsTo(Freelancer, { foreignKey: 'toUserEmail', targetKey: 'Email', constraints: false, as: 'freelancerReceiver', scope: { toUserType: 'freelancer' }});

module.exports = Message;
