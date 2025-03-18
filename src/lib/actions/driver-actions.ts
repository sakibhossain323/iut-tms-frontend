"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Driver, DriverStatus } from "@/lib/definitions";
import { fetchUsersAction } from "./user-actions";

// Define the filter parameters type
export type DriverFilterParams = {
    searchQuery?: string;
    statusFilter?: string;
    sortBy?: string;
    sortDirection?: "asc" | "desc";
    page?: number;
    itemsPerPage?: number;
};

export type DriverPagination = {
    data: Driver[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
};

// Fetch drivers with filtering, sorting, and pagination
export async function fetchDriversAction({
    searchQuery = "",
    statusFilter = "all",
    page = 1,
    itemsPerPage = 5,
    sortBy = "createdAt",
    sortDirection = "desc",
}: DriverFilterParams): Promise<DriverPagination> {
    const session = await getServerSession(authOptions);
    const url = process.env.BACKEND_BASE_URL + "/drivers";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch drivers");
    }
    const drivers: Driver[] = await response.json();

    const filteredDrivers = drivers.filter((driver) => {
        // Filter by status
        if (statusFilter !== "all" && driver.status !== statusFilter) {
            return false;
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                driver?.id.toLowerCase().includes(query) ||
                driver?.licenseNumber.toLowerCase().includes(query) ||
                driver?.user?.name.toLowerCase().includes(query) ||
                driver?.user?.email.toLowerCase().includes(query) ||
                driver?.user?.contactNumber.toLowerCase().includes(query)
            );
        }

        return true;
    });

    filteredDrivers.sort((a, b) => {
        if (sortBy === "createdAt") {
            return sortDirection === "asc"
                ? a.createdAt.localeCompare(b.createdAt)
                : b.createdAt.localeCompare(a.createdAt);
        } else {
            const aValue = String(a[sortBy as keyof Driver]).toLowerCase();
            const bValue = String(b[sortBy as keyof Driver]).toLowerCase();

            return sortDirection === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
    });

    // Calculate pagination
    const totalItems = filteredDrivers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedDrivers = filteredDrivers.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return {
        data: paginatedDrivers,
        totalItems,
        totalPages,
        currentPage: page,
    };
}

// Schema to validate the input
const UpdateDriverStatusSchema = z.object({
    driverId: z.string().min(1, "Driver ID is required"),
    status: z.enum(
        [DriverStatus.ACTIVE, DriverStatus.INACTIVE, DriverStatus.ON_LEAVE],
        {
            errorMap: () => ({ message: "Invalid status value" }),
        }
    ),
});

// Type for the return value
export type UpdateDriverStatusResult = {
    success: boolean;
    error?: {
        status?: string[];
        driverId?: string[];
    };
    message: string;
};

export async function updateDriverStatusAction(
    prevState: UpdateDriverStatusResult,
    formData: FormData
): Promise<UpdateDriverStatusResult> {
    try {
        // Extract values from form data
        const driverId = formData.get("driverId") as string;
        const status = formData.get("status") as string;

        // Validate input
        const validatedData = UpdateDriverStatusSchema.safeParse({
            driverId,
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
        const url = process.env.BACKEND_BASE_URL + "/drivers/" + driverId;
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
        revalidatePath("/admin/drivers");

        return {
            success: true,
            message: "Driver status updated successfully",
        };
    } catch (error) {
        console.error("Failed to update driver status:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred",
        };
    }
}

const AddDriverSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    licenseNumber: z.string().min(1, "License number is required"),
});

// // Add a new driver
export type AddDriverResult = {
    success: boolean;
    errors?: {
        email?: string[];
        licenseNumber?: string[];
        _form?: string[];
    };
    message: string;
};

export async function AddDriverAction(
    prevState: AddDriverResult,
    formData: FormData
): Promise<AddDriverResult> {
    // Validate form data
    const validatedFields = AddDriverSchema.safeParse({
        email: formData.get("email"),
        licenseNumber: formData.get("licenseNumber"),
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
    const { email, licenseNumber } = validatedFields.data;

    try {
        const fetchedUsers = await fetchUsersAction({ search: email });
        const user = fetchedUsers.users.find((user) => user.email === email);

        if (!user) {
            return {
                errors: {
                    email: ["User not found"],
                },
                success: false,
                message: "User not found",
            };
        }

        const body = {
            userId: user.id,
            licenseNumber,
        };

        const session = await getServerSession(authOptions);
        const url = process.env.BACKEND_BASE_URL + "/drivers";
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
            console.error("Failed adding a new driver:", data);
            return {
                errors: data.errors,
                success: false,
                message: data.message || "Failed adding a new driver.",
            };
        }

        // Return success state
        return {
            success: true,
            message: "Driver added successfully!",
        };
    } catch (error) {
        // Generic error
        return {
            errors: {
                _form: ["Something went wrong. Please try again."],
            },
            success: false,
            message: "Failed adding a new driver.",
        };
    }
}
