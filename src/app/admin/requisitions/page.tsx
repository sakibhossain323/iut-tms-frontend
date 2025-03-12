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
    const requisitions = [
        {
            id: "REQ-001",
            requester: "John Doe",
            department: "Marketing",
            purpose: "Company Outing",
            date: "May 20, 2025",
            time: "8:00 AM - 5:00 PM",
            passengers: 30,
            status: "pending",
            assignedVehicle: null,
        },
        {
            id: "REQ-002",
            requester: "Alice Johnson",
            department: "Engineering",
            purpose: "Client Visit",
            date: "May 22, 2025",
            time: "10:00 AM - 2:00 PM",
            passengers: 8,
            status: "pending",
            assignedVehicle: null,
        },
        {
            id: "REQ-003",
            requester: "Robert Smith",
            department: "Executive",
            purpose: "Downtown Meeting",
            date: "May 25, 2025",
            time: "9:00 AM - 11:00 AM",
            passengers: 4,
            status: "pending",
            assignedVehicle: null,
        },
        {
            id: "REQ-004",
            requester: "Emily Chen",
            department: "HR",
            purpose: "Training Session",
            date: "May 18, 2025",
            time: "1:00 PM - 4:00 PM",
            passengers: 12,
            status: "approved",
            assignedVehicle: "BUS-103",
        },
        {
            id: "REQ-005",
            requester: "Michael Brown",
            department: "Sales",
            purpose: "Product Demo",
            date: "May 15, 2025",
            time: "9:00 AM - 12:00 PM",
            passengers: 6,
            status: "rejected",
            assignedVehicle: null,
        },
    ];
    // Status badge styling helper
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge
                        variant="outline"
                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    >
                        Pending
                    </Badge>
                );
            case "approved":
                return (
                    <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                        Approved
                    </Badge>
                );
            case "rejected":
                return (
                    <Badge
                        variant="outline"
                        className="bg-red-100 text-red-800 hover:bg-red-100"
                    >
                        Rejected
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

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
                            {requisitions.map((req) => (
                                <TableRow key={req.id}>
                                    <TableCell className="font-medium">
                                        {req.requester}
                                    </TableCell>
                                    <TableCell>{req.department}</TableCell>
                                    <TableCell>{req.purpose}</TableCell>
                                    <TableCell>
                                        {req.date}
                                        <br />
                                        {req.time}
                                    </TableCell>
                                    <TableCell>{req.passengers}</TableCell>
                                    <TableCell>
                                        {getStatusBadge(req.status)}
                                    </TableCell>
                                    <TableCell>
                                        {req.assignedVehicle || "Not Assigned"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {req.status === "pending" ? (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="mr-2"
                                                >
                                                    Assign
                                                </Button>
                                                <Button size="sm">
                                                    Review
                                                </Button>
                                            </>
                                        ) : req.status === "approved" ? (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="mr-2"
                                                >
                                                    Reassign
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    View
                                                </Button>
                                            </>
                                        ) : (
                                            <Button variant="outline" size="sm">
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
        </div>
    );
}
