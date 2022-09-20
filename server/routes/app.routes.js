// Initiate route
const express = require("express");
const router = express.Router();
// Initiate Todos controller
const todos = require("../controllers/todosController");

// GET Todos - route (/api/todos/) - List of Todos
router.get("/", todos.index);

// POST Todos - route (/api/todos/) - Add a todo
router.post("/", todos.create);

// PUT Todos - route (/api/todos/:id/edit) - Edit a todo
router.put("/:id/edit", todos.update);

// DELETE Todos - route (/api/todos/:id) - Delete a todo
router.delete("/:id", todos.destroy);

// DELETE Todos - route (/api/todos/) - Delete ALL Todos
router.delete("/", todos.deleteAll);

module.exports = router;
