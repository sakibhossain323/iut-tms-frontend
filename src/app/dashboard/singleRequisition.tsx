import { CiLocationOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";

interface Requisition {
    title: string;
    time: string;
    location: string;
}

const SingleRequisition = ({ title, time, location }: Requisition) => {
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl my-2">
            <div className="card-body">
                <div className="flex">
                    <div className="flex-1">
                        <h3 className="card-title my-2">{title}</h3>
                        <div>
                            <IoTimeOutline
                                size={22}
                                className="inline-block mr-1"
                            />
                            <span className="text-sm mx-1">{time}</span>
                        </div>
                        <div>
                            <CiLocationOn size={22} className="inline-block" />
                            <span className="text-sm mx-1">{location}</span>
                        </div>
                        <ul className="steps my-5">
                            <li className="step step-success">Request Made</li>
                            <li className="step step-success">
                                Approved By HOD
                            </li>
                            <li className="step">Approved By VC</li>
                            <li className="step">Vehicle Assinged</li>
                        </ul>
                    </div>

                    <div className="flex-none">
                        <div className="card-actions my-3">
                            <button className="btn btn-info w-full">
                                View Details
                            </button>
                        </div>
                        <div className="card-actions">
                            <button className="btn btn-error w-full">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleRequisition;
