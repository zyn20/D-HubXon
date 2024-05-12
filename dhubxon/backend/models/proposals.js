const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

const Proposals = sequelize.define("Proposals", {
  PROJECTID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  BIDAMOUNT: {
    type: DataTypes.INTEGER,
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
  PROPOSALOWNER: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  METAMASKADDRESS: {
    type: DataTypes.STRING,
    allowNull: false,
  }


  
});

module.exports = Proposals;
