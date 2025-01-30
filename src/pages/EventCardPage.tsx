import { useEffect, useState } from "react";
import { Event } from '../types/event';
import axios from "axios";
import EventCard from "../components/EventCard";
import SearchAttendee from "../components/SearchAttendee";
import '../App.css';

export default function EventCardPage() {
    // State to store events data
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1); // Track current page
    const [hasMore, setHasMore] = useState<boolean>(true); // Track if more data is available

    // Fetch data from the API
    const fetchData = async () => {
        if (loading || !hasMore) return; // Prevent fetching if already loading or no more data
        
        try {
            setLoading(true);
            const response = await axios.get(
                `https://6799e5a0747b09cdcccce6fe.mockapi.io/api/events/?page=${page}&limit=15`
            );
            const newEvents = response.data;
            setEvents((prevEvents) => [...prevEvents, ...newEvents]); // Append new data
            setHasMore(newEvents.length > 0); // If no data is returned, stop fetching
        } catch (err) {
            console.log(err);
            setError('Failed to fetch events. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Trigger fetch when component mounts or page changes
    useEffect(() => {
        fetchData();
    }, [page]);

    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const threshold = 10; // Adjust this value as needed

            // Check if the user has scrolled to the bottom
            if (scrollHeight - scrollTop <= clientHeight + threshold && !loading && hasMore) {
                setPage((prevPage) => prevPage + 1); // Load next page of events
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

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
            </div>

            {/* Loader */}
            {loading && <div className="text-center p-4 text-gray-600">Loading more events...</div>}
            {/* Error Message */}
            {error && <div className="p-4 text-center text-red-600">{error}</div>}
        </div>
    );
}
