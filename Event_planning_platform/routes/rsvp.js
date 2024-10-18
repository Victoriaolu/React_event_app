const express = require("express");
const router = express.Router();
const Event = require("../models/Event"); // Import the Event model

// POST /api/events/:id/rsvp
router.post("/:id/rsvp", async (req, res) => {
  const { name, email, attending } = req.body;
  
  try {
    // Find the event by ID
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Add the attendee to the event's attendees list
    event.attendees.push({ name, email, attending });
    
    // Save the updated event
    await event.save();

    res.status(201).json({ message: "RSVP confirmed", attendees: event.attendees });
  } catch (error) {
    res.status(500).json({ error: "Failed to RSVP" });
  }
});

module.exports = router;
