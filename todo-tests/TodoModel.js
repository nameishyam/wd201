const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("./connectDB.js");

class User extends Model {}
User.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
  }
);

module.exports = User;

User.sync();
