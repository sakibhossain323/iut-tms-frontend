export type State = {
    message: string;
    errors?: Record<string, string[]>;
};

export enum RequisitionStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    COMPLETED = "COMPLETED",
}

export type Requisition = {
    id: string;
    department: string;
    purpose: string;
    dateTimeRequired: string;
    numberOfPassengers: number;
    status: RequisitionStatus;
    assignedVehicle: string | null;
    user: {
        id: string;
        name: string;
        email: string;
        designation: string;
        role: string;
    };
    createdAt: string;
};

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    DRIVER = "DRIVER",
    HOD = "HOD",
    TRANSPORT_OFFICER = "TRANSPORT_OFFICER",
}

export interface User {
    id: string;
    name: string;
    email: string;
    designation: string;
    contactNumber: string;
    role: Role;
    createdAt: string;
}

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
