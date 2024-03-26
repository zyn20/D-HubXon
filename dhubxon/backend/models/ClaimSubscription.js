const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

const ClaimSubscription = sequelize.define("ClaimSubscription", {
  FULLNAME: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FILEURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  EMAIL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PROFILEURL: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = ClaimSubscription;
