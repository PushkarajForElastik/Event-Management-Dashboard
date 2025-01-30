import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Event } from '../types/event';

type SortField = 'date' | 'ticketPrice' | 'ticketSales' | 'attendeeCount';
type SortOrder = 'asc' | 'desc';

interface EventTableProps {
  events: Event[];
}

export const EventList: React.FC<EventTableProps> = ({ events: initialEvents }) => {
  const [events, setEvents] = useState(initialEvents);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    const newSortOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedEvents = [...events].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (field === 'date') {
        return newSortOrder === 'asc' 
          ? new Date(aValue).getTime() - new Date(bValue).getTime()
          : new Date(bValue).getTime() - new Date(aValue).getTime();
      }

      return newSortOrder === 'asc' 
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });

    setEvents(sortedEvents);
  };

  const SortButton: React.FC<{ field: SortField; label: string }> = ({ field, label }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
    >
      {label}
      <ArrowUpDown className={`h-4 w-4 ${sortField === field ? 'text-blue-600' : 'text-gray-400'}`} />
    </button>
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton field="date" label="Date" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Venue
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton field="ticketPrice" label="Ticket Price" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton field="ticketSales" label="Ticket Sales" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton field="attendeeCount" label="Attendees" />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {event.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {event.venue}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${event.ticketPrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {event.ticketSales}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {event.attendeeCount}
              </td>
              <td className="px-6 py-4">
                <button
                  className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition-all"
                >
                  View Attendees
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};