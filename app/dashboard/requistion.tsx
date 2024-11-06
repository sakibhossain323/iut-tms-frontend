import { MdOutlinePendingActions } from "react-icons/md";
import SingleRequisition from "./singleRequisition";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export interface Requisition {
    id: number;
    user_id: number;
    purpose: string;
    destination: string;
    date_required: string;
    return_date: string;
    number_of_passengers: number;
    status: string;
    contact_number: string;
    vehicle_id: number | null;
    driver_id: number | null;
    hod_approval_date: string | null;
    chairman_approval_date: string | null;
    vc_approval_date: string | null;
    rejection_reason: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

const RequistionStatus = async () => {
    const session = await getServerSession(authOptions);
    const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/requisitions",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        }
    );

    if (!res.ok) {
        return <div>Failed to fetch data</div>;
    }

    const { requisitions, totalCount } = await res.json();

    if (totalCount === 0) {
        return <div>No requisitions found</div>;
    }

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
                        <Link href="/requisition/new">
                            <button className="btn btn-info">
                                Request A Vehicle
                            </button>
                        </Link>
                    </div>
                </div>
                {requisitions.map((requisition: Requisition) => (
                    <SingleRequisition
                        key={requisition?.id}
                        title={requisition?.purpose}
                        time={new Date(
                            requisition?.date_required
                        ).toLocaleString()}
                        location={requisition?.destination}
                    />
                ))}
            </div>
        </div>
    );
};

export default RequistionStatus;
