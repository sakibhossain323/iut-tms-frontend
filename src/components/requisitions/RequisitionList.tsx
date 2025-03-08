import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Requisition } from "@/lib/definitions";
import { getServerSession } from "next-auth";
import { format } from "date-fns";
import {
    LuBan,
    LuCalendarCheck,
    LuCalendarX,
    LuCheckCircle,
} from "react-icons/lu";
import { MdPinDrop } from "react-icons/md";
import { BsQuestionDiamond } from "react-icons/bs";
import Link from "next/link";
import PaginationBar from "./PaginationBar";

export default async function RequisitionList({ page }: { page: string }) {
    const session = await getServerSession(authOptions);
    const res = await fetch(
        process.env.BACKEND_BASE_URL +
            "/requisitions?sort=created_at,desc&page=" +
            page,
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
    const {
        requisitions,
        totalCount,
    }: { requisitions: Requisition[]; totalCount: number } = await res.json();

    const statuses = {
        PENDING: {
            icon: BsQuestionDiamond,
            color: "text-yellow-600",
            label: "Pending",
        },
        COMPLETED: {
            icon: LuCheckCircle,
            color: "text-green-600",
            label: "Approved",
        },
        REJECTED: {
            icon: LuBan,
            color: "text-red-600",
            label: "Rejected",
        },
        OTHERS: {
            icon: BsQuestionDiamond,
            color: "text-blue-600",
            label: "In Review",
        },
    };

    const getStatus = (status: string) => {
        return statuses[status as keyof typeof statuses] || statuses.OTHERS;
    };

    return (
        <div className="flow-root min-w-full mt-6">
            <div>
                {requisitions?.map((requisition) => {
                    const Icon = getStatus(requisition.status).icon;
                    return (
                        <div
                            className="w-full grid grid-cols-12 rounded-md border-b gap-y-3 py-4"
                            key={requisition.id}
                        >
                            <div className="col-span-full text-lg font-medium mb-2">
                                <h3>{requisition.purpose}</h3>
                            </div>
                            <div className="col-span-full md:col-span-10 grid grid-cols-subgrid">
                                <div className="col-span-6 md:col-span-5 flex gap-x-1">
                                    <LuCalendarCheck
                                        size={18}
                                        className="text-green-600"
                                    />
                                    <div className="flex flex-col">
                                        <div className="flex gap-1">
                                            <span className="text-sm text-gray-600">
                                                Start:
                                            </span>
                                            <span className="text-sm font-medium">
                                                {format(
                                                    new Date(
                                                        requisition.date_required
                                                    ),
                                                    "hh:mm a"
                                                )}
                                            </span>
                                        </div>
                                        <span className="text-sm">
                                            {format(
                                                new Date(
                                                    requisition.date_required
                                                ),
                                                "MMM dd, yyyy"
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-5 flex gap-x-1">
                                    <LuCalendarX
                                        size={18}
                                        className="text-red-600"
                                    />
                                    <div className="flex flex-col">
                                        <div className="flex gap-1">
                                            <span className="text-sm text-gray-600">
                                                End:
                                            </span>
                                            <span className="text-sm font-medium">
                                                {format(
                                                    new Date(
                                                        requisition.return_date
                                                    ),
                                                    "hh:mm a"
                                                )}
                                            </span>
                                        </div>
                                        <span className="text-sm">
                                            {format(
                                                new Date(
                                                    requisition.return_date
                                                ),
                                                "MMM dd, yyyy"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-full md:col-span-10 flex gap-x-1">
                                <MdPinDrop
                                    size={18}
                                    className="self-center text-red-600"
                                />
                                <div className="flex gap-1">
                                    <span className="text-sm text-gray-500">
                                        Destination:
                                    </span>
                                    <span className="text-sm">
                                        {requisition.destination}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-full md:col-span-10 flex gap-x-1">
                                <Icon
                                    size={18}
                                    className={
                                        getStatus(requisition.status).color
                                    }
                                />
                                <div className="flex gap-1">
                                    <span className="text-sm text-gray-500">
                                        Status:
                                    </span>
                                    <span className="text-sm">
                                        {getStatus(requisition.status).label}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-full md:row-start-2 md:col-start-11 md:col-span-2 md:justify-self-end">
                                <Link
                                    href={`/dashboard/requisitions/${requisition.id}`}
                                    className="w-full flex h-10 items-center justify-center rounded-lg px-4 gap-2 text-sm font-medium text-white
                                bg-blue-600 hover:bg-indigo-600"
                                >
                                    <span className="text-center">
                                        View Details
                                    </span>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-20">
                <PaginationBar total={totalCount} />
            </div>
        </div>
    );
}
