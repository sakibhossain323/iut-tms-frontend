"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RequisitionTable } from "@/components/requisitions/requisition-table";
import { RequisitionTableSkeleton } from "@/components/requisitions/requisition-table-skeleton";
import type { PaginatedRequisitions } from "@/lib/actions/requisition-actions";
import { fetchRequisitionsAction } from "@/lib/actions/requisition-actions";
import { Requisition, RequisitionStatus as Status } from "@/lib/definitions";

export default function RequisitionsPage() {
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
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Reset to first page when search changes
        setCurrentPage(1);
        setSearchQuery(value);
    };

    // Handle status filter change
    const handleStatusChange = (value: string) => {
        // Reset to first page when filter changes
        setCurrentPage(1);
        setStatusFilter(value);
    };

    const handleSortChange = (value: string) => {
        // Reset to first page when sort changes
        setCurrentPage(1);
        const [newSortBy, newSortDirection] = value.split("-") as [
            keyof Requisition,
            "asc" | "desc"
        ];
        setSortBy(newSortBy);
        setSortDirection(newSortDirection);
    };

    // Handle items per page change
    const handleItemsPerPageChange = (value: string) => {
        // Reset to first page when items per page changes
        setCurrentPage(1);
        setItemsPerPage(Number.parseInt(value, 10));
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Handle refresh button click
    const handleRefresh = () => {
        fetchRequisitions();
    };

    const handleReset = () => {
        setSearchQuery("");
        setStatusFilter("All");
        setSortBy("createdAt");
        setSortDirection("desc");
        setCurrentPage(1);
        setItemsPerPage(10);
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-mono">
                    Requisitions
                </h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={handleReset}>
                        Reset Filters
                    </Button>
                    <Button asChild>
                        <Link href={`${pathname}/new`}>New Requisition</Link>
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                        <div>
                            <CardTitle>Requisition Management</CardTitle>
                            <CardDescription className="mt-1">
                                Manage vehicle requisition requests
                            </CardDescription>
                        </div>
                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                            <div className="relative">
                                <Input
                                    placeholder="Search requisitions..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full sm:w-[200px]"
                                />
                            </div>
                            <Select
                                value={statusFilter}
                                onValueChange={handleStatusChange}
                            >
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Statuses
                                    </SelectItem>
                                    <SelectItem value={Status.PENDING}>
                                        Pending
                                    </SelectItem>
                                    <SelectItem value={Status.APPROVED}>
                                        Approved
                                    </SelectItem>
                                    <SelectItem value={Status.REJECTED}>
                                        Rejected
                                    </SelectItem>
                                    <SelectItem value={Status.COMPLETED}>
                                        Completed
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={`${sortBy}-${sortDirection}`}
                                onValueChange={handleSortChange}
                            >
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="createdAt-desc">
                                        Newest First
                                    </SelectItem>
                                    <SelectItem value="createdAt-asc">
                                        Oldest First
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={itemsPerPage.toString()}
                                onValueChange={handleItemsPerPageChange}
                            >
                                <SelectTrigger className="w-full sm:w-[100px]">
                                    <SelectValue placeholder="Per page" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleRefresh}
                                disabled={isLoading}
                            >
                                <RefreshCw
                                    className={`h-4 w-4 ${
                                        isLoading ? "animate-spin" : ""
                                    }`}
                                />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <RequisitionTableSkeleton />
                    ) : requisitionsData ? (
                        <>
                            <RequisitionTable
                                requisitions={requisitionsData.data}
                            />

                            {/* Pagination controls */}
                            <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-muted-foreground">
                                        Showing{" "}
                                        {requisitionsData.totalItems > 0
                                            ? (requisitionsData.currentPage -
                                                  1) *
                                                  itemsPerPage +
                                              1
                                            : 0}{" "}
                                        to{" "}
                                        {Math.min(
                                            requisitionsData.currentPage *
                                                itemsPerPage,
                                            requisitionsData.totalItems
                                        )}{" "}
                                        of {requisitionsData.totalItems} entries
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        disabled={
                                            requisitionsData.currentPage === 1
                                        }
                                        onClick={() =>
                                            handlePageChange(
                                                requisitionsData.currentPage - 1
                                            )
                                        }
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>

                                    {/* Improved pagination logic */}
                                    <div className="flex items-center gap-1">
                                        {(() => {
                                            const totalPages =
                                                requisitionsData.totalPages;
                                            const currentPage =
                                                requisitionsData.currentPage;

                                            // Always show first page
                                            const pages = [1];

                                            // Calculate range to show around current page
                                            let rangeStart = Math.max(
                                                2,
                                                currentPage - 1
                                            );
                                            let rangeEnd = Math.min(
                                                totalPages - 1,
                                                currentPage + 1
                                            );

                                            // Adjust range to show at least 3 pages if possible
                                            if (rangeEnd - rangeStart < 2) {
                                                if (rangeStart === 2) {
                                                    rangeEnd = Math.min(
                                                        4,
                                                        totalPages - 1
                                                    );
                                                } else if (
                                                    rangeEnd ===
                                                    totalPages - 1
                                                ) {
                                                    rangeStart = Math.max(
                                                        2,
                                                        totalPages - 3
                                                    );
                                                }
                                            }

                                            // Add ellipsis after first page if needed
                                            if (rangeStart > 2) {
                                                pages.push(-1); // -1 represents ellipsis
                                            }

                                            // Add pages in the middle range
                                            for (
                                                let i = rangeStart;
                                                i <= rangeEnd;
                                                i++
                                            ) {
                                                pages.push(i);
                                            }

                                            // Add ellipsis before last page if needed
                                            if (rangeEnd < totalPages - 1) {
                                                pages.push(-2); // -2 represents second ellipsis (different key)
                                            }

                                            // Always show last page if there is more than one page
                                            if (totalPages > 1) {
                                                pages.push(totalPages);
                                            }

                                            // Render buttons
                                            return pages.map((pageNum) => {
                                                if (pageNum < 0) {
                                                    // Render ellipsis
                                                    return (
                                                        <div
                                                            key={pageNum}
                                                            className="px-2"
                                                        >
                                                            &hellip;
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <Button
                                                        key={pageNum}
                                                        variant={
                                                            currentPage ===
                                                            pageNum
                                                                ? "default"
                                                                : "outline"
                                                        }
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() =>
                                                            handlePageChange(
                                                                pageNum
                                                            )
                                                        }
                                                    >
                                                        {pageNum}
                                                    </Button>
                                                );
                                            });
                                        })()}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        disabled={
                                            requisitionsData.currentPage ===
                                                requisitionsData.totalPages ||
                                            requisitionsData.totalPages === 0
                                        }
                                        onClick={() =>
                                            handlePageChange(
                                                requisitionsData.currentPage + 1
                                            )
                                        }
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="py-8 text-center">
                            Failed to load requisitions. Please try again.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
