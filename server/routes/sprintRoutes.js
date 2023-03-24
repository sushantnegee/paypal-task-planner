const express = require('express');
const router = express.Router();
const Sprint = require('../models/sprint');
const Task = require('../models/task');

// Route to create a new sprint
router.post('/', async (req, res) => {
    const {name,startDate,endDate} = req.body;
    try {
      const sprint = await Sprint.create({
        name: name,
        startDate: startDate,
        endDate: endDate,
      });
      res.status(201).json(sprint);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Route to add a task to a sprint
router.post('/:id/tasks', async (req, res) => {
    const sprintId = req.params.id;
    const taskId = req.body.taskId;
    try {
      const sprint = await Sprint.findById(sprintId);
      if (!sprint) {
        return res.status(404).json({ message: 'Sprint not found' });
      }
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      sprint.tasks.push(task);
      await sprint.save();
      res.status(200).json(sprint);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Route to show all tasks of a particular sprint
router.get('/:id/tasks', async (req, res) => {
    const sprintId = req.params.id;
    try {
      const sprint = await Sprint.findById(sprintId).populate('tasks');
      if (!sprint) {
        return res.status(404).json({ message: 'Sprint not found' });
      }
      res.status(200).json(sprint.tasks);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });