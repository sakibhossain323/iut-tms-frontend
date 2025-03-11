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

export default function TicketingPage() {
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

            <Tabs defaultValue="available">
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
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Route A - City Center
                                        </TableCell>
                                        <TableCell>8:00 AM</TableCell>
                                        <TableCell>May 10, 2025</TableCell>
                                        <TableCell>12</TableCell>
                                        <TableCell>$5.00</TableCell>
                                        <TableCell>Regular Schedule</TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm">
                                                Sell Tickets
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Route B - Campus Loop
                                        </TableCell>
                                        <TableCell>2:30 PM</TableCell>
                                        <TableCell>May 12, 2025</TableCell>
                                        <TableCell>8</TableCell>
                                        <TableCell>$3.50</TableCell>
                                        <TableCell>
                                            Subscription Cancelation
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm">
                                                Sell Tickets
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Route C - Express Line
                                        </TableCell>
                                        <TableCell>7:30 AM</TableCell>
                                        <TableCell>May 15, 2025</TableCell>
                                        <TableCell>5</TableCell>
                                        <TableCell>$6.50</TableCell>
                                        <TableCell>
                                            Subscription Cancelation
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm">
                                                Sell Tickets
                                            </Button>
                                        </TableCell>
                                    </TableRow>
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
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            TKT-10058
                                        </TableCell>
                                        <TableCell>
                                            Route A - City Center
                                        </TableCell>
                                        <TableCell>8:00 AM</TableCell>
                                        <TableCell>May 10, 2025</TableCell>
                                        <TableCell>Lisa Garcia</TableCell>
                                        <TableCell>$5.00</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            TKT-10059
                                        </TableCell>
                                        <TableCell>
                                            Route A - City Center
                                        </TableCell>
                                        <TableCell>8:00 AM</TableCell>
                                        <TableCell>May 10, 2025</TableCell>
                                        <TableCell>Mark Wilson</TableCell>
                                        <TableCell>$5.00</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            TKT-10060
                                        </TableCell>
                                        <TableCell>
                                            Route B - Campus Loop
                                        </TableCell>
                                        <TableCell>2:30 PM</TableCell>
                                        <TableCell>May 12, 2025</TableCell>
                                        <TableCell>Sam Johnson</TableCell>
                                        <TableCell>$3.50</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
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
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            TRX-5023
                                        </TableCell>
                                        <TableCell>Sale</TableCell>
                                        <TableCell>
                                            May 5, 2025, 10:23 AM
                                        </TableCell>
                                        <TableCell>$5.00</TableCell>
                                        <TableCell>Credit Card</TableCell>
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
                                                Receipt
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            TRX-5024
                                        </TableCell>
                                        <TableCell>Sale</TableCell>
                                        <TableCell>
                                            May 5, 2025, 10:45 AM
                                        </TableCell>
                                        <TableCell>$5.00</TableCell>
                                        <TableCell>Cash</TableCell>
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
                                                Receipt
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            TRX-5025
                                        </TableCell>
                                        <TableCell>Refund</TableCell>
                                        <TableCell>
                                            May 6, 2025, 2:15 PM
                                        </TableCell>
                                        <TableCell>-$3.50</TableCell>
                                        <TableCell>Credit Card</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                                            >
                                                Processed
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                Details
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
