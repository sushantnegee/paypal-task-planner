const express = require('express');
const protect = require('../middleware/authMiddleware');
const router = express.Router();
const Sprint = require('../models/sprintModel');
const Task = require('../models/taskModel');

// create a new sprint --> tested and working
router.post('/', protect,async (req, res) => {
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
      // throw new Error(err.message);
    }
  });

  router.get('/', async (req, res) => {
    try {
      const sprints = await Sprint.find(); // find all sprints
      res.json(sprints); // send the sprints as a JSON response
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  

  module.exports = router;

