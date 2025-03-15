"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Requisition } from "@/lib/definitions";

export type RequisitionsParams = {
    searchQuery?: string;
    statusFilter?: string;
    page?: number;
    itemsPerPage?: number;
};

export type PaginatedRequisitions = {
    data: Requisition[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
};
/**
 * Server action to fetch requisitions with filtering and pagination
 */
export async function fetchRequisitionsAction({
    searchQuery = "",
    statusFilter = "all",
    page = 1,
    itemsPerPage = 5,
}: RequisitionsParams): Promise<PaginatedRequisitions> {
    const session = await getServerSession(authOptions);
    const url = process.env.BACKEND_BASE_URL + "/requisitions/all";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch requisitions");
    }
    const requisitions: Requisition[] = await response.json();
    console.log(requisitions);

    const filteredRequisitions = requisitions.filter((req) => {
        // Filter by status
        if (statusFilter !== "all" && req.status !== statusFilter) {
            return false;
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                req.user.email.toLowerCase().includes(query) ||
                req.department.toLowerCase().includes(query) ||
                req.purpose.toLowerCase().includes(query) ||
                req.id.toLowerCase().includes(query)
            );
        }

        return true;
    });

    // Calculate pagination
    const totalItems = filteredRequisitions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedRequisitions = filteredRequisitions.slice(
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
