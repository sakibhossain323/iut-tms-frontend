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

export type State = {
    message: string;
    errors?: Record<string, string[]>;
};

export function getReqStat(status: string) {
    const statuses = {
        PENDING: {
            color: "text-yellow-600",
            label: "Pending",
        },
        COMPLETED: {
            color: "text-green-600",
            label: "Approved",
        },
        REJECTED: {
            color: "text-red-600",
            label: "Rejected",
        },
        OTHERS: {
            color: "text-blue-600",
            label: "In Review",
        },
    };
    return statuses[status as keyof typeof statuses] || statuses.OTHERS;
}
