const express = require("express");
const router = express.Router();
// const Todo = require("../models/data.model");
const todos = require("../controllers/todosController");

router.get("/", todos.index);

router.post("/", todos.create);

router.put("/:id/edit", todos.update);

router.delete("/:id", todos.destroy);

module.exports = router;
