// Local Module
const Task = require("../models/task");

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
  }
};

exports.postCreateTask = async (req, res, next) => {
  const { task } = req.body;
  const newTask = new Task({ task });
  await newTask.save();

  res.status(201).json(newTask);
};

exports.toggleTaskCompletion = async (req, res, next) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  task.isCompleted = !task.isCompleted;
  await task.save();

  res.status(200).json(task);
};

exports.deleteTask = async (req, res, next) => {
  const taskId = req.params.id;
  await Task.findByIdAndDelete(taskId);

  res.status(200).json({ message: "Task deleted successfully" });
};