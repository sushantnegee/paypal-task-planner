const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['bug', 'feature', 'story'], required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  sprint:{type: mongoose.Schema.Types.ObjectId, ref: 'Sprint'}
},{
    timestamps:true,
});

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;