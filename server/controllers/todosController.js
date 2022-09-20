// Initiate Mongoose data schema
const Todo = require("../models/data.model");

// INDEX - Get all todos
module.exports.index = async (req, res) => {
  const todos = await Todo.find({});
  res.send(todos);
};

// CREATE - Add new todo
module.exports.create = async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.send("Okay!");
};

// UPDATE - Edit existing todo
module.exports.update = async (req, res) => {
  const { id } = req.params;
  const todo = req.body;
  await Todo.findByIdAndUpdate(id, todo);
  res.send("Okay!");
};

// DESTROY - Delete existing todo
module.exports.destroy = async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.send("Okay!");
};
