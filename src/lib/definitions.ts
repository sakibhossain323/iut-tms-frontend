export type State = {
    message: string;
    errors?: Record<string, string[]>;
};

export type Approval = {
    id: string;
    requisitionId: string;
    approverUserId: string;
    approverRole: Role;
    approvalStatus: RequisitionStatus;
    approvalDate: string;
    comments: string;
    createdAt: string;
    updatedAt: string;
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
    vehicle: Vehicle | null;
    driver: Driver | null;
    placeToPickup: string;
    placesToVisit: string;
    notes?: string;
    user: {
        id: string;
        name: string;
        email: string;
        designation: string;
        role: string;
        department?: string;
        contactNumber: string;
    };
    createdAt: string;
    approvals: Approval[];
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
    department: string;
    role: Role;
    createdAt: string;
    eWalletBalance: number;
}

export enum DriverStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ON_LEAVE = "ON_LEAVE",
}

export interface Driver {
    id: string;
    licenseNumber: string;
    status: DriverStatus;
    createdAt: string;
    user: {
        id: string;
        name: string;
        email: string;
        contactNumber: string;
    };
}

export enum VehicleStatus {
    ACTIVE = "ACTIVE",
    UNDER_MAINTENANCE = "UNDER_MAINTENANCE",
    INACTIVE = "INACTIVE",
}

export interface Vehicle {
    id: string;
    registrationNumber: string;
    type: string;
    capacity: number;
    status: VehicleStatus;
    createdAt: string;
}
