const sequelize = require("../config");
const { Sequelize, DataTypes } = require("sequelize");

const Purchase = sequelize.define("Purchase", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Validate that this is a valid email address
    }
  },
  itemId: {
    type: DataTypes.INTEGER, // Assuming the item ID is an integer. Adjust the type if necessary.
    allowNull: false, // Enforces that itemId cannot be null
  },
  Amount: {
    type: DataTypes.BIGINT, // Assuming the item ID is an integer. Adjust the type if necessary.
    allowNull: false, // Enforces that itemId cannot be null
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creditCardNo: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },
});

module.exports = Purchase;
