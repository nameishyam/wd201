const todoList = require("../todo");

const { all, add, markAsComplete } = todoList();

describe("todolist test suits", () => {
  test("add todo item", () => {
    expect(all.length).toBe(0);
    add({
      title: "Todo test",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(1);
  });

  test("mark todo item as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});
