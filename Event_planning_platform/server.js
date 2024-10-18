// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { sendEmail } = require("./mailer");
const rsvpRoutes = require("./routes/rsvp"); // Import RSVP routes
const schedule = require('node-schedule');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Create an event
app.post('/events', async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
});

// Get all events
app.get('/events', async (req, res) => {
    const events = await Event.find();
    res.status(200).send(events);
});

// Update an event
app.put('/events/:id', async (req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(event);
});

// Delete an event
app.delete('/events/:id', async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Endpoint to send notifications
app.post('/send-notification', async (req, res) => {
    const { email, subject, message } = req.body;
    try {
        await sendEmail(email, subject, message);
        res.status(200).json({ message: 'Notification sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send notification' });
    }
});

// Use RSVP routes under /api/events
app.use("/api/events", rsvpRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Schedule reminders (example: every minute)
schedule.scheduleJob('* * * * *', async () => {
    // Logic to fetch upcoming events and send reminders
    const upcomingEvents = []; // Fetch from your database
    upcomingEvents.forEach(event => {
        const reminderMessage = `Reminder for event: ${event.title}`;
        sendEmail(event.attendeeEmail, 'Event Reminder', reminderMessage);
    });
});
