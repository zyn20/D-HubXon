const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");
const Validator = sequelize.define("Validator", {

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
  },
  IssueResolved: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0, 
  },  
});

module.exports = Validator;
