import { Event } from '../types/event';

export const events: Event[] = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "2025-03-10",
    venue: "Tech Park, San Francisco",
    ticketPrice: 150,
    ticketSales: 500,
    attendees: [
      { id: 1, name: "John Doe", email: "john.doe@example.com" },
      { id: 2, name: "Jane Smith", email: "jane.smith@example.com" }
    ],
    attendeeCount: 2
  },
  {
    id: 2,
    name: "Health Expo 2025",
    date: "2025-04-05",
    venue: "Health Center, Los Angeles",
    ticketPrice: 100,
    ticketSales: 300,
    attendees: [
      { id: 3, name: "Alice Green", email: "alice.green@example.com" }
    ],
    attendeeCount: 1
  },
  {
    id: 3,
    name: "Music Fest 2025",
    date: "2025-05-01",
    venue: "Downtown Arena, New York",
    ticketPrice: 120,
    ticketSales: 1000,
    attendees: [
      { id: 4, name: "Bob White", email: "bob.white@example.com" },
      { id: 5, name: "Sara Black", email: "sara.black@example.com" },
      { id: 6, name: "Tom Hanks", email: "tom.hanks@example.com" }
    ],
    attendeeCount: 3
  },
  {
    id: 4,
    name: "Startup Summit 2025",
    date: "2025-06-15",
    venue: "Innovation Hub, Seattle",
    ticketPrice: 200,
    ticketSales: 250,
    attendees: [
      { id: 7, name: "Nancy White", email: "nancy.white@example.com" }
    ],
    attendeeCount: 1
  },
  {
    id: 5,
    name: "Gaming Con 2025",
    date: "2025-07-20",
    venue: "Gaming Center, Las Vegas",
    ticketPrice: 80,
    ticketSales: 800,
    attendees: [
      { id: 8, name: "Steve Jobs", email: "steve.jobs@example.com" },
      { id: 9, name: "Rachel Green", email: "rachel.green@example.com" },
      { id: 10, name: "Mike Wazowski", email: "mike.wazowski@example.com" },
      { id: 11, name: "Emma Watson", email: "emma.watson@example.com" }
    ],
    attendeeCount: 4
  },
  {
    id: 6,
    name: "AI & Machine Learning Summit",
    date: "2025-08-11",
    venue: "AI Center, Boston",
    ticketPrice: 250,
    ticketSales: 450,
    attendees: [
      { id: 12, name: "David Lee", email: "david.lee@example.com" },
      { id: 13, name: "Jessica Liu", email: "jessica.liu@example.com" },
      { id: 14, name: "Marcus Chan", email: "marcus.chan@example.com" }
    ],
    attendeeCount: 3
  },
  {
    id: 7,
    name: "Digital Marketing Summit",
    date: "2025-09-25",
    venue: "Convention Center, Chicago",
    ticketPrice: 180,
    ticketSales: 350,
    attendees: [
      { id: 15, name: "Daniel Kim", email: "daniel.kim@example.com" }
    ],
    attendeeCount: 1
  },
  {
    id: 8,
    name: "Fashion Week 2025",
    date: "2025-10-05",
    venue: "Fashion Plaza, Paris",
    ticketPrice: 300,
    ticketSales: 200,
    attendees: [
      { id: 16, name: "Lily Collins", email: "lily.collins@example.com" }
    ],
    attendeeCount: 1
  },
  {
    id: 9,
    name: "Photography Expo 2025",
    date: "2025-11-12",
    venue: "Photo Hall, London",
    ticketPrice: 150,
    ticketSales: 700,
    attendees: [
      { id: 17, name: "James Brooks", email: "james.brooks@example.com" },
      { id: 18, name: "Sophia Taylor", email: "sophia.taylor@example.com" }
    ],
    attendeeCount: 2
  },
  {
    id: 10,
    name: "Food Festival 2025",
    date: "2025-12-20",
    venue: "Food Park, Miami",
    ticketPrice: 60,
    ticketSales: 1200,
    attendees: [
      { id: 19, name: "Olivia Pope", email: "olivia.pope@example.com" },
      { id: 20, name: "Ben Affleck", email: "ben.affleck@example.com" },
      { id: 21, name: "Chris Hemsworth", email: "chris.hemsworth@example.com" },
      { id: 22, name: "Natalie Portman", email: "natalie.portman@example.com" }
    ],
    attendeeCount: 4
  },
  {
    id: 11,
    name: "Blockchain Summit 2025",
    date: "2025-01-10",
    venue: "Tech Hub, Berlin",
    ticketPrice: 220,
    ticketSales: 250,
    attendees: [
      { id: 23, name: "Peter Parker", email: "peter.parker@example.com" }
    ],
    attendeeCount: 1
  },
  {
    id: 12,
    name: "Space Tech Expo 2025",
    date: "2025-02-02",
    venue: "Space Center, Houston",
    ticketPrice: 300,
    ticketSales: 500,
    attendees: [
      { id: 24, name: "Bruce Wayne", email: "bruce.wayne@example.com" },
      { id: 25, name: "Clark Kent", email: "clark.kent@example.com" }
    ],
    attendeeCount: 2
  },
  {
    id: 13,
    name: "Startup Pitch Event 2025",
    date: "2025-03-25",
    venue: "Startup Hub, Austin",
    ticketPrice: 150,
    ticketSales: 700,
    attendees: [
      { id: 26, name: "Peter Griffin", email: "peter.griffin@example.com" },
      { id: 27, name: "Meg Griffin", email: "meg.griffin@example.com" },
      { id: 28, name: "Lois Griffin", email: "lois.griffin@example.com" }
    ],
    attendeeCount: 3
  },
  {
    id: 14,
    name: "E-commerce Conference 2025",
    date: "2025-04-12",
    venue: "E-commerce Arena, Tokyo",
    ticketPrice: 250,
    ticketSales: 600,
    attendees: [
      { id: 29, name: "Hannah Montana", email: "hannah.montana@example.com" }
    ],
    attendeeCount: 1
  },
  {
    id: 15,
    name: "Digital Transformation Summit",
    date: "2025-05-08",
    venue: "Tech Park, Dubai",
    ticketPrice: 200,
    ticketSales: 450,
    attendees: [
      { id: 30, name: "Jared Leto", email: "jared.leto@example.com" },
      { id: 31, name: "Jared Kushner", email: "jared.kushner@example.com" }
    ],
    attendeeCount: 2
  },
  {
    id: 16,
    name: "Robotics Expo 2025",
    date: "2025-06-16",
    venue: "Robot Center, San Diego",
    ticketPrice: 180,
    ticketSales: 700,
    attendees: [
      { id: 32, name: "Matthew Perry", email: "matthew.perry@example.com" },
      { id: 33, name: "Courtney Cox", email: "courtney.cox@example.com" }
    ],
    attendeeCount: 2
  },
  {
    id: 17,
    name: "Cybersecurity Conference",
    date: "2025-07-09",
    venue: "Cyber Arena, San Francisco",
    ticketPrice: 220,
    ticketSales: 900,
    attendees: [
      { id: 34, name: "Rachel Adams", email: "rachel.adams@example.com" }
    ],
    attendeeCount: 1
  },
  {
    id: 18,
    name: "IoT Expo 2025",
    date: "2025-08-14",
    venue: "Tech Expo Hall, Milan",
    ticketPrice: 200,
    ticketSales: 350,
    attendees: [
      { id: 35, name: "Tom Cruise", email: "tom.cruise@example.com" }
    ],
    attendeeCount: 1
  },
  {
    id: 19,
    name: "AI & Robotics World Expo",
    date: "2025-09-18",
    venue: "AI World Center, Toronto",
    ticketPrice: 230,
    ticketSales: 1000,
    attendees: [
      { id: 36, name: "Margot Robbie", email: "margot.robbie@example.com" },
      { id: 37, name: "Will Smith", email: "will.smith@example.com" }
    ],
    attendeeCount: 2
  },
  {
    id: 20,
    name: "Innovation Summit 2025",
    date: "2025-10-20",
    venue: "Innovation Arena, Singapore",
    ticketPrice: 250,
    ticketSales: 800,
    attendees: [
      { id: 38, name: "Mark Zuckerberg", email: "mark.zuckerberg@example.com" },
      { id: 39, name: "Sundar Pichai", email: "sundar.pichai@example.com" },
      { id: 40, name: "Satya Nadella", email: "satya.nadella@example.com" }
    ],
    attendeeCount: 3
  }
];
