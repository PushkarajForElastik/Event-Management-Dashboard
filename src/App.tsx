
import React from "react";
import { Event } from './types/event';
import { EventList } from "./components/EventList";
import { events } from "./data/events_data";
import SearchAttendee from "./components/SearchAttendee";
import EventCard from "./components/EventCard";
import './App.css';

function App() {

  // Reusable component for event card
  const entryElements = events.map((single: Event) => {
    return (
      <EventCard
        key={single.id}
        eventName={single.name}
        eventDate={single.date}
        ticketPrice={single.ticketPrice}
        ticketsSold={single.ticketSales}
      />
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div>
        <SearchAttendee />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {entryElements}
      </div> {/* Cards render */}
      <div className="max-w-7xl mx-auto">
        <EventList events={events} />
      </div>
    </div>
  );
}

export default App;
