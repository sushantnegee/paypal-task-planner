const express = require('express');
const router = express.Router();
const Sprint = require('../models/sprintModel');
const Task = require('../models/taskModel');

// create a new sprint --> tested and working
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

  module.exports = router;

