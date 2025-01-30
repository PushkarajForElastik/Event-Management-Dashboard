export interface Event {
  id: string;
  eventName: string;
  eventDate: string;
  ticketPrice: string;
  ticketsSold: number;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  ticketType: string;
}
