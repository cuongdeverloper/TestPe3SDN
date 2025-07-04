const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  studentId: {
    type: String,
    ref: 'User',
    required: true
  },
  eventId: {
    type: String,
    ref: 'Event',
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Registration', registrationSchema);
