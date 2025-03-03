import { useEffect, useState } from "react";
import { Event } from "../types/event";
import axios from "axios";
import EventCard from "../components/EventCard";
import SearchAttendee from "../components/SearchAttendee";
import "../App.css";

export default function EventCardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://6799e5a0747b09cdcccce6fe.mockapi.io/api/events/?page=${page}&limit=15`
      );
      const newEvents = response.data;
      setEvents((prevEvents) => [...prevEvents, ...newEvents]);
      setHasMore(newEvents.length > 0);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = document.documentElement;
      if (
        scrollHeight - scrollTop <= clientHeight + 10 &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 dark:bg-slate-800">
      <SearchAttendee
        onSearchResult={(searchResults) => setFilteredEvents(searchResults)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(filteredEvents !== null ? filteredEvents : events).map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            eventName={event.eventName}
            eventDate={event.eventDate}
            ticketPrice={event.ticketPrice}
            ticketsSold={event.ticketsSold}
            eventIcon={event.eventIcon}
          />
        ))}
      </div>

            {/* Loader */}
            {loading && <div className="text-center p-4 text-gray-600 dark:text-gray-300 ">Loading more events...</div>}
            {/* Error Message */}
            {error && <div className="p-4 text-center text-red-600">{error}</div>}
        </div>
    );
}
