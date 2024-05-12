// Import Sequelize and the Freelancer model
const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Freelancer = require('../models/freelancermodel');

// Define the Subscription model
const Subscription = sequelize.define('Subscription', {
  subscriptionType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subscribed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  tenure: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deductionAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  packageType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  useremail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  BLOCKCHAININDEX: {
    type: DataTypes.STRING,
    allowNull: false
  }

});



module.exports = Subscription;
