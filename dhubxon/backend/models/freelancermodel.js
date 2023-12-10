const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

//------create table with feilds--------
const Freelancer = sequelize.define("Freelancer", {

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
  OTP: {
    type: DataTypes.STRING,
    allowNull: false
},
Isverified:{
  type:DataTypes.BOOLEAN,
  allowNull:false
}
});

module.exports = Freelancer;
