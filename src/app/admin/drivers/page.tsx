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
export default function DriversPage() {
    const drivers = [
        {
            id: "DRV-001",
            name: "Michael Brown",
            licenseNumber: "DL-12345",
            licenseType: "Commercial",
            contact: "+1 (555) 123-4567",
            email: "michael.brown@example.com",
            status: "on-duty",
            currentAssignment: "Route A - City Center",
            experience: "5 years",
        },
        {
            id: "DRV-002",
            name: "Robert Davis",
            licenseNumber: "DL-23456",
            licenseType: "Commercial",
            contact: "+1 (555) 234-5678",
            email: "robert.davis@example.com",
            status: "off-duty",
            currentAssignment: null,
            experience: "8 years",
        },
        {
            id: "DRV-003",
            name: "James Wilson",
            licenseNumber: "DL-34567",
            licenseType: "Commercial",
            contact: "+1 (555) 345-6789",
            email: "james.wilson@example.com",
            status: "on-duty",
            currentAssignment: "Scheduled for Route A - Evening",
            experience: "3 years",
        },
        {
            id: "DRV-004",
            name: "Sarah Miller",
            licenseNumber: "DL-45678",
            licenseType: "Commercial",
            contact: "+1 (555) 456-7890",
            email: "sarah.miller@example.com",
            status: "on-duty",
            currentAssignment: "Special - HR Training",
            experience: "6 years",
        },
        {
            id: "DRV-005",
            name: "David Johnson",
            licenseNumber: "DL-56789",
            licenseType: "Commercial",
            contact: "+1 (555) 567-8901",
            email: "david.johnson@example.com",
            status: "leave",
            currentAssignment: null,
            experience: "4 years",
        },
    ];
    // Status badge styling helper
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "on-duty":
                return (
                    <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                        On Duty
                    </Badge>
                );
            case "off-duty":
                return (
                    <Badge
                        variant="outline"
                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    >
                        Off Duty
                    </Badge>
                );
            case "leave":
                return (
                    <Badge
                        variant="outline"
                        className="bg-red-100 text-red-800 hover:bg-red-100"
                    >
                        On Leave
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Drivers</h2>
                <div className="flex items-center space-x-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Add Driver</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New Driver</DialogTitle>
                                <DialogDescription>
                                    Enter the details of the new driver to add
                                    to your team.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="Full Name"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="license"
                                        className="text-right"
                                    >
                                        License Number
                                    </Label>
                                    <Input
                                        id="license"
                                        placeholder="DL-12345"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="license-type"
                                        className="text-right"
                                    >
                                        License Type
                                    </Label>
                                    <Input
                                        id="license-type"
                                        placeholder="Commercial"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="contact"
                                        className="text-right"
                                    >
                                        Contact
                                    </Label>
                                    <Input
                                        id="contact"
                                        placeholder="+1 (555) 123-4567"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="email"
                                        className="text-right"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="driver@example.com"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="experience"
                                        className="text-right"
                                    >
                                        Experience
                                    </Label>
                                    <Input
                                        id="experience"
                                        placeholder="5 years"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Add Driver</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Driver Management</CardTitle>
                    <CardDescription>
                        Manage your transport drivers and their assignments
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>License</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Experience</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Current Assignment</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {drivers.map((driver) => (
                                <TableRow key={driver.id}>
                                    <TableCell className="font-medium">
                                        {driver.name}
                                    </TableCell>
                                    <TableCell>
                                        {driver.licenseNumber} (
                                        {driver.licenseType})
                                    </TableCell>
                                    <TableCell>{driver.contact}</TableCell>
                                    <TableCell>{driver.email}</TableCell>
                                    <TableCell>{driver.experience}</TableCell>
                                    <TableCell>
                                        {getStatusBadge(driver.status)}
                                    </TableCell>
                                    <TableCell>
                                        {driver.currentAssignment || "None"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {driver.status === "on-duty" ? (
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
                                                    View Schedule
                                                </Button>
                                            </>
                                        ) : driver.status === "off-duty" ? (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="mr-2"
                                                >
                                                    Assign
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Edit
                                                </Button>
                                            </>
                                        ) : (
                                            <Button variant="outline" size="sm">
                                                View Details
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
