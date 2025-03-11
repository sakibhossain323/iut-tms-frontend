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
                            <TableRow>
                                <TableCell className="font-medium">
                                    Route A - City Center
                                </TableCell>
                                <TableCell>Daily</TableCell>
                                <TableCell>8:00 AM</TableCell>
                                <TableCell>9:15 AM</TableCell>
                                <TableCell>BUS-102</TableCell>
                                <TableCell>
                                    45{" "}
                                    <span className="text-xs text-muted-foreground">
                                        (33 booked)
                                    </span>
                                </TableCell>
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
                                        className="mr-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Route A - City Center
                                </TableCell>
                                <TableCell>Daily</TableCell>
                                <TableCell>5:30 PM</TableCell>
                                <TableCell>6:45 PM</TableCell>
                                <TableCell>BUS-102</TableCell>
                                <TableCell>
                                    45{" "}
                                    <span className="text-xs text-muted-foreground">
                                        (38 booked)
                                    </span>
                                </TableCell>
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
                                        className="mr-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Route B - Campus Loop
                                </TableCell>
                                <TableCell>Weekdays</TableCell>
                                <TableCell>7:30 AM</TableCell>
                                <TableCell>Continuous</TableCell>
                                <TableCell>Not Assigned</TableCell>
                                <TableCell>
                                    --{" "}
                                    <span className="text-xs text-muted-foreground">
                                        (0 booked)
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    >
                                        Pending
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mr-2"
                                    >
                                        Assign Vehicle
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Route C - Express Line
                                </TableCell>
                                <TableCell>Weekdays</TableCell>
                                <TableCell>7:30 AM</TableCell>
                                <TableCell>8:15 AM</TableCell>
                                <TableCell>BUS-101</TableCell>
                                <TableCell>
                                    45{" "}
                                    <span className="text-xs text-muted-foreground">
                                        (40 booked)
                                    </span>
                                </TableCell>
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
                                        className="mr-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
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
                            <TableRow>
                                <TableCell className="font-medium">
                                    Route A - City Center
                                </TableCell>
                                <TableCell>8:00 AM</TableCell>
                                <TableCell>BUS-102</TableCell>
                                <TableCell>Michael Brown</TableCell>
                                <TableCell>33/45</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    >
                                        In Progress
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        Track
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Route C - Express Line
                                </TableCell>
                                <TableCell>7:30 AM</TableCell>
                                <TableCell>BUS-101</TableCell>
                                <TableCell>Robert Davis</TableCell>
                                <TableCell>40/45</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-green-100 text-green-800 hover:bg-green-100"
                                    >
                                        Completed
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        View Report
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Route A - City Center
                                </TableCell>
                                <TableCell>5:30 PM</TableCell>
                                <TableCell>BUS-102</TableCell>
                                <TableCell>James Wilson</TableCell>
                                <TableCell>38/45</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-purple-100 text-purple-800 hover:bg-purple-100"
                                    >
                                        Scheduled
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        Manage
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Special - HR Training
                                </TableCell>
                                <TableCell>1:00 PM</TableCell>
                                <TableCell>BUS-103</TableCell>
                                <TableCell>Sarah Miller</TableCell>
                                <TableCell>12/30</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    >
                                        In Progress
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        Track
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
