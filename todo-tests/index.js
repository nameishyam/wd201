const { connect } = require("./connectDB");
const Todo = require("./TodoModel");

const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.create({
      title: "first item",
      duedate: new Date(),
      completed: false,
    });
    console.log(`created todo with id: ${todo.id}`);
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await createTodo();
})();
