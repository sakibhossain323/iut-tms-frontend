"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SubscriptionsPage() {
    const [activeTab, setActiveTab] = useState("active");

    const activeSubscriptions = [
        {
            id: "SUB-001",
            user: "John Smith",
            route: "Route A - City Center",
            schedule: "Daily, Morning & Evening",
            startDate: "Jan 15, 2025",
            endDate: "Dec 31, 2025",
            status: "active",
        },
        {
            id: "SUB-002",
            user: "Emma Williams",
            route: "Route B - Campus Loop",
            schedule: "Weekdays, Afternoon Only",
            startDate: "Feb 1, 2025",
            endDate: "Jul 31, 2025",
            status: "active",
        },
        {
            id: "SUB-003",
            user: "David Lee",
            route: "Route C - Express Line",
            schedule: "Weekdays, Morning Only",
            startDate: "Mar 10, 2025",
            endDate: "Mar 10, 2026",
            status: "active",
        },
    ];

    const pendingSubscriptions = [
        {
            id: "SUB-004",
            user: "Sarah Johnson",
            route: "Route A - City Center",
            schedule: "Daily, Morning & Evening",
            requestedDate: "May 2, 2025",
            availableSeats: 3,
            queuePosition: 1,
        },
        {
            id: "SUB-005",
            user: "Michael Wilson",
            route: "Route B - Campus Loop",
            schedule: "Weekdays, Full Day",
            requestedDate: "May 3, 2025",
            availableSeats: 0,
            queuePosition: 2,
        },
        {
            id: "SUB-006",
            user: "James Taylor",
            route: "Route C - Express Line",
            schedule: "Weekdays, Morning Only",
            requestedDate: "May 4, 2025",
            availableSeats: 2,
            queuePosition: 3,
        },
    ];

    const canceledTrips = [
        {
            id: "TRIP-001",
            user: "John Smith",
            route: "Route A - City Center",
            schedule: "Morning",
            date: "May 10, 2025",
            canceledOn: "May 5, 2025",
            status: "available",
        },
        {
            id: "TRIP-002",
            user: "Emma Williams",
            route: "Route B - Campus Loop",
            schedule: "Afternoon",
            date: "May 12, 2025",
            canceledOn: "May 6, 2025",
            status: "added",
        },
        {
            id: "TRIP-003",
            user: "David Lee",
            route: "Route C - Express Line",
            schedule: "Morning",
            date: "May 15, 2025",
            canceledOn: "May 7, 2025",
            status: "available",
        },
    ];

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    Subscriptions
                </h2>
                <div className="flex items-center space-x-2">
                    <Button>Download Report</Button>
                </div>
            </div>

            <Tabs
                defaultValue="active"
                onValueChange={setActiveTab}
                value={activeTab}
            >
                <TabsList className="grid w-full grid-cols-3 max-w-md">
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="pending">Request Queue</TabsTrigger>
                    <TabsTrigger value="canceled">Canceled Trips</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Subscriptions</CardTitle>
                            <CardDescription>
                                Currently active subscription plans
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Route</TableHead>
                                        <TableHead>Schedule</TableHead>
                                        <TableHead>Start Date</TableHead>
                                        <TableHead>End Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {activeSubscriptions.map((sub) => (
                                        <TableRow key={sub.id}>
                                            <TableCell className="font-medium">
                                                {sub.user}
                                            </TableCell>
                                            <TableCell>{sub.route}</TableCell>
                                            <TableCell>
                                                {sub.schedule}
                                            </TableCell>
                                            <TableCell>
                                                {sub.startDate}
                                            </TableCell>
                                            <TableCell>{sub.endDate}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-green-100 text-green-800 hover:bg-green-100"
                                                >
                                                    Active
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Manage
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Subscription Request Queue</CardTitle>
                            <CardDescription>
                                Pending subscription requests waiting for
                                approval
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Route</TableHead>
                                        <TableHead>Schedule</TableHead>
                                        <TableHead>Requested Date</TableHead>
                                        <TableHead>Available Seats</TableHead>
                                        <TableHead>Queue Position</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pendingSubscriptions.map((sub) => (
                                        <TableRow key={sub.id}>
                                            <TableCell className="font-medium">
                                                {sub.user}
                                            </TableCell>
                                            <TableCell>{sub.route}</TableCell>
                                            <TableCell>
                                                {sub.schedule}
                                            </TableCell>
                                            <TableCell>
                                                {sub.requestedDate}
                                            </TableCell>
                                            <TableCell>
                                                {sub.availableSeats}
                                            </TableCell>
                                            <TableCell>
                                                {sub.queuePosition}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {sub.availableSeats > 0 ? (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            className="mr-2"
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Decline
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        View
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="canceled" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Canceled Trips</CardTitle>
                            <CardDescription>
                                Trips canceled by subscribers that can be used
                                for one-time ticketing
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Route</TableHead>
                                        <TableHead>Schedule</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Canceled On</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {canceledTrips.map((trip) => (
                                        <TableRow key={trip.id}>
                                            <TableCell className="font-medium">
                                                {trip.user}
                                            </TableCell>
                                            <TableCell>{trip.route}</TableCell>
                                            <TableCell>
                                                {trip.schedule}
                                            </TableCell>
                                            <TableCell>{trip.date}</TableCell>
                                            <TableCell>
                                                {trip.canceledOn}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        trip.status ===
                                                        "available"
                                                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                                            : "bg-green-100 text-green-800 hover:bg-green-100"
                                                    }
                                                >
                                                    {trip.status === "available"
                                                        ? "Available for Ticket"
                                                        : "Added to Ticketing"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    {trip.status === "available"
                                                        ? "Add to Ticketing"
                                                        : "View Tickets"}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
