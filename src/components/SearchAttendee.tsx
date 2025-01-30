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
  createdAt: string;
}

interface SearchAttendeeProps {
  onSearchResult: (events: Event[]) => void;
}

const SearchAttendee: React.FC<SearchAttendeeProps> = ({ onSearchResult }) => {
  const [query, setQuery] = useState("");
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://6799e5a0747b09cdcccce6fe.mockapi.io/api/events/${eventId}`
      );
      if (!response.ok) throw new Error("Event not found");
      const event: Event = await response.json();
      onSearchResult([event]); // Send event data to parent
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
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {isLoading && (
        <div className="mt-2 text-center text-gray-600">Searching...</div>
      )}
      {error && <div className="mt-2 text-center text-red-600">{error}</div>}

      {!isLoading && !error && query.length >= 3 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {attendees.length === 0 ? (
            <div className="px-4 py-2 text-gray-600">
              No matching attendees found
            </div>
          ) : (
            attendees.map((attendee) => (
              <div
                key={attendee.id}
                className="px-4 py-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                onClick={() => fetchEventDetails(attendee.eventId)}
              >
                <div className="font-medium text-gray-900">{attendee.name}</div>
              </div>
            ))
          )}
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
