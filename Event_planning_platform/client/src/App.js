// src/App.js
import React from 'react';
import MapComponent from './MapComponent';

const App = () => {
  const eventLocation = { lat: 37.7749, lng: -122.4194 }; // Example coordinates (San Francisco)

  return (
    <div>
      <h1>Event Location</h1>
      <MapComponent location={eventLocation} />
    </div>
  );
};

export default App;
