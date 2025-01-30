import React, { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';
import axios from 'axios';
import { Event } from '../types/event'


type SortField = 'eventDate' | 'ticketPrice' | 'ticketsSold';
type SortOrder = 'asc' | 'desc';

export const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [sortField, setSortField] = useState<SortField>('eventDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://6799e5a0747b09cdcccce6fe.mockapi.io/api/events/'
        );
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        
        setError('Failed to fetch events. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Handle sorting
  const handleSort = (field: SortField) => {
    const newSortOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedEvents = [...events].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (field === 'eventDate') {
        return newSortOrder === 'asc'
          ? new Date(aValue).getTime() - new Date(bValue).getTime()
          : new Date(bValue).getTime() - new Date(aValue).getTime();
      }

      if (field === 'ticketPrice') {
        const aPrice = parseFloat(aValue as string); // Convert to number
        const bPrice = parseFloat(bValue as string); // Convert to number
        return newSortOrder === 'asc'
          ? aPrice - bPrice
          : bPrice - aPrice;
      }

      if (field === 'ticketsSold') {
        return newSortOrder === 'asc'
          ? a.ticketsSold - b.ticketsSold
          : b.ticketsSold - a.ticketsSold;
      }

      return 0;
    });

    setEvents(sortedEvents);
  };

  const SortButton: React.FC<{ field: SortField; label: string }> = ({ field, label }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
    >
      {label}
      <ArrowUpDown
        className={`h-4 w-4 ${
          sortField === field ? 'text-blue-600' : 'text-gray-400'
        }`}
      />
    </button>
  );

  if (loading) {
    return <div className="p-4 text-center text-gray-600">Loading events...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="overflow-hidden rounded-lg shadow-md bg-white">
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
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-900 text-sm font-medium">
                  {event.eventName}
                </td>
                <td className="px-4 py-3 text-gray-500 text-sm">
                  {new Date(event.eventDate).toLocaleDateString('en-GB')}
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
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gray-50 p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {event.eventName}
              </h3>
              <span className="text-sm text-gray-500">
                {new Date(event.eventDate).toLocaleDateString('en-GB')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mt-2">
              <p className="text-gray-500">
                 Ticket Price:{' '}
                <span className="font-semibold">${event.ticketPrice}</span>
              </p>
              <p className="text-gray-500">
                 Tickets Sold:{' '}
                <span className="font-semibold">{event.ticketsSold}</span>
              </p>
            </div>
            <button className="mt-3 w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};