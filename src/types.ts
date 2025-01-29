export interface Attendee {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Event {
    id: number;
    name: string;
    date: string;
    venue: string;
    ticketPrice: number;
    ticketSales: number;
    attendees: Attendee[];
    attendeeCount: number;
  }
  