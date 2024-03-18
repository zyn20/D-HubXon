const sequelize = require("../config")
const { Sequelize, DataTypes } = require("sequelize");

const POST = sequelize.define("post", {
 
 
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
}, 
 COMMENTS: {
    type: DataTypes.INTEGER,
    allowNull: false
}, 
EMAIL: {
   type: DataTypes.STRING,
   allowNull: false
},
IMAGEURL: {
  type: DataTypes.STRING,
  allowNull: false
},
BLOCKCHAININDEX: {
  type: DataTypes.INTEGER,
  allowNull: true
}

 });

 module.exports = POST