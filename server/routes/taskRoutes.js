const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');
const protect = require('../middleware/authMiddleware');

// Create a new task -->tested and working
router.post('/',protect, async (req, res) => {
  try {
    const task = await Task.create(req.body); // if i face bug
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Change assignee--> tested and working
router.patch('/:id/assignee',protect, async (req, res) => {
    const {id} = req.params;
    const {assignee} = req.body
  try {
    const task = await Task.findByIdAndUpdate(id, { assignee: assignee }, { new: true });
    console.log(task)
    if (!task) {
      return res.status(404).json({message: "error"});
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Change status -->tested and working
router.patch('/:id/status',protect, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all tasks of a particular sprint --> tested and working
router.get('/:sprint',protect, async (req, res) => {
    const sprint = req.params;
  try {
    const tasks = await Task.find(sprint );
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;