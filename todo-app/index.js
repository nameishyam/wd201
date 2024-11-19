const { request, response } = require("express");
const express = require("express");
const app = express();

app.get(`/todos`, (request, response) => {
  console.log(`Todo list`);
});

app.post(`\todos`, (request, response) => {
  console.log(`Todo created`, request.body);
});

app.put(`/todos/:id/markAsComplete`, (request, response) => {
  console.log(`Todo marked as complete`, request.params.id);
});

app.delete(`/todos/:id`, (request, response) => {
  console.log(`Todo deleted`, request.params.id);
});

app.listen(3000, () => {
  console.log(`listeneing to port 3000`);
});
