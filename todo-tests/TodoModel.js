const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("./connectDB.js");

class Todo extends Model {
  static async addTask(params) {
    return await Todo.create(params);
  }

  displayableStrings() {
    return `${this.id}. ${this.title} - ${this.dueDate} ${this.completed ? "[X]" : "[ ]"}`;
  }
}
Todo.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
  }
);

Todo.sync();
module.exports = Todo;
