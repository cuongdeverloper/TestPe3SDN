const mongoose = require('mongoose');

const event = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
  },
  createdAt: {
    type:Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
});


module.exports = mongoose.model('Event', event);
