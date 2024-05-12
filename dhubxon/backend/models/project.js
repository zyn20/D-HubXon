
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

const Project = sequelize.define("Project", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  skillRequired: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectDuration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pricingType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectDeadline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  budget: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  KEYWORDS: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectowner:{
    type: DataTypes.STRING,
    defaultValue: 'none',
    allowNull: false,
  },
  takenby: {
    type: DataTypes.STRING,
    defaultValue: 'none', // Default value set to 'none'
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending', // Default value set to 'Pending'
    allowNull: false,
  },
  BLOCKCHAININDEX: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Project;
