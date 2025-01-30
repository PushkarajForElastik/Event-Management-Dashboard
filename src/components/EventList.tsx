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
      setError(`Failed to fetch attendees for event ${eventId}`);
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
    <div className="overflow-hidden rounded-lg shadow-md bg-white p-6">
      {/* Table for Larger Screens */}
      <div className="overflow-x-auto">
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
            {events.map((event) => (
              <React.Fragment key={event.id}>
                <tr className="hover:bg-gray-50 transition">
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
                    <button
                      onClick={() => toggleAttendees(event.id)}
                      className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                      {expandedRows[event.id] ? "Hide Attendees" : "Show Attendees"}
                    </button>
                  </td>
                </tr>
                {expandedRows[event.id] && (
                  <tr>
                    <td colSpan={5} className="bg-gray-50 px-8 py-4">
                      <div className="text-sm font-medium text-gray-900 mb-3">
                        Attendees List
                      </div>
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-gray-600 text-xs font-semibold uppercase">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Ticket Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {attendees[event.id]?.map((attendee) => (
                            <tr key={attendee.id} className="hover:bg-gray-100">
                              <td className="px-4 py-2 text-sm">{attendee.name}</td>
                              <td className="px-4 py-2 text-sm">{attendee.email}</td>
                              <td className="px-4 py-2 text-sm">
                                {attendee.ticketType}
                              </td>
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

      {loading && (
        <div className="text-center p-4 text-gray-600">Loading events...</div>
      )}
      
      {error && (
        <div className="text-center p-4 text-red-600">{error}</div>
      )}
    </div>
  );
};

export default EventList;