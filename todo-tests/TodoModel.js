const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("./connectDB.js");

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    userid: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "user",
  }
);
