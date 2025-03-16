"use server";

import {
    getDrivers,
    updateDriverStatus,
    addDriver,
    searchUsers,
} from "@/lib/data/mock-data";
import { revalidatePath } from "next/cache";
import { Driver, DriverStatus } from "@/lib/definitions";

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
    await new Promise((resolve) => setTimeout(resolve, 500));
    let drivers = getDrivers();
    // const session = await getServerSession(authOptions);
    //     const url = process.env.BACKEND_BASE_URL + "/requisitions/all";
    //     const response = await fetch(url, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${session?.accessToken}`,
    //         },
    //     });

    //     if (!response.ok) {
    //         throw new Error("Failed to fetch requisitions");
    //     }
    //     const requisitions: Requisition[] = await response.json();

    const filteredDrivers = drivers.filter((driver) => {
        // Filter by status
        if (statusFilter !== "all" && driver.status !== statusFilter) {
            return false;
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                driver.email.toLowerCase().includes(query) ||
                driver.name.toLowerCase().includes(query) ||
                driver.contact.toLowerCase().includes(query) ||
                driver.id.toLowerCase().includes(query)
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
    const paginatedRequisitions = filteredDrivers.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return {
        data: paginatedRequisitions,
        totalItems,
        totalPages,
        currentPage: page,
    };
}

// Update driver status
export async function updateDriverStatusAction(formData: FormData) {
    try {
        const driverId = formData.get("driverId") as string;
        const status = formData.get("status") as DriverStatus;

        if (!driverId) {
            return {
                success: false,
                error: { message: "Driver ID is required" },
            };
        }

        if (!status || !["ACTIVE", "INACTIVE", "ON_LEAVE"].includes(status)) {
            return {
                success: false,
                error: { message: "Please select a valid status" },
            };
        }

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const updatedDriver = updateDriverStatus(driverId, status);

        if (!updatedDriver) {
            return {
                success: false,
                error: { message: "Driver not found" },
            };
        }

        revalidatePath("/drivers");

        return {
            success: true,
            driver: updatedDriver,
        };
    } catch (error) {
        console.error("Error updating driver status:", error);
        return {
            success: false,
            error: { message: "Failed to update driver status" },
        };
    }
}

// Add a new driver
export async function addDriverAction(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const licenseNumber = formData.get("licenseNumber") as string;
        const licenseType = formData.get("licenseType") as string;
        const contact = formData.get("contact") as string;
        const email = formData.get("email") as string;
        const experience = formData.get("experience") as string;
        const status = formData.get("status") as DriverStatus;
        const userId = (formData.get("userId") as string) || undefined;

        // Validate required fields
        const errors: Record<string, string> = {};

        if (!name) errors.name = "Name is required";
        if (!licenseNumber) errors.licenseNumber = "License number is required";
        if (!licenseType) errors.licenseType = "License type is required";
        if (!contact) errors.contact = "Contact number is required";
        if (!email) errors.email = "Email is required";
        if (!experience) errors.experience = "Experience is required";
        if (!status || !["ACTIVE", "INACTIVE", "ON_LEAVE"].includes(status)) {
            errors.status = "Please select a valid status";
        }

        if (Object.keys(errors).length > 0) {
            return {
                success: false,
                error: errors,
            };
        }

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newDriver = addDriver({
            name,
            licenseNumber,
            licenseType,
            contact,
            email,
            experience,
            status,
            userId,
            createdAt: new Date().toISOString(),
        });

        revalidatePath("/drivers");

        return {
            success: true,
            driver: newDriver,
        };
    } catch (error) {
        console.error("Error adding driver:", error);
        return {
            success: false,
            error: { message: "Failed to add driver" },
        };
    }
}

// Search users for driver assignment
export async function searchUsersAction(search: string) {
    try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        if (!search || search.length < 2) {
            return {
                success: true,
                users: [],
            };
        }

        const users = searchUsers(search);

        return {
            success: true,
            users,
        };
    } catch (error) {
        console.error("Error searching users:", error);
        return {
            success: false,
            error: "Failed to search users",
            users: [],
        };
    }
}
