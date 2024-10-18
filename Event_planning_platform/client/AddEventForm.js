import React, { useState } from 'react';

const AddEventForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [attendees, setAttendees] = useState(0);
  const [status, setStatus] = useState('Free');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, date, attendees, status }),
    });
    // Reset form or show success message
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Event</h1>
      <input type="text" placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="number" placeholder="Number of Attendees" value={attendees} onChange={(e) => setAttendees(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Free">Free</option>
        <option value="Paid">Paid</option>
      </select>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default AddEventForm;
