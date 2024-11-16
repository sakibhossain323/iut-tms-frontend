import { MdOutlineCommute } from "react-icons/md";
import SingleTrip from "./singleTrip";

const Trips = () => {
    const trips = [
        {
            id: 1,
            title: "Trip Title",
            time: "12:00 PM; 12 July, 2024 (Wednesdy)",
            location: "Pick Up Location",
        },
        {
            id: 2,
            title: "Trip Title",
            time: "12:00 PM; 12 July, 2024 (Wednesdy)",
            location: "Pick Up Location",
        },
    ];

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl my-5">
            <div className="card-body">
                <h2 className="card-title text-2xl">
                    <MdOutlineCommute />
                    Upcoming Trips
                </h2>
                {trips.map((trip) => (
                    <SingleTrip
                        key={trip.id}
                        title={trip.title}
                        time={trip.time}
                        location={trip.location}
                    />
                ))}
            </div>
        </div>
    );
};

export default Trips;
