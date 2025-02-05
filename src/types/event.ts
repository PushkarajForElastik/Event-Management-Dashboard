export interface Event {
  id: string;
  eventName: string;
  eventDate: string;
  ticketPrice: number;
  ticketsSold: number;
  eventIcon:string;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  ticketType: string;
  eventId: string;
}
