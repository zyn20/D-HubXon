const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

const FreelancerProfile = sequelize.define("FreelancerProfile", {
    email: {
        type: DataTypes.STRING,
        allowNull: true,
      },

  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  headline: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  headlineDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  portfolioFile: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  portfolioDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  skills: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  languages: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  education: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  certifications: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  employmentHistory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otherExperiences: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  KEYWORDS: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = FreelancerProfile;
