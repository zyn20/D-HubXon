const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

//------create table with feilds--------
const Freelancer = sequelize.define("Freelancer", {
  AdminID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Freelancer;
