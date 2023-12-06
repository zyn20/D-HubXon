const sequelize = require("../config")
const { Sequelize, DataTypes } = require("sequelize");

const Client = sequelize.define("client", {
 
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
  
 });

 module.exports = Client