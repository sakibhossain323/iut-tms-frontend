import { MdOutlinePendingActions } from "react-icons/md";
import SingleRequisition from "./singleRequisition";

const RequistionStatus = () => {
    const requisitions = [
        {
            id: 1,
            title: "Requisition Title",
            time: "12:00 PM; 12 July, 2024 (Wednesdy)",
            location: "Pick Up Location",
        },
        {
            id: 2,
            title: "Requisition Title",
            time: "12:00 PM; 12 July, 2024 (Wednesdy)",
            location: "Pick Up Location",
        },
    ];
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl my-5">
            <div className="card-body">
                <div className="flex">
                    <div className="flex-1">
                        <h2 className="card-title text-2xl mt-5">
                            <MdOutlinePendingActions />
                            Requistion Status
                        </h2>
                    </div>
                    <div className="card-actions my-3">
                        <button className="btn btn-info">
                            Request A Vehicle
                        </button>
                    </div>
                </div>
                {requisitions.map((requisition) => (
                    <SingleRequisition
                        key={requisition.id}
                        title={requisition.title}
                        time={requisition.time}
                        location={requisition.location}
                    />
                ))}
            </div>
        </div>
    );
};

export default RequistionStatus;
