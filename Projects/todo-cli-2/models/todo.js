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
      console.log(await this.overdue());

      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      console.log(await this.dueToday());

      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      console.log(await this.dueLater());
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      try {
        const overdueItems = await Todo.findAll({
          where: {
            dueDate: {
              [Op.lt]: new Date(),
            },
          },
        });
        const overdueItemsList = overdueItems
          .map((item) => item.displayableString())
          .join(`\n`);
      } catch (error) {
        console.log(error);
      }
      return overdueItemsList;
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      try {
        const dueTodayItems = await Todo.findAll({
          where: {
            dueDate: {
              [Op.eq]: new Date(),
            },
          },
        });
        const dueTodayItemsList = dueTodayItems
          .map((item) => item.displayableString())
          .join(`\n`);
      } catch (error) {
        console.log(error);
      }
      return dueTodayItemsList;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      try {
        const dueLaterItems = await Todo.findAll({
          where: {
            [Op.gt]: new Date(),
          },
        });
        const dueLaterItemsList = dueLaterItems
          .map((item) => item.displayableString())
          .joion(`\n`);
      } catch (error) {
        console.log(error);
      }
      return dueLaterItemsList;
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
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
