"use client";

import { useState } from "react";
import VehicleInfoCard from "./assignment-info-card";
// import { StatusUpdateCard } from "./status-update-card";
import { useParams, usePathname } from "next/navigation";
import { Requisition, Vehicle } from "@/lib/definitions";
// import { ActivityLogCard } from "./activity-log-card";
// import { RequisitionStatusBadge } from "./requisition-status-badge";

export function RequisitionDetailWrapper({
    requisition,
}: {
    requisition: Requisition;
}) {
    const [status, setStatus] = useState(requisition.status as string);
    const [assignedVehicle, setAssignedVehicle] = useState(requisition.vehicle);
    const [assignedDriver, setAssignedDriver] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [activityLog, setActivityLog] = useState([
        {
            type: "created",
            timestamp: requisition.createdAt,
            user: requisition.user.name,
            details: "Requisition Created",
        },
    ]);

    const pathname = usePathname();
    const param = useParams();
    console.log("pathname", pathname);
    console.log("param", param);

    // Handle status update
    const handleStatusUpdate = (newStatus: string) => {
        setIsUpdating(true);

        // Simulate API call
        setTimeout(() => {
            setStatus(newStatus);
            setIsUpdating(false);
            setShowSuccess(true);

            // Add to activity log
            setActivityLog((prev) => [
                ...prev,
                {
                    type: "status",
                    timestamp: "Just now",
                    user: "Admin",
                    details: `Status Updated to ${
                        newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
                    }`,
                },
            ]);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }, 1000);
    };

    // Handle vehicle assignment
    const handleVehicleAssign = (vehicle: Vehicle) => {
        setIsUpdating(true);

        // Simulate API call
        setTimeout(() => {
            setAssignedVehicle(vehicle);
            if (status === "pending") {
                setStatus("approved");

                // Add status update to activity log
                setActivityLog((prev) => [
                    ...prev,
                    {
                        type: "status",
                        timestamp: "Just now",
                        user: "Admin",
                        details: "Status Updated to Approved",
                    },
                ]);
            }

            // Add vehicle assignment to activity log
            setActivityLog((prev) => [
                ...prev,
                {
                    type: "vehicle",
                    timestamp: "Just now",
                    user: "Admin",
                    details: `Vehicle ${vehicle} Assigned`,
                },
            ]);

            setIsUpdating(false);
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }, 1000);
    };

    // Handle driver assignment
    const handleDriverAssign = (driverId: string) => {
        setIsUpdating(true);

        // Simulate API call
        setTimeout(() => {
            setAssignedDriver(driverId);

            // Add driver assignment to activity log
            setActivityLog((prev) => [
                ...prev,
                {
                    type: "driver",
                    timestamp: "Just now",
                    user: "Admin",
                    details: `Driver ${driverId} Assigned`,
                },
            ]);

            setIsUpdating(false);
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }, 1000);
    };

    return (
        <>
            {/* Status Badge */}
            <div className="absolute top-8 right-8">
                {/* <RequisitionStatusBadge status={status} /> */}
            </div>

            {/* Success message */}
            {showSuccess && (
                <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <span className="block sm:inline">
                        Requisition updated successfully!
                    </span>
                </div>
            )}

            {/* Vehicle and Driver Info Card */}
            {/* <VehicleInfoCard
                vehicleId={requisition.vehicleId}
                driverId={requisition.driverId}
                status={status}
                onVehicleAssign={handleVehicleAssign}
                onDriverAssign={handleDriverAssign}
            /> */}

            {/* Status Update Card */}
            {/* <StatusUpdateCard
                status={status}
                assignedVehicle={assignedVehicle}
                onStatusUpdate={handleStatusUpdate}
                onVehicleAssign={handleVehicleAssign}
                isUpdating={isUpdating}
            /> */}

            {/* Activity Log Card */}
            {/* <ActivityLogCard activityLog={activityLog} /> */}
        </>
    );
}
