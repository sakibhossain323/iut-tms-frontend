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

export default function TicketsPage() {
    const [activeTab, setActiveTab] = useState("available");

    const availableTickets = [
        {
            id: "TKT-A001",
            route: "Route A - City Center",
            tripTime: "8:00 AM",
            date: "May 10, 2025",
            availableSeats: 12,
            price: 5.0,
            source: "Regular Schedule",
        },
        {
            id: "TKT-A002",
            route: "Route B - Campus Loop",
            tripTime: "2:30 PM",
            date: "May 12, 2025",
            availableSeats: 8,
            price: 3.5,
            source: "Subscription Cancelation",
        },
        {
            id: "TKT-A003",
            route: "Route C - Express Line",
            tripTime: "7:30 AM",
            date: "May 15, 2025",
            availableSeats: 5,
            price: 6.5,
            source: "Subscription Cancelation",
        },
    ];

    const soldTickets = [
        {
            id: "TKT-10058",
            route: "Route A - City Center",
            tripTime: "8:00 AM",
            date: "May 10, 2025",
            passenger: "Lisa Garcia",
            price: 5.0,
        },
        {
            id: "TKT-10059",
            route: "Route A - City Center",
            tripTime: "8:00 AM",
            date: "May 10, 2025",
            passenger: "Mark Wilson",
            price: 5.0,
        },
        {
            id: "TKT-10060",
            route: "Route B - Campus Loop",
            tripTime: "2:30 PM",
            date: "May 12, 2025",
            passenger: "Sam Johnson",
            price: 3.5,
        },
    ];

    const transactions = [
        {
            id: "TRX-5023",
            type: "Sale",
            dateTime: "May 5, 2025, 10:23 AM",
            amount: 5.0,
            paymentMethod: "Credit Card",
            status: "completed",
        },
        {
            id: "TRX-5024",
            type: "Sale",
            dateTime: "May 5, 2025, 10:45 AM",
            amount: 5.0,
            paymentMethod: "Cash",
            status: "completed",
        },
        {
            id: "TRX-5025",
            type: "Refund",
            dateTime: "May 6, 2025, 2:15 PM",
            amount: -3.5,
            paymentMethod: "Credit Card",
            status: "processed",
        },
    ];

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    One-Time Tickets
                </h2>
                <div className="flex items-center space-x-2">
                    <Button>Create Ticket</Button>
                </div>
            </div>

            <Tabs
                defaultValue="available"
                onValueChange={setActiveTab}
                value={activeTab}
            >
                <TabsList className="grid w-full grid-cols-3 max-w-md">
                    <TabsTrigger value="available">
                        Available Tickets
                    </TabsTrigger>
                    <TabsTrigger value="sold">Sold Tickets</TabsTrigger>
                    <TabsTrigger value="history">
                        Transaction History
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="available" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Available Tickets</CardTitle>
                            <CardDescription>
                                Tickets available for purchase
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Route</TableHead>
                                        <TableHead>Trip Time</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Available Seats</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Source</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {availableTickets.map((ticket) => (
                                        <TableRow key={ticket.id}>
                                            <TableCell className="font-medium">
                                                {ticket.route}
                                            </TableCell>
                                            <TableCell>
                                                {ticket.tripTime}
                                            </TableCell>
                                            <TableCell>{ticket.date}</TableCell>
                                            <TableCell>
                                                {ticket.availableSeats}
                                            </TableCell>
                                            <TableCell>
                                                ${ticket.price.toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                {ticket.source}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm">
                                                    Sell Tickets
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="sold" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sold Tickets</CardTitle>
                            <CardDescription>
                                Tickets sold for upcoming trips
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Ticket ID</TableHead>
                                        <TableHead>Route</TableHead>
                                        <TableHead>Trip Time</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Passenger</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {soldTickets.map((ticket) => (
                                        <TableRow key={ticket.id}>
                                            <TableCell className="font-medium">
                                                {ticket.id}
                                            </TableCell>
                                            <TableCell>
                                                {ticket.route}
                                            </TableCell>
                                            <TableCell>
                                                {ticket.tripTime}
                                            </TableCell>
                                            <TableCell>{ticket.date}</TableCell>
                                            <TableCell>
                                                {ticket.passenger}
                                            </TableCell>
                                            <TableCell>
                                                ${ticket.price.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Transaction History</CardTitle>
                            <CardDescription>
                                History of ticket sales and refunds
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Transaction ID</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Payment Method</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell className="font-medium">
                                                {transaction.id}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.type}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.dateTime}
                                            </TableCell>
                                            <TableCell>
                                                $
                                                {Math.abs(
                                                    transaction.amount
                                                ).toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.paymentMethod}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        transaction.status ===
                                                        "completed"
                                                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                                    }
                                                >
                                                    {transaction.status ===
                                                    "completed"
                                                        ? "Completed"
                                                        : "Processed"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    {transaction.type === "Sale"
                                                        ? "Receipt"
                                                        : "Details"}
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
