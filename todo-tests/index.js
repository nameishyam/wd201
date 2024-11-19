const { connect } = require("./connectDB");
const todoList = require("./todo");
const Todo = require("./TodoModel");

const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "first item",
      dueDate: new Date(),
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

const getAllTodos = async () => {
  try {
    const items = await Todo.findAll();
    const todoList = await items
      .map((item) => item.displayableStrings())
      .join(`\n`);
      console.log();
    if (todoList.length === 0) {
      console.log(`no results found`);
    } else {
      console.log(todoList);
    }
  } catch (error) {
    console.log(error);
  }
};

const getSingleTodo = async () => {
  try {
    const singleItems = await Todo.findOne({
      where: {
        completed: false,
      },
      order: [[`id`, `DESC`]],
    });
    console.log();
    if (singleItems.length === 0) {
      console.log(`no results found`);
    } else {
      console.log(singleItems.displayableStrings());
    }
  } catch (error) {
    console.log(error);
  }
};

const updateModel = async (id) => {
  try {
    await Todo.update(
      { completed: true },
      { where: { id: id } }
    );
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  // await createTodo();
  await countItems();
  await getAllTodos();
  await getSingleTodo();
  await updateModel(11);
  await getAllTodos();
})();
