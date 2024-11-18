const { connect } = require("./connectDB");
const Todo = require("./TodoModel");

const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "first item",
      duedate: new Date(),
      completed: false,
    });
    console.log(`created todo with id: ${todo.id}`);
  } catch (error) {
    console.log(error);
  }
};

const countItems = async () => {
  try {
    const noItems = await Todo.count();
    console.log(`Total items: ${noItems}`);
  } catch (error) {
    console.log(error);
  }
};

const todos = async () => {
  try {
    const items = await Todo.findAll();
    const todosList = await items
      .map((item) => item.displayableStrings())
      .join(`\n`);
    console.log(todosList);
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await createTodo();
  await countItems();
  await todos();
})();
