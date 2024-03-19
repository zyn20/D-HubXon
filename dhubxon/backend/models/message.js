const { DataTypes } = require('sequelize');
const sequelize = require('../config');

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


module.exports = Message;
