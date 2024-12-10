import { getReqStat, Requisition } from "@/lib/definitions";
import Link from "next/link";
import { format } from "date-fns";
import { LuCalendarCheck, LuCalendarX, LuPhoneCall } from "react-icons/lu";
import { MdPinDrop } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { GoGoal } from "react-icons/go";

export default async function RequisitionDetails({
    requisition,
}: {
    requisition: Requisition;
}) {
    return (
        <div className="w-full grid grid-cols-12 rounded-md gap-y-4 p-4">
            {/* Purpose */}
            <div className="col-span-full flex mb-2">
                <GoGoal size={22} className="text-blue-600" />
                <div className="flex-col ml-2">
                    <h2 className="block text-lg leading-tight font-semibold">
                        Purpose:
                    </h2>
                    <p className="mt-2">{requisition.purpose}</p>
                </div>
            </div>

            {/* Start */}
            <div className="col-span-full flex mb-2">
                <LuCalendarCheck size={22} className="text-green-600" />
                <div className="flex-col ml-2">
                    <h2 className="block text-lg leading-tight   font-semibold">
                        Start:
                    </h2>
                    <p className="mt-2">
                        {format(
                            new Date(requisition.date_required),
                            "hh:mm a; MMM dd, yyyy"
                        )}
                    </p>
                </div>
            </div>

            {/* End */}
            <div className="col-span-full flex mb-2">
                <LuCalendarX size={22} className="text-red-600" />
                <div className="flex-col ml-2">
                    <h2 className="block text-lg leading-tight font-semibold">
                        End:
                    </h2>
                    <p className="mt-2">
                        {format(
                            new Date(requisition.return_date),
                            "hh:mm a; MMM dd, yyyy"
                        )}
                    </p>
                </div>
            </div>

            {/* Destination */}
            <div className="col-span-full flex mb-2">
                <MdPinDrop size={22} className="text-red-600" />
                <div className="flex-col ml-2">
                    <h2 className="block text-lg leading-tight font-semibold">
                        Destination:
                    </h2>
                    <p className="mt-2">{requisition.destination}</p>
                </div>
            </div>

            {/* Passengers */}
            <div className="col-span-full flex mb-2">
                <BsPeopleFill size={22} className="text-blue-600" />
                <div className="flex-col ml-2">
                    <h2 className="block text-lg leading-tight font-semibold">
                        Passengers:
                    </h2>
                    <p className="mt-2">{requisition.number_of_passengers}</p>
                </div>
            </div>

            {/* Contact */}
            <div className="col-span-full flex mb-2">
                <LuPhoneCall size={22} className="text-green-600" />
                <div className="flex-col ml-2">
                    <h2 className="block text-lg leading-tight font-semibold">
                        Contact:
                    </h2>
                    <p className="mt-2">{requisition.contact_number}</p>
                </div>
            </div>
        </div>
    );
}
