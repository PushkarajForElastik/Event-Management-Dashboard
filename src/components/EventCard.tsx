export default function EventCard(props: {
    eventName: string;
    eventDate: string;
    ticketPrice: number;
    ticketsSold: number;
}) {
    const date = new Date(props.eventDate);
    // To get only date from date time format
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return (
        <div className="p-4"> {/* each card container with padding for spacing */}
            <button
                className={"card event-card w-full h-full p-4 journal-entry rounded-2xl shadow-lg bg-white transition-transform duration-200 ease-in-out transform hover:translate-y-1 hover:shadow-xl"}
            >
                {/* Event Name and Icon */}
                <div className="flex justify-between items-center p-4">
                    <h3 className="text-lg font-bold">{props.eventName}</h3>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16">
                        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                    </svg>
                </div>
                {/* Event Date */}
                <div className="text-sm text-gray-600 px-4">{formattedDate}</div>
                {/* Ticket Price and Sales Statistics */}
                <figcaption className="p-4">
                    <div className="text-gray-800">
                        <span className="font-semibold">Price:</span> ${props.ticketPrice}
                    </div>
                    <div className="text-gray-800">
                        <span className="font-semibold">Tickets Sold:</span> {props.ticketsSold}
                    </div>
                </figcaption>
            </button>
        </div>
    );
}



