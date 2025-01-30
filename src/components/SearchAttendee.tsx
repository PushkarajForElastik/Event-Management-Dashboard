import React, { useState, useEffect, useCallback } from "react";

interface Attendee {
  id: string;
  name: string;
  eventId: string;
}

interface Event {
  id: string;
  eventName: string;
  eventIcon: string;
  eventDate: string;
  ticketPrice: string;
  ticketsSold: number;
  description: string;
}

const SearchAttendee: React.FC = () => {
  const [query, setQuery] = useState("");
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 3) {
        setAttendees([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://6799e5a0747b09cdcccce6fe.mockapi.io/api/attendee?name=${encodeURIComponent(
            searchQuery
          )}`
        );

        if (!response.ok) throw new Error("Failed to fetch attendees");

        const data: Attendee[] = await response.json();
        setAttendees(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to search");
        setAttendees([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const fetchEventDetails = async (eventId: string) => {
    setSelectedEvent(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://6799e5a0747b09cdcccce6fe.mockapi.io/api/events/${eventId}`
      );
      if (!response.ok) throw new Error("Event not found");
      const event: Event = await response.json();
      setSelectedEvent(event);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch event");
    } finally {
      setIsLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="relative max-w-md mx-auto mt-5">
      <input
        type="text"
        placeholder="Search attendees by name..."
        value={query}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
         dark:placeholder:text-white dark:text-white"
      />

      {isLoading && (
        <div className="mt-2 text-center text-gray-600 dark:text-white">Searching...</div>
      )}
      {error && <div className="mt-2 text-center text-red-600">{error}</div>}

      {!isLoading && !error && query.length >= 3 && (
        <div className="absolute z-10 w-full mt-1 bg-white border dark:bg-slate-900  border-gray-200 dark:border-gray-500 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {attendees.length === 0 ? (
            <div className="px-4 py-2 text-gray-600 dark:text-gray-300">
              No matching attendees found
            </div>
          ) : (
            attendees.map((attendee) => (
              <div
                key={attendee.id}
                className="px-4 py-2 border-b border-gray-100 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800
                 cursor-pointer bg-white dark:bg-slate-900"
                onClick={() => fetchEventDetails(attendee.eventId)}
              >
                <div className="font-medium text-gray-900 dark:text-gray-300">{attendee.name}</div>
              </div>
            ))
          )}
        </div>
      )}

      {selectedEvent && (
        <div className="mt-5 p-4 border rounded-lg shadow-lg bg-white">
          <img
            src={selectedEvent.eventIcon}
            alt={selectedEvent.eventName}
            className="w-full h-40 object-cover rounded-md"
          />
          <h2 className="text-xl font-semibold mt-2">
            {selectedEvent.eventName}
          </h2>
          <p className="text-gray-500">
            {new Date(selectedEvent.eventDate).toDateString()}
          </p>
          <p className="text-gray-700 mt-2">{selectedEvent.description}</p>
          <div className="flex justify-between mt-3">
            <span className="font-bold">
              Tickets Sold: {selectedEvent.ticketsSold}
            </span>
            <span className="font-bold">
              Price: ${selectedEvent.ticketPrice}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Debounce utility function
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default SearchAttendee;
