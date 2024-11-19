/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, add, markAsComplete } = todoList();

describe("todolist test suits", () => {
  beforeAll(() => {
    add({
      title: "Todo test",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });
  test("add todo item", () => {
    const todoItemCount = all.length;
    add({
      title: "Todo test - 2",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemCount + 1);
  });

  test("mark todo item as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});
