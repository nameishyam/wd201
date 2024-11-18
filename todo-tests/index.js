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
    const items = await Todo.count();
    console.log(`Total items: ${items}`);
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await createTodo();
  await countItems();
})();
