
import React, { useEffect, useState } from "react";
import { Event } from './types/event';
import { EventList } from "./components/EventList";
import axios from "axios";
import SearchAttendee from "./components/SearchAttendee";
import EventCard from "./components/EventCard";
import './App.css';

function App() {
  // state to store events data
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://6799e5a0747b09cdcccce6fe.mockapi.io/api/events'
        );
        setEvents(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Reusable component for event card
  const entryElements = events.map((single: Event) => {
    return (
      <EventCard
        key={single.id}
        eventName={single.eventName}
        eventDate={single.eventDate}
        ticketPrice={parseFloat(single.ticketPrice)}
        ticketsSold={single.ticketsSold}
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
       
        <EventList  />
        
      </div>
    </div>
  );
}

export default App;
