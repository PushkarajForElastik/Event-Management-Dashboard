import React, { useState, useEffect, useCallback } from "react";
import { ArrowUpDown } from "lucide-react";
import axios from "axios";
import { Event, Attendee } from "../types/event";

type SortField = "eventDate" | "ticketPrice" | "ticketsSold";
type SortOrder = "asc" | "desc";

export const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [attendees, setAttendees] = useState<Record<string, Attendee[]>>({});
  const [sortField, setSortField] = useState<SortField>("eventDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://6799e5a0747b09cdcccce6fe.mockapi.io/api/events"
      );
      setEvents(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Fetch attendees for a specific event
  const fetchAttendees = async (eventId: string) => {
    try {
      const response = await axios.get(
        `https://6799e5a0747b09cdcccce6fe.mockapi.io/api/events/${eventId}/attendee`
      );
      

      
      setAttendees(prev => ({
        ...prev,
        [eventId]: response.data
      }));

    } catch (err) {
      console.error(err);
      setError("There are no atendees for this event ");
    }
  };

  // Toggle attendee view
  const toggleAttendees = async (eventId: string) => {
    const isExpanded = expandedRows[eventId];
    setExpandedRows(prev => ({
      ...prev,
      [eventId]: !isExpanded
    }));

    if (!isExpanded && !attendees[eventId]) {
      await fetchAttendees(eventId);
    }
  };

  // Sorting logic
  const handleSort = (field: SortField) => {
    const newSortOrder = field === sortField && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedEvents = [...events].sort((a, b) => {
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

    setEvents(sortedEvents);
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

  return (
    <div className="overflow-hidden rounded-lg shadow-md bg-white p-6 dark:bg-slate-800">
      {/* Table for Larger Screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr className="text-left text-gray-600 dark:text-gray-300 text-base font-semibold uppercase">
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
          <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
            {events.map((event) => (
              <React.Fragment key={event.id}>
                <tr className="hover:bg-gray-50 dark:hover:bg-slate-900 transition">
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-300 text-base font-medium">
                    {event.eventName}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-300 text-base">
                    {new Date(event.eventDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-300 text-base">
                    ${event.ticketPrice}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-300 text-base">
                    {event.ticketsSold}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleAttendees(event.id)}
                      className="px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                      {expandedRows[event.id] ? "Hide Attendees" : "Show Attendees"}
                    </button>
                  </td>
                </tr>
                {expandedRows[event.id] && (
                  <tr>
                    <td colSpan={5} className="bg-gray-50 dark:bg-slate-900 px-8 py-4">
                      <div className="text-base font-medium text-gray-900 dark:text-gray-300 mb-3">
                        Attendees List
                      </div>
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-gray-600 dark:text-gray-300 text-sm font-semibold uppercase">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {attendees[event.id]?.map((attendee) => (
                            <tr key={attendee.id} className="hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-gray-300">
                              <td className="px-4 py-2 text-base">{attendee.name}</td>
                              <td className="px-4 py-2 text-base">{attendee.email}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card Layout for Mobile Screens */}
      <div className="md:hidden">
        {events.map((event) => (
          <div key={event.id} className="mb-4 p-4 border rounded-lg bg-gray-100 dark:bg-slate-900">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
              {event.eventName}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Event Date: {new Date(event.eventDate).toLocaleDateString("en-GB")}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">Ticket Price: ${event.ticketPrice}</p>
            <p className="text-lg text-gray-600 dark:text-gray-300">Tickets Sold: {event.ticketsSold}</p>
            <button
              onClick={() => toggleAttendees(event.id)}
              className="mt-2 w-full text-lg font-semibold text-white bg-blue-600 rounded-lg py-2 hover:bg-blue-700 transition"
            >
              {expandedRows[event.id] ? "Hide Attendees" : "Show Attendees"}
            </button>

            {expandedRows[event.id] && (
              <div className="mt-3 bg-white dark:bg-gray-800 p-3 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-300 mb-2">Attendees List</h4>
                {attendees[event.id]?.map((attendee) => (
                  <div key={attendee.id} className="p-2 border-b text-lg text-gray-700 dark:text-gray-300">
                    <p>Name: {attendee.name}</p>
                    <p>Email: {attendee.email}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {loading && <div className="text-center p-4 text-lg text-gray-600 dark:text-gray-300">Loading events...</div>}
      {error && <div className="text-center p-4 text-lg text-red-600">{error}</div>}
    </div>
  );
};


export default EventList;
