const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// GET /api/tasks — return all tasks, newest first.
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tasks." });
  }
});

// POST /api/tasks — validate and create a task.
router.post("/", async (req, res) => {
  try {
    const title = String(req.body.title ?? "").trim();

    if (!title) {
      return res.status(400).json({ message: "Task title cannot be empty." });
    }

    const task = await Task.create({ title });
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create task." });
  }
});

// PUT /api/tasks/:id — update title and/or completion status.
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "Task not found." });
    }

    const updates = {};

    if (Object.prototype.hasOwnProperty.call(req.body, "title")) {
      const title = String(req.body.title ?? "").trim();
      if (!title) {
        return res.status(400).json({ message: "Task title cannot be empty." });
      }
      updates.title = title;
    }

    if (Object.prototype.hasOwnProperty.call(req.body, "completed")) {
      if (typeof req.body.completed !== "boolean") {
        return res.status(400).json({ message: "completed must be true or false." });
      }
      updates.completed = req.body.completed;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Provide a title or completed value to update." });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update task." });
  }
});

// DELETE /api/tasks/:id — remove a task.
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "Task not found." });
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete task." });
  }
});

module.exports = router;
