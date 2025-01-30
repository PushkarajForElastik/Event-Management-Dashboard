import React, { useState, useEffect, useCallback } from "react";
import { ArrowUpDown } from "lucide-react";
import axios from "axios";
import { Event } from "../types/event";
import SearchAttendee from "../components/SearchAttendee";

type SortField = "eventDate" | "ticketPrice" | "ticketsSold";
type SortOrder = "asc" | "desc";

export const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[] | null>(null);
  const [sortField, setSortField] = useState<SortField>("eventDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch events
  const fetchData = useCallback(async () => {
    if (!hasMore) return;
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
  }, [page, hasMore]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Infinite scroll
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight + 10 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Search filter
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredEvents(null);
    } else {
      const searchResults = events.filter((event) =>
        event.eventName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(searchResults);
    }
  };

  // Handle attendee selection from SearchAttendee
  const handleAttendeeSelect = (eventList: Event[]) => {
    setFilteredEvents(eventList);
  };

  // Sorting
  const handleSort = (field: SortField) => {
    const newSortOrder =
      field === sortField && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedEvents = [...(filteredEvents || events)].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (field === "eventDate") {
        return newSortOrder === "asc"
          ? new Date(aValue).getTime() - new Date(bValue).getTime()
          : new Date(bValue).getTime() - new Date(aValue).getTime();
      }

      if (field === "ticketPrice") {
        return newSortOrder === "asc"
          ? parseFloat(aValue as string) - parseFloat(bValue as string)
          : parseFloat(bValue as string) - parseFloat(aValue as string);
      }

      return newSortOrder === "asc"
        ? a.ticketsSold - b.ticketsSold
        : b.ticketsSold - a.ticketsSold;
    });

    setFilteredEvents(sortedEvents);
  };

  const SortButton: React.FC<{ field: SortField; label: string }> = ({
    field,
    label,
  }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
    >
      {label}
      <ArrowUpDown
        className={`h-4 w-4 ${
          sortField === field ? "text-blue-600" : "text-gray-400"
        }`}
      />
    </button>
  );

  const displayedEvents = filteredEvents !== null ? filteredEvents : events;

  return (
    <div className="overflow-hidden rounded-lg shadow-md bg-white p-6">
      <div className="mb-6">
        {/* Search Attendee Component */}
        <SearchAttendee onSearchResult={handleAttendeeSelect} />
      </div>

      {/* Table for Larger Screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-600 text-sm font-semibold uppercase">
              <th className="px-4 py-3">Event Name</th>
              <th className="px-4 py-3">
                <SortButton field="eventDate" label="Event Date" />
              </th>
              <th className="px-4 py-3">
                <SortButton field="ticketPrice" label="Ticket Price" />
              </th>
              <th className="px-4 py-3">
                <SortButton field="ticketsSold" label="Tickets Sold" />
              </th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedEvents.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-900 text-sm font-medium">
                  {event.eventName}
                </td>
                <td className="px-4 py-3 text-gray-500 text-sm">
                  {new Date(event.eventDate).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-3 text-gray-500 text-sm">
                  ${event.ticketPrice}
                </td>
                <td className="px-4 py-3 text-gray-500 text-sm">
                  {event.ticketsSold}
                </td>
                <td className="px-4 py-3">
                  <button className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile-Friendly Card View */}
      <div className="md:hidden space-y-4 p-4">
        {displayedEvents.map((event) => (
          <div key={event.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">
              {event.eventName}
            </h3>
            <p className="text-gray-500">
              {new Date(event.eventDate).toLocaleDateString("en-GB")}
            </p>
            <p className="text-gray-500">Ticket Price: ${event.ticketPrice}</p>
            <p className="text-gray-500">Tickets Sold: {event.ticketsSold}</p>
            <button className="mt-3 w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center p-4 text-gray-600">
          Loading more events...
        </div>
      )}
    </div>
  );
};
