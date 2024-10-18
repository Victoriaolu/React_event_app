fetch('API_URL_TO_FETCH_EVENT')
  .then(response => response.json())
  .then(data => setEventData(data))
  .catch(error => console.error('Error fetching event:', error));
fetch('API_URL_TO_UPDATE_EVENT', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedEventData),
})
.then(response => response.json())
.then(data => console.log('Event updated:', data))
.catch(error => console.error('Error updating event:', error));
