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
  }
});

// Define associations for subscriptions owned by freelancers
Freelancer.hasMany(Subscription, {
  foreignKey: 'useremail', // Name of the foreign key column in the Subscription table
  sourceKey: 'Email', // Name of the referenced column in the Freelancer table
  constraints: false, // Enforce foreign key constraints at the database level
  as: 'subscriptions' // Alias for the association
});

// Define association for the user (freelancer) associated with a subscription
Subscription.belongsTo(Freelancer, {
  foreignKey: 'useremail', // Name of the foreign key column in the Subscription table
  targetKey: 'Email', // Name of the referenced column in the Freelancer table
  constraints: false // Enforce foreign key constraints at the database level
});

module.exports = Subscription;
