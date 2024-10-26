// Import mongoose only once
const mongoose = require('mongoose');

// Define the event schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  attendees: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      attending: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  status: {
    type: String,
    enum: ['Free', 'Paid'],
    default: 'Free',
  },
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);

// Export the Event model
module.exports = Event;
