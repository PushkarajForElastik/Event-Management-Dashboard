import {Event} from '../types/event'

export default function EventCard(props: Event) {
    const date = new Date(props.eventDate);
    // To get only date from date time format
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return (
<div className="p-4"> {/* each card container with padding for spacing */}
    <button
        className={
            "card event-card w-full h-full p-4 journal-entry rounded-2xl shadow-lg bg-white dark:bg-slate-900 transition-transform duration-200 ease-in-out transform hover:translate-y-1 hover:shadow-xl"
        }
    >
        <div className="flex items-center p-4 gap-4 dark:text-gray-300">
            {/* Event Name */}
            <h3 
                className="text-lg font-bold flex-1 break-words text-ellipsis overflow-hidden whitespace-normal"
                style={{ fontSize: "clamp(0.8rem, 2.5vw, 1rem)" }}
            >
                {props.eventName}
            </h3>

            {/* Responsive Image */}
            <img
    className="max-w-[30%] object-contain p-[5px] rounded-full bg-white-200 aspect-square"
    src={`https://avatar.iran.liara.run/public/${props.id}`}
    alt="Icon"
/>
        </div>
        {/* Event Date */}
        <div className="text-sm text-gray-600 dark:text-gray-300 px-4">{formattedDate}</div>
        {/* Ticket Price and Sales Statistics */}
        <figcaption className="p-4">
            <div className="text-gray-800 dark:text-gray-300">
                <span className="font-semibold">Price:</span> ${props.ticketPrice}
            </div>
            <div className="text-gray-800 dark:text-gray-300">
                <span className="font-semibold">Tickets Sold:</span> {props.ticketsSold}
            </div>
        </figcaption>
    </button>
</div>
    );
}



