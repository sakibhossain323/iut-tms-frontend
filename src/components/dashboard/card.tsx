"use client";

import { fetchRequisitionsAction } from "@/lib/actions/requisition-actions";
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
import { Requisition } from "@/lib/definitions";
import {
    fetchVehiclesAction,
    VehiclePagination,
} from "@/lib/actions/vehicle-actions";
import {
    DriverPagination,
    fetchDriversAction,
} from "@/lib/actions/driver-actions";

// Pending Requisitions Card
export function PendingRequisitionsCard() {
    const [requisitionsData, setRequisitionsData] =
        useState<PaginatedRequisitions | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch requisitions
    const fetchRequisitions = async () => {
        setIsLoading(true);
        try {
            const data = await fetchRequisitionsAction({
                searchQuery: "",
                statusFilter: "PENDING",
                page: 1,
                itemsPerPage: 10,
                sortBy: "createdAt",
                sortDirection: "desc",
            });
            setRequisitionsData(data);
        } catch (error) {
            console.error("Error fetching pending requisitions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch requisitions when component mounts
    useEffect(() => {
        fetchRequisitions();
    }, []);

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
                    {isLoading
                        ? "Loading..."
                        : requisitionsData?.totalItems || "0"}
                </div>
            </CardContent>
        </Card>
    );
}

// Active Vehicles Card
export function ActiveVehiclesCard() {
    const [vehiclesData, setVehiclesData] = useState<VehiclePagination | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch active vehicles
    const fetchVehicles = async () => {
        setIsLoading(true);
        try {
            const data = await fetchVehiclesAction({
                searchQuery: "",
                statusFilter: "ACTIVE",
                page: 1,
                itemsPerPage: 10,
                sortBy: "createdAt",
                sortDirection: "desc",
            });
            setVehiclesData(data);
        } catch (error) {
            console.error("Error fetching active vehicles:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch vehicles when component mounts
    useEffect(() => {
        fetchVehicles();
    }, []);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Active Vehicles
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
                    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6" />
                    <path d="M6 9h11m-3 4v-6" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {isLoading ? "Loading..." : vehiclesData?.totalItems || "0"}
                </div>
            </CardContent>
        </Card>
    );
}

// Active Drivers Card
export function ActiveDriversCard() {
    const [driversData, setDriversData] = useState<DriverPagination | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch active drivers
    const fetchDrivers = async () => {
        setIsLoading(true);
        try {
            const data = await fetchDriversAction({
                searchQuery: "",
                statusFilter: "ACTIVE",
                page: 1,
                itemsPerPage: 10,
                sortBy: "createdAt",
                sortDirection: "desc",
            });
            setDriversData(data);
        } catch (error) {
            console.error("Error fetching active drivers:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch drivers when component mounts
    useEffect(() => {
        fetchDrivers();
    }, []);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Active Drivers
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
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {isLoading ? "Loading..." : driversData?.totalItems || "0"}
                </div>
            </CardContent>
        </Card>
    );
}
