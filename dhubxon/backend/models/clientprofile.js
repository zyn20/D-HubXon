const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

const ClientProfile = sequelize.define("ClientProfile", {
    email: {
        type: DataTypes.STRING,
        allowNull: true,
      },

  companyname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactperson: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactemail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
 
  contactphone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  companydescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  projectposted: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = ClientProfile;
