// pranav
export default function EventCard(props: {
    eventName: string;
    eventIcon: string;
    eventDate: string;
    ticketPrice: string;
    ticketsSold: number;
}) {
    const date = new Date(props.eventDate);
    // To get only date from date time format
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return (
        <div className="p-4"> {/* each card container with padding for spacing */}
            <button
                className={ "card event-card w-full h-full p-4 journal-entry rounded-2xl shadow-lg bg-white transition-transform duration-200 ease-in-out transform hover:translate-y-1 hover:shadow-xl"}
            >
                {/* Event Name and Icon */}
                <div className="flex justify-between items-center p-4">
                    <h3 className="text-lg font-bold">{props.eventName}</h3>
                    <img
                        src={props.eventIcon}
                        alt="Event Icon"
                        className="h-8 w-8 object-contain"
                    />
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






// Riya Infinite Scrolling