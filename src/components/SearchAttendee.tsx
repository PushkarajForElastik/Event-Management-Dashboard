import React, { useState, useEffect, useCallback } from "react";

interface Attendee {
  id: string;
  name: string;
  email: string;
}

interface Event {
  id: string;
  name: string;
  attendees: Attendee[];
}

// Mock data
const sampleEvents: Event[] = [
  {
    id: "1",
    name: "Tech Conference 2023",
    attendees: [
      { id: "a1", name: "John Doe", email: "john@example.com" },
      { id: "a2", name: "Alice Smith", email: "alice@example.com" },
    ],
  },
  {
    id: "2",
    name: "Marketing Summit",
    attendees: [
      { id: "a3", name: "Bob Johnson", email: "bob@example.com" },
      { id: "a4", name: "Sarah Wilson", email: "sarah@example.com" },
    ],
  },
];

// Mock API call
const searchAttendees = async (query: string): Promise<Attendee[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (query.toLowerCase().includes("error")) {
    throw new Error("Simulated API error");
  }

  const allAttendees = sampleEvents.flatMap((event) => event.attendees);
  return allAttendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(query.toLowerCase()) ||
      attendee.email.toLowerCase().includes(query.toLowerCase())
  );
};

const SearchAttendee: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Attendee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 3) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await searchAttendees(searchQuery);
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to search");
        setResults([]);
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
    setQuery(e.target.value.trim());
  };

  return (
    <div className="relative max-w-md mx-auto mt-5">
      <input
        type="text"
        placeholder="Search attendees..."
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
          {results.length === 0 ? (
            <div className="px-4 py-2 text-gray-600">
              No matching attendees found
            </div>
          ) : (
            results.map((attendee) => (
              <div
                key={attendee.id}
                className="px-4 py-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <div className="font-medium text-gray-900">{attendee.name}</div>
                <div className="text-sm text-gray-500">{attendee.email}</div>
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
