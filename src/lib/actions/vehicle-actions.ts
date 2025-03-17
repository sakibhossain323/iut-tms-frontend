"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Vehicle, VehicleStatus } from "@/lib/definitions";
import { fetchUsersAction } from "./user-actions";

// Define the filter parameters type
export type VehicleFilterParams = {
    searchQuery?: string;
    statusFilter?: string;
    sortBy?: string;
    sortDirection?: "asc" | "desc";
    page?: number;
    itemsPerPage?: number;
};

export type VehiclePagination = {
    data: Vehicle[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
};

// Fetch vehicles with filtering, sorting, and pagination
export async function fetchVehiclesAction({
    searchQuery = "",
    statusFilter = "all",
    page = 1,
    itemsPerPage = 5,
    sortBy = "createdAt",
    sortDirection = "desc",
}: VehicleFilterParams): Promise<VehiclePagination> {
    const session = await getServerSession(authOptions);
    const url = process.env.BACKEND_BASE_URL + "/vehicles";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch vehicles");
    }
    const vehicles: Vehicle[] = await response.json();

    const filteredVehicles = vehicles.filter((vehicle) => {
        // Filter by status
        if (statusFilter !== "all" && vehicle.status !== statusFilter) {
            return false;
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                vehicle?.id.toLowerCase().includes(query) ||
                vehicle?.registrationNumber.toLowerCase().includes(query) ||
                vehicle?.type.toLowerCase().includes(query) ||
                vehicle?.capacity.toString().includes(query)
            );
        }

        return true;
    });

    filteredVehicles.sort((a, b) => {
        if (sortBy === "createdAt") {
            return sortDirection === "asc"
                ? a.createdAt.localeCompare(b.createdAt)
                : b.createdAt.localeCompare(a.createdAt);
        } else if (sortBy === "capacity") {
            return sortDirection === "asc"
                ? a.capacity - b.capacity
                : b.capacity - a.capacity;
        } else {
            const aValue = String(a[sortBy as keyof Vehicle]).toLowerCase();
            const bValue = String(b[sortBy as keyof Vehicle]).toLowerCase();

            return sortDirection === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
    });

    // Calculate pagination
    const totalItems = filteredVehicles.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedVehicles = filteredVehicles.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return {
        data: paginatedVehicles,
        totalItems,
        totalPages,
        currentPage: page,
    };
}

// Schema to validate the input
const UpdateVehicleStatusSchema = z.object({
    vehicleId: z.string().min(1, "Vehicle ID is required"),
    status: z.enum(
        [
            VehicleStatus.ACTIVE,
            VehicleStatus.INACTIVE,
            VehicleStatus.UNDER_MAINTENANCE,
        ],
        {
            errorMap: () => ({ message: "Invalid status value" }),
        }
    ),
});

// Type for the return value
export type UpdateVehicleStatusResult = {
    success: boolean;
    error?: {
        status?: string[];
        vehicleId?: string[];
    };
    message: string;
};

export async function updateVehicleStatusAction(
    prevState: UpdateVehicleStatusResult,
    formData: FormData
): Promise<UpdateVehicleStatusResult> {
    try {
        // Extract values from form data
        const vehicleId = formData.get("vehicleId") as string;
        const status = formData.get("status") as string;

        // Validate input
        const validatedData = UpdateVehicleStatusSchema.safeParse({
            vehicleId,
            status,
        });

        if (!validatedData.success) {
            return {
                success: false,
                error: validatedData.error.flatten().fieldErrors,
                message: "Invalid input",
            };
        }

        const session = await getServerSession(authOptions);
        const url = process.env.BACKEND_BASE_URL + "/vehicles/" + vehicleId;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify({
                status: status,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to to update status");
        }

        // Revalidate related paths to update UI
        revalidatePath("/admin/vehicles");

        return {
            success: true,
            message: "Vehicle status updated successfully",
        };
    } catch (error) {
        console.error("Failed to update vehicle status:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred",
        };
    }
}

const AddVehicleSchema = z.object({
    registrationNumber: z.string().min(1, "Registration number is required"),
    type: z.string().min(1, "type is required"),
    capacity: z.number().int().min(1, "Capacity must be a positive integer"),
});

// // Add a new vehicle
export type AddVehicleResult = {
    success: boolean;
    errors?: {
        registrationNumber?: string[];
        type?: string[];
        capacity?: string[];
        _form?: string[];
    };
    message: string;
};

export async function AddVehicleAction(
    prevState: AddVehicleResult,
    formData: FormData
): Promise<AddVehicleResult> {
    // Validate form data
    const validatedFields = AddVehicleSchema.safeParse({
        registrationNumber: formData.get("registrationNumber") as string,
        type: formData.get("type") as string,
        capacity: parseInt(formData.get("capacity") as string),
    });

    // If validation fails, return errors
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
            message: "Please correct the errors in the form.",
        };
    }

    // Destructure validated data
    const { registrationNumber, type, capacity } = validatedFields.data;

    try {
        const body = {
            registrationNumber,
            type,
            capacity,
        };

        const session = await getServerSession(authOptions);
        const url = process.env.BACKEND_BASE_URL + "/vehicles";
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            // Handle non-2xx status codes
            const data = await res.json();
            console.error("Failed adding a new vehicle:", data);
            return {
                errors: data.errors,
                success: false,
                message: data.message || "Failed adding a new vehicle.",
            };
        }

        // Return success state
        return {
            success: true,
            message: "Vehicle added successfully!",
        };
    } catch (error) {
        // Generic error
        return {
            errors: {
                _form: ["Something went wrong. Please try again."],
            },
            success: false,
            message: "Failed adding a new vehicle.",
        };
    }
}
