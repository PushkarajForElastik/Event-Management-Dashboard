import { useState, useEffect } from 'react';
import EventCard from "./components/EventCard";
import './App.css';

function App() {

  // Event data type
  interface EventType {
    id: number;
    eventName: string;
    eventIcon: string;
    eventDate: string;
    ticketPrice: string;
    ticketsSold: number;
  }

  // Set event state for cards selected or not
  const [events, setEvents] = useState<EventType[]>([]);

  // Fetch event data
  useEffect(() => {
    fetch("https://6799e5a0747b09cdcccce6fe.mockapi.io/api/events")
      .then(res => res.json())
      .then(data => setEvents(data)); 
  }, []);

  // Reusable component for event card
  const entryElements = events.map((single: EventType) => {
    return (
      <EventCard
        key={single.id}
        eventName={single.eventName}
        eventIcon={single.eventIcon}
        eventDate={single.eventDate}
        ticketPrice={single.ticketPrice}
        ticketsSold={single.ticketsSold}
      />
    );
  });

  return (
    <>
      <div>App</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">{entryElements}</div> {/* Cards render */}
    </>
  );
}

export default App;
