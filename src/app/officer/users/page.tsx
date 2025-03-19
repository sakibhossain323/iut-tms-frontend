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
import { UserTable } from "@/components/users/user-table";
import { UserTableSkeleton } from "@/components/users/user-table-skeleton";
import { fetchUsersAction } from "@/lib/actions/user-actions";
import { type User, Role } from "@/lib/definitions";

export default function UsersPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Get initial values from URL
    const initialQuery = searchParams.get("query") || "";
    const initialRole = (searchParams.get("role") as Role | "All") || "All";
    const initialPage = Number.parseInt(searchParams.get("page") || "1", 10);
    const initialPerPage = Number.parseInt(
        searchParams.get("perPage") || "10",
        10
    );
    const initialSortBy =
        (searchParams.get("sortBy") as keyof User) || "createdAt";
    const initialSortDir =
        (searchParams.get("sortDir") as "asc" | "desc") || "desc";

    // State for filters and pagination
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [roleFilter, setRoleFilter] = useState(initialRole);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);
    const [sortBy, setSortBy] = useState<keyof User>(initialSortBy);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
        initialSortDir
    );

    // State for users data
    const [usersData, setUsersData] = useState<{
        users: User[];
        total: number;
        totalPages: number;
        currentPage: number;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch users
    const fetchUsers = async () => {
        setIsLoading(true);

        try {
            // Build query string for URL update
            const params = new URLSearchParams();
            if (searchQuery) params.set("query", searchQuery);
            if (roleFilter !== "All") params.set("role", roleFilter);
            params.set("page", currentPage.toString());
            params.set("perPage", itemsPerPage.toString());
            if (sortBy !== "createdAt") params.set("sortBy", sortBy);
            if (sortDirection !== "desc") params.set("sortDir", sortDirection);

            // Update URL without refreshing the page
            router.push(`${pathname}?${params.toString()}`, { scroll: false });

            // Call the server action directly
            const result = await fetchUsersAction({
                page: currentPage,
                limit: itemsPerPage,
                role: roleFilter,
                search: searchQuery,
                sortBy,
                sortDirection,
            });

            setUsersData({
                users: result.users,
                total: result.total,
                totalPages: result.totalPages,
                currentPage: currentPage,
            });
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch users when filters or pagination change
    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        searchQuery,
        roleFilter,
        currentPage,
        itemsPerPage,
        sortBy,
        sortDirection,
    ]);

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Reset to first page when search changes
        setCurrentPage(1);
        setSearchQuery(value);
    };

    // Handle role filter change
    const handleRoleChange = (value: string) => {
        // Reset to first page when filter changes
        setCurrentPage(1);
        setRoleFilter(value as Role | "All");
    };

    // Handle items per page change
    const handleItemsPerPageChange = (value: string) => {
        // Reset to first page when items per page changes
        setCurrentPage(1);
        setItemsPerPage(Number.parseInt(value, 10));
    };

    // Handle sort change
    const handleSortChange = (value: string) => {
        // Reset to first page when sort changes
        setCurrentPage(1);
        const [newSortBy, newSortDirection] = value.split("-") as [
            keyof User,
            "asc" | "desc"
        ];
        setSortBy(newSortBy);
        setSortDirection(newSortDirection);
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Handle refresh button click
    const handleRefresh = () => {
        fetchUsers();
    };

    // Handle reset all filters
    const handleReset = () => {
        setSearchQuery("");
        setRoleFilter("All");
        setSortBy("createdAt");
        setSortDirection("desc");
        setCurrentPage(1);
        setItemsPerPage(10);
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-mono">
                    System Users
                </h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={handleReset}>
                        Reset Filters
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                        <div>
                            <CardTitle>User Management</CardTitle>
                            <CardDescription className="mt-1">
                                Manage users and their roles in the system
                            </CardDescription>
                        </div>
                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                            <div className="relative">
                                <Input
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full sm:w-[200px]"
                                />
                            </div>
                            <Select
                                value={roleFilter}
                                onValueChange={handleRoleChange}
                            >
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">
                                        All Roles
                                    </SelectItem>
                                    <SelectItem value={Role.ADMIN}>
                                        Admin
                                    </SelectItem>
                                    <SelectItem value={Role.TRANSPORT_OFFICER}>
                                        Transport Officer
                                    </SelectItem>
                                    <SelectItem value={Role.HOD}>
                                        HOD
                                    </SelectItem>
                                    <SelectItem value={Role.USER}>
                                        User
                                    </SelectItem>
                                    <SelectItem value={Role.DRIVER}>
                                        Driver
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
                                    <SelectItem value="name-asc">
                                        Name (A-Z)
                                    </SelectItem>
                                    <SelectItem value="name-desc">
                                        Name (Z-A)
                                    </SelectItem>
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
                        <UserTableSkeleton />
                    ) : usersData ? (
                        <>
                            <UserTable users={usersData.users} />

                            {/* Pagination controls */}
                            <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-muted-foreground">
                                        Showing{" "}
                                        {usersData.total > 0
                                            ? (usersData.currentPage - 1) *
                                                  itemsPerPage +
                                              1
                                            : 0}{" "}
                                        to{" "}
                                        {Math.min(
                                            usersData.currentPage *
                                                itemsPerPage,
                                            usersData.total
                                        )}{" "}
                                        of {usersData.total} entries
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        disabled={usersData.currentPage === 1}
                                        onClick={() =>
                                            handlePageChange(
                                                usersData.currentPage - 1
                                            )
                                        }
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>

                                    {/* Pagination logic */}
                                    <div className="flex items-center gap-1">
                                        {(() => {
                                            const totalPages =
                                                usersData.totalPages;
                                            const currentPage =
                                                usersData.currentPage;

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
                                            usersData.currentPage ===
                                                usersData.totalPages ||
                                            usersData.totalPages === 0
                                        }
                                        onClick={() =>
                                            handlePageChange(
                                                usersData.currentPage + 1
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
                            Failed to load users. Please try again.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
