"use client";

import { fetchRequisitionsAction } from "@/lib/actions/requisition-actions";

import type React from "react";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { PaginatedRequisitions } from "@/lib/actions/requisition-actions";
import { Requisition, RequisitionStatus as Status } from "@/lib/definitions";
// Pending Requisitions Card
export function PendingRequisitionsCard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Get initial values from URL
    const initialQuery = searchParams.get("query") || "";
    const initialStatus = searchParams.get("status") || "all";
    const initialPage = Number.parseInt(searchParams.get("page") || "1", 10);
    const initialPerPage = Number.parseInt(
        searchParams.get("perPage") || "5",
        10
    );
    const initialSortBy =
        (searchParams.get("sortBy") as keyof Requisition) || "createdAt";
    const initialSortDir =
        (searchParams.get("sortDir") as "asc" | "desc") || "desc";

    // State for filters and pagination
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [statusFilter, setStatusFilter] = useState(initialStatus);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);
    const [sortBy, setSortBy] = useState<keyof Requisition>(initialSortBy);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
        initialSortDir
    );

    // State for requisitions data
    const [requisitionsData, setRequisitionsData] =
        useState<PaginatedRequisitions | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch requisitions
    const fetchRequisitions = async () => {
        setIsLoading(true);

        try {
            // Build query string for URL update (not for data fetching)
            const params = new URLSearchParams();
            if (searchQuery) params.set("query", searchQuery);
            if (statusFilter !== "all") params.set("status", statusFilter);
            params.set("page", currentPage.toString());
            params.set("perPage", itemsPerPage.toString());

            // Update URL without refreshing the page
            router.push(`${pathname}?${params.toString()}`, { scroll: false });

            // Call the server action directly instead of making an API request
            const data = await fetchRequisitionsAction({
                searchQuery,
                statusFilter,
                page: currentPage,
                itemsPerPage,
                sortBy,
                sortDirection,
            });

            setRequisitionsData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch requisitions when filters or pagination change
    useEffect(() => {
        fetchRequisitions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        searchQuery,
        statusFilter,
        currentPage,
        itemsPerPage,
        sortBy,
        sortDirection,
    ]);

    // Handle search input change with debounce

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Pending Requisitions
                </CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                    <path d="M12 11v6" />
                    <path d="M9 18h6" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {requisitionsData?.totalItems || "--"}
                </div>
            </CardContent>
        </Card>
    );
}

// // Active Vehicles Card
// export async function ActiveVehiclesCard() {
//     const { total, change, period } = await fetchActiveVehicles();

//     return (
//         <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">
//                     Active Vehicles
//                 </CardTitle>
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     className="h-4 w-4 text-muted-foreground"
//                 >
//                     <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
//                     <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
//                     <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6" />
//                     <path d="M6 9h11m-3 4v-6" />
//                 </svg>
//             </CardHeader>
//             <CardContent>
//                 <div className="text-2xl font-bold">{total}</div>
//             </CardContent>
//         </Card>
//     );
// }

// // Active Drivers Card
// export async function ActiveDriversCard() {
//     const { total, percentChange } = await fetchActiveDrivers();

//     return (
//         <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">
//                     Active Drivers
//                 </CardTitle>
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     className="h-4 w-4 text-muted-foreground"
//                 >
//                     <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
//                     <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
//                     <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
//                 </svg>
//             </CardHeader>
//             <CardContent>
//                 <div className="text-2xl font-bold">{total}</div>
//             </CardContent>
//         </Card>
//     );
// }

// // Total Users Card
// export async function TotalUsersCard() {
//     const { total, percentChange } = await fetchTotalUsers();

//     return (
//         <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">
//                     Total Users
//                 </CardTitle>
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     className="h-4 w-4 text-muted-foreground"
//                 >
//                     <path d="M17 8c.7 0 1.3.13 2 .35V7c0-1.1-.9-2-2-2H3C1.9 5 1 5.9 1 7v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-1.35c-.7.22-1.3.35-2 .35zm-1 4c-.17 0-.34-.02-.5-.05.03-.16.05-.33.05-.5s-.02-.34-.05-.5c.16-.03.33-.05.5-.05s.34.02.5.05c-.03.16-.05.33-.05.5s.02.34.05.5c-.16.03-.33.05-.5.05zM20 4v16h2V4h-2z" />
//                     <path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 8.58c0-2.5-3.97-3.58-6-3.58s-6 1.08-6 3.58V17h12v-1.42zM8.48 15c.74-.51 2.23-1 3.52-1s2.78.49 3.52 1H8.48z" />
//                 </svg>
//             </CardHeader>
//             <CardContent>
//                 <div className="text-2xl font-bold">{total}</div>
//             </CardContent>
//         </Card>
//     );
// }
