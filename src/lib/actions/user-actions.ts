"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User, Role } from "@/lib/definitions";
import { getServerSession } from "next-auth";

export type GetUsersParams = {
    page?: number;
    limit?: number;
    role?: Role | "All";
    search?: string;
    sortBy?: keyof User;
    sortDirection?: "asc" | "desc";
};

export type GetUsersResult = {
    users: User[];
    total: number;
    totalPages: number;
    currentPage: number;
};

export async function fetchUsersAction(
    params: GetUsersParams
): Promise<GetUsersResult> {
    const {
        page = 1,
        limit = 10,
        role = "All",
        search = "",
        sortBy = "createdAt",
        sortDirection = "desc",
    } = params;

    // Add artificial delay to simulate network request
    const session = await getServerSession(authOptions);
    const url = process.env.BACKEND_BASE_URL + "/users";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    const users: User[] = await response.json();

    const filteredUsers = users.filter((user) => {
        // Filter by role
        if (role !== "All" && user.role !== role) {
            return false;
        }

        // Filter by search query
        if (search) {
            const query = search.toLowerCase();
            return (
                user.email.toLowerCase().includes(query) ||
                user.name.toLowerCase().includes(query) ||
                user.designation.toLowerCase().includes(query)
            );
        }

        return true;
    });

    // Sort users
    filteredUsers.sort((a, b) => {
        if (sortBy === "createdAt") {
            return sortDirection === "asc"
                ? a.createdAt.localeCompare(b.createdAt)
                : b.createdAt.localeCompare(a.createdAt);
        } else {
            const aValue = String(a[sortBy]).toLowerCase();
            const bValue = String(b[sortBy]).toLowerCase();

            return sortDirection === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
    });

    // Calculate pagination
    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);
    const sanitizedPage = Math.max(1, Math.min(page, totalPages || 1));

    const start = (sanitizedPage - 1) * limit;
    const end = start + limit;

    // Get the users for the current page
    const paginatedUsers = filteredUsers.slice(start, end);

    return {
        users: paginatedUsers,
        total,
        totalPages,
        currentPage: sanitizedPage,
    };
}
