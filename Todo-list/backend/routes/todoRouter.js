// External Module
const express = require("express");
const todoRouter = express.Router();

// Local Module
const todoController = require("../controllers/todoController");

todoRouter.get("/", todoController.getTasks);
todoRouter.post("/", todoController.postCreateTask);
todoRouter.patch("/:id", todoController.toggleTaskCompletion);
todoRouter.delete("/:id", todoController.deleteTask);

module.exports = todoRouter;