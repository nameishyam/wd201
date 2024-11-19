// models/todo.js
"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const overdueList = await Todo.overdue();
      const overdueItemsList = overdueList
        .map((item) => item.displayableString())
        .join(`\n`);
      console.log(overdueItemsList);

      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const dueTodayList = await Todo.dueToday();
      const dueTodayItemsList = dueTodayList
        .map((item) => item.displayableString())
        .join(`\n`);
      console.log(dueTodayItemsList);

      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const dueLaterList = await Todo.dueLater();
      const dueLaterItemsList = dueLaterList
        .map((item) => item.displayableString())
        .join(`\n`);
      console.log(dueLaterItemsList);
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const today = new Date().toISOString().slice(0, 10);
      const overdueItems = await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: today,
          },
        },
      });
      return overdueItems;
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const today = new Date().toISOString().slice(0, 10);
      const dueTodayItems = await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: today,
          },
        },
      });
      return dueTodayItems;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const today = new Date().toISOString().slice(0, 10);
      const dueLaterItems = await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: today,
          },
        },
      });
      return dueLaterItems;
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      await Todo.update(
        {
          completed: true,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      const today = new Date().toISOString().slice(0, 10);
      return this.dueDate === today
        ? `${this.id}. ${checkbox} ${this.title}`
        : `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
