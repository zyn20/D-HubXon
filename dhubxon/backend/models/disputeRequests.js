const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

const DisputeRequests = sequelize.define("DisputeRequests", {
  PROJECTID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  COVERLETTER: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FILEURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PROPOSALFILEURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DISPUTEREQUESTOWNER: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SOLVED:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }

});

module.exports = DisputeRequests;
