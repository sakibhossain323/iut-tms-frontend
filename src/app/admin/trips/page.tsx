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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";

export default function TripsPage() {
    const regularTrips = [
        {
            id: "RT-001",
            route: "Route A - City Center",
            schedule: "Daily",
            departure: "8:00 AM",
            arrival: "9:15 AM",
            vehicle: "BUS-102",
            capacity: 45,
            booked: 33,
            status: "active",
        },
        {
            id: "RT-002",
            route: "Route A - City Center",
            schedule: "Daily",
            departure: "5:30 PM",
            arrival: "6:45 PM",
            vehicle: "BUS-102",
            capacity: 45,
            booked: 38,
            status: "active",
        },
        {
            id: "RT-003",
            route: "Route B - Campus Loop",
            schedule: "Weekdays",
            departure: "7:30 AM",
            arrival: "Continuous",
            vehicle: null,
            capacity: null,
            booked: 0,
            status: "pending",
        },
        {
            id: "RT-004",
            route: "Route C - Express Line",
            schedule: "Weekdays",
            departure: "7:30 AM",
            arrival: "8:15 AM",
            vehicle: "BUS-101",
            capacity: 45,
            booked: 40,
            status: "active",
        },
    ];
    const todaysTrips = [
        {
            id: "TT-001",
            route: "Route A - City Center",
            departure: "8:00 AM",
            vehicle: "BUS-102",
            driver: "Michael Brown",
            filled: 33,
            capacity: 45,
            status: "in-progress",
        },
        {
            id: "TT-002",
            route: "Route C - Express Line",
            departure: "7:30 AM",
            vehicle: "BUS-101",
            driver: "Robert Davis",
            filled: 40,
            capacity: 45,
            status: "completed",
        },
        {
            id: "TT-003",
            route: "Route A - City Center",
            departure: "5:30 PM",
            vehicle: "BUS-102",
            driver: "James Wilson",
            filled: 38,
            capacity: 45,
            status: "scheduled",
        },
        {
            id: "TT-004",
            route: "Special - HR Training",
            departure: "1:00 PM",
            vehicle: "BUS-103",
            driver: "Sarah Miller",
            filled: 12,
            capacity: 30,
            status: "in-progress",
        },
    ];
    // Status badge styling helper
    const getRegularTripStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return (
                    <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                        Active
                    </Badge>
                );
            case "pending":
                return (
                    <Badge
                        variant="outline"
                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    >
                        Pending
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getTodaysTripStatusBadge = (status: string) => {
        switch (status) {
            case "in-progress":
                return (
                    <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                    >
                        In Progress
                    </Badge>
                );
            case "completed":
                return (
                    <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                        Completed
                    </Badge>
                );
            case "scheduled":
                return (
                    <Badge
                        variant="outline"
                        className="bg-purple-100 text-purple-800 hover:bg-purple-100"
                    >
                        Scheduled
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Trips</h2>
                <div className="flex items-center space-x-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Add Trip</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New Trip</DialogTitle>
                                <DialogDescription>
                                    Create a new scheduled trip for your
                                    transportation system.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="route"
                                        className="text-right"
                                    >
                                        Route
                                    </Label>
                                    <Input
                                        id="route"
                                        placeholder="Route name"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="schedule"
                                        className="text-right"
                                    >
                                        Schedule
                                    </Label>
                                    <Input
                                        id="schedule"
                                        placeholder="Daily, weekdays, etc."
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="departure"
                                        className="text-right"
                                    >
                                        Departure
                                    </Label>
                                    <Input
                                        id="departure"
                                        placeholder="8:00 AM"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="vehicle"
                                        className="text-right"
                                    >
                                        Vehicle
                                    </Label>
                                    <Input
                                        id="vehicle"
                                        placeholder="Select vehicle"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="capacity"
                                        className="text-right"
                                    >
                                        Capacity
                                    </Label>
                                    <Input
                                        id="capacity"
                                        type="number"
                                        placeholder="30"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Create Trip</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Regular Trip Schedules</CardTitle>
                    <CardDescription>
                        View and manage regular trip schedules
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Route</TableHead>
                                <TableHead>Schedule</TableHead>
                                <TableHead>Departure</TableHead>
                                <TableHead>Arrival</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Capacity</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {regularTrips.map((trip) => (
                                <TableRow key={trip.id}>
                                    <TableCell className="font-medium">
                                        {trip.route}
                                    </TableCell>
                                    <TableCell>{trip.schedule}</TableCell>
                                    <TableCell>{trip.departure}</TableCell>
                                    <TableCell>{trip.arrival}</TableCell>
                                    <TableCell>
                                        {trip.vehicle || "Not Assigned"}
                                    </TableCell>
                                    <TableCell>
                                        {trip.capacity ? (
                                            <>
                                                {trip.capacity}{" "}
                                                <span className="text-xs text-muted-foreground">
                                                    ({trip.booked} booked)
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                --{" "}
                                                <span className="text-xs text-muted-foreground">
                                                    (0 booked)
                                                </span>
                                            </>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {getRegularTripStatusBadge(trip.status)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {trip.status === "pending" ? (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="mr-2"
                                                >
                                                    Assign Vehicle
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Edit
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="mr-2"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    View
                                                </Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Today's Trips</CardTitle>
                            <CardDescription>
                                All trips scheduled for today
                            </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                May 8, 2025
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Route</TableHead>
                                <TableHead>Departure</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Driver</TableHead>
                                <TableHead>Filled/Capacity</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {todaysTrips.map((trip) => (
                                <TableRow key={trip.id}>
                                    <TableCell className="font-medium">
                                        {trip.route}
                                    </TableCell>
                                    <TableCell>{trip.departure}</TableCell>
                                    <TableCell>{trip.vehicle}</TableCell>
                                    <TableCell>{trip.driver}</TableCell>
                                    <TableCell>
                                        {trip.filled}/{trip.capacity}
                                    </TableCell>
                                    <TableCell>
                                        {getTodaysTripStatusBadge(trip.status)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {trip.status === "in-progress" ? (
                                            <Button variant="outline" size="sm">
                                                Track
                                            </Button>
                                        ) : trip.status === "completed" ? (
                                            <Button variant="outline" size="sm">
                                                View Report
                                            </Button>
                                        ) : (
                                            <Button variant="outline" size="sm">
                                                Manage
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
