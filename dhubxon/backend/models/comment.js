const sequelize = require("../config")
const { Sequelize, DataTypes } = require("sequelize");

const Comment = sequelize.define("comment", {
 
    
    POSTID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CONTENT: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TIME: {
      type: DataTypes.STRING,
      allowNull: false
  },
  PICTURE:{
    type:DataTypes.STRING,
    allowNull:false
  },
  NAME:{
    type:DataTypes.STRING,
    allowNull:false
  },
  EMAIL:{
    type:DataTypes.STRING,
    allowNull:false
  },
 });

 module.exports = Comment