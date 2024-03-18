const sequelize = require("../config")
const { Sequelize, DataTypes } = require("sequelize");

const CommentReply = sequelize.define("commentreply", {
 
    
    COMMENTID: {
      type: DataTypes.INTEGER,
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
  
  NAME:{
    type:DataTypes.STRING,
    allowNull:false
  },
  EMAIL:{
    type:DataTypes.STRING,
    allowNull:false
  },
 });

 module.exports = CommentReply