import React from 'react';
import { EventList } from './components/EventList';
import { events } from './data/events_data';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
       
        <EventList events={events} />
      </div>
    </div>
  );
}

export default App;