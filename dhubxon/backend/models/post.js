const sequelize = require("../config")
const { Sequelize, DataTypes } = require("sequelize");

const POST = sequelize.define("post", {
 
    // POSTID: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    NAME: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PICTURE: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TIME: {
      type: DataTypes.STRING,
      allowNull: false
  },
  CONTENT:{
    type:DataTypes.STRING,
    allowNull:false
  },
  LIKES: {
    type: DataTypes.INTEGER,
    allowNull: false
}
 });

 module.exports = POST