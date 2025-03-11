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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function RequisitionsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    Requisitions
                </h2>
                <div className="flex items-center space-x-2">
                    <Button>New Requisition</Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>All Requisitions</CardTitle>
                            <CardDescription>
                                Manage vehicle requisition requests
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Statuses
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        Pending
                                    </SelectItem>
                                    <SelectItem value="approved">
                                        Approved
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                        Rejected
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Requester</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Purpose</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Passengers</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Assigned Vehicle</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">
                                    John Doe
                                </TableCell>
                                <TableCell>Marketing</TableCell>
                                <TableCell>Company Outing</TableCell>
                                <TableCell>
                                    May 20, 2025
                                    <br />
                                    8:00 AM - 5:00 PM
                                </TableCell>
                                <TableCell>30</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    >
                                        Pending
                                    </Badge>
                                </TableCell>
                                <TableCell>Not Assigned</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mr-2"
                                    >
                                        Assign
                                    </Button>
                                    <Button size="sm">Review</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Alice Johnson
                                </TableCell>
                                <TableCell>Engineering</TableCell>
                                <TableCell>Client Visit</TableCell>
                                <TableCell>
                                    May 22, 2025
                                    <br />
                                    10:00 AM - 2:00 PM
                                </TableCell>
                                <TableCell>8</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    >
                                        Pending
                                    </Badge>
                                </TableCell>
                                <TableCell>Not Assigned</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mr-2"
                                    >
                                        Assign
                                    </Button>
                                    <Button size="sm">Review</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Robert Smith
                                </TableCell>
                                <TableCell>Executive</TableCell>
                                <TableCell>Downtown Meeting</TableCell>
                                <TableCell>
                                    May 25, 2025
                                    <br />
                                    9:00 AM - 11:00 AM
                                </TableCell>
                                <TableCell>4</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    >
                                        Pending
                                    </Badge>
                                </TableCell>
                                <TableCell>Not Assigned</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mr-2"
                                    >
                                        Assign
                                    </Button>
                                    <Button size="sm">Review</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Emily Chen
                                </TableCell>
                                <TableCell>HR</TableCell>
                                <TableCell>Training Session</TableCell>
                                <TableCell>
                                    May 18, 2025
                                    <br />
                                    1:00 PM - 4:00 PM
                                </TableCell>
                                <TableCell>12</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-green-100 text-green-800 hover:bg-green-100"
                                    >
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell>Bus #103</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mr-2"
                                    >
                                        Reassign
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Michael Brown
                                </TableCell>
                                <TableCell>Sales</TableCell>
                                <TableCell>Product Demo</TableCell>
                                <TableCell>
                                    May 15, 2025
                                    <br />
                                    9:00 AM - 12:00 PM
                                </TableCell>
                                <TableCell>6</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-red-100 text-red-800 hover:bg-red-100"
                                    >
                                        Rejected
                                    </Badge>
                                </TableCell>
                                <TableCell>N/A</TableCell>
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
        </div>
    );
}
