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

            <Tabs defaultValue="active">
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
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            John Smith
                                        </TableCell>
                                        <TableCell>
                                            Route A - City Center
                                        </TableCell>
                                        <TableCell>
                                            Daily, Morning & Evening
                                        </TableCell>
                                        <TableCell>Jan 15, 2025</TableCell>
                                        <TableCell>Dec 31, 2025</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className="bg-green-100 text-green-800 hover:bg-green-100"
                                            >
                                                Active
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
                                            Emma Williams
                                        </TableCell>
                                        <TableCell>
                                            Route B - Campus Loop
                                        </TableCell>
                                        <TableCell>
                                            Weekdays, Afternoon Only
                                        </TableCell>
                                        <TableCell>Feb 1, 2025</TableCell>
                                        <TableCell>Jul 31, 2025</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className="bg-green-100 text-green-800 hover:bg-green-100"
                                            >
                                                Active
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
                                            David Lee
                                        </TableCell>
                                        <TableCell>
                                            Route C - Express Line
                                        </TableCell>
                                        <TableCell>
                                            Weekdays, Morning Only
                                        </TableCell>
                                        <TableCell>Mar 10, 2025</TableCell>
                                        <TableCell>Mar 10, 2026</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className="bg-green-100 text-green-800 hover:bg-green-100"
                                            >
                                                Active
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                Manage
                                            </Button>
                                        </TableCell>
                                    </TableRow>
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
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Sarah Johnson
                                        </TableCell>
                                        <TableCell>
                                            Route A - City Center
                                        </TableCell>
                                        <TableCell>
                                            Daily, Morning & Evening
                                        </TableCell>
                                        <TableCell>May 2, 2025</TableCell>
                                        <TableCell>3</TableCell>
                                        <TableCell>1</TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" className="mr-2">
                                                Approve
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                Decline
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Michael Wilson
                                        </TableCell>
                                        <TableCell>
                                            Route B - Campus Loop
                                        </TableCell>
                                        <TableCell>
                                            Weekdays, Full Day
                                        </TableCell>
                                        <TableCell>May 3, 2025</TableCell>
                                        <TableCell>0</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            James Taylor
                                        </TableCell>
                                        <TableCell>
                                            Route C - Express Line
                                        </TableCell>
                                        <TableCell>
                                            Weekdays, Morning Only
                                        </TableCell>
                                        <TableCell>May 4, 2025</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>3</TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" className="mr-2">
                                                Approve
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                Decline
                                            </Button>
                                        </TableCell>
                                    </TableRow>
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
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            John Smith
                                        </TableCell>
                                        <TableCell>
                                            Route A - City Center
                                        </TableCell>
                                        <TableCell>Morning</TableCell>
                                        <TableCell>May 10, 2025</TableCell>
                                        <TableCell>May 5, 2025</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                                            >
                                                Available for Ticket
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                Add to Ticketing
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Emma Williams
                                        </TableCell>
                                        <TableCell>
                                            Route B - Campus Loop
                                        </TableCell>
                                        <TableCell>Afternoon</TableCell>
                                        <TableCell>May 12, 2025</TableCell>
                                        <TableCell>May 6, 2025</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className="bg-green-100 text-green-800 hover:bg-green-100"
                                            >
                                                Added to Ticketing
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                View Tickets
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            David Lee
                                        </TableCell>
                                        <TableCell>
                                            Route C - Express Line
                                        </TableCell>
                                        <TableCell>Morning</TableCell>
                                        <TableCell>May 15, 2025</TableCell>
                                        <TableCell>May 7, 2025</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                                            >
                                                Available for Ticket
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                Add to Ticketing
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
