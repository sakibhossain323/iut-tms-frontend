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

export default function VehiclesPage() {
    const vehicles = [
        {
            id: "BUS-101",
            type: "Bus",
            capacity: 45,
            licensePlate: "XYZ-1234",
            status: "available",
            currentAssignment: "None",
        },
        {
            id: "BUS-102",
            type: "Bus",
            capacity: 45,
            licensePlate: "XYZ-1235",
            status: "on-trip",
            currentAssignment: "Route A - Morning",
        },
        {
            id: "BUS-103",
            type: "Bus",
            capacity: 30,
            licensePlate: "XYZ-1236",
            status: "on-trip",
            currentAssignment: "HR Training Session",
        },
        {
            id: "VAN-201",
            type: "Van",
            capacity: 15,
            licensePlate: "ABC-2345",
            status: "available",
            currentAssignment: "None",
        },
        {
            id: "CAR-301",
            type: "Car",
            capacity: 4,
            licensePlate: "DEF-3456",
            status: "maintenance",
            currentAssignment: "Under Repair",
        },
    ];
    // Status badge styling helper
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "available":
                return (
                    <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                        Available
                    </Badge>
                );
            case "on-trip":
                return (
                    <Badge
                        variant="outline"
                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    >
                        On Trip
                    </Badge>
                );
            case "maintenance":
                return (
                    <Badge
                        variant="outline"
                        className="bg-red-100 text-red-800 hover:bg-red-100"
                    >
                        Maintenance
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Vehicles</h2>
                <div className="flex items-center space-x-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Add Vehicle</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New Vehicle</DialogTitle>
                                <DialogDescription>
                                    Enter the details of the new vehicle to add
                                    it to the fleet.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="vehicle-id"
                                        className="text-right"
                                    >
                                        ID
                                    </Label>
                                    <Input
                                        id="vehicle-id"
                                        placeholder="VEH-123"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="type"
                                        className="text-right"
                                    >
                                        Type
                                    </Label>
                                    <Input
                                        id="type"
                                        placeholder="Bus / Van / Car"
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
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="license"
                                        className="text-right"
                                    >
                                        License Plate
                                    </Label>
                                    <Input
                                        id="license"
                                        placeholder="ABC-1234"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Add Vehicle</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Vehicle Fleet</CardTitle>
                    <CardDescription>
                        Manage your transport fleet
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Capacity</TableHead>
                                <TableHead>License Plate</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Current Assignment</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehicles.map((vehicle) => (
                                <TableRow key={vehicle.id}>
                                    <TableCell className="font-medium">
                                        {vehicle.id}
                                    </TableCell>
                                    <TableCell>{vehicle.type}</TableCell>
                                    <TableCell>{vehicle.capacity}</TableCell>
                                    <TableCell>
                                        {vehicle.licensePlate}
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(vehicle.status)}
                                    </TableCell>
                                    <TableCell>
                                        {vehicle.currentAssignment}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {vehicle.status === "available" ? (
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
                                                    Maintenance
                                                </Button>
                                            </>
                                        ) : vehicle.status === "on-trip" ? (
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
