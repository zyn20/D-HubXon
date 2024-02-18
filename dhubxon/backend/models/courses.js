const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

const Course = sequelize.define("Course", {

  zipPath: {
    type: DataTypes.STRING,
    allowNull: true, // Set to true if the ZIP file is optional
  },
  
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {
      rate: 0.0,
      count: 0,
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, // Disable timestamps
});

module.exports = Course;
