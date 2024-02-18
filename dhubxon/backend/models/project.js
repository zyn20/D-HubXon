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
  }
});

module.exports = Project;
