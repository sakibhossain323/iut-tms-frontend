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
                            <TableRow>
                                <TableCell className="font-medium">
                                    BUS-101
                                </TableCell>
                                <TableCell>Bus</TableCell>
                                <TableCell>45</TableCell>
                                <TableCell>XYZ-1234</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-green-100 text-green-800 hover:bg-green-100"
                                    >
                                        Available
                                    </Badge>
                                </TableCell>
                                <TableCell>None</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mr-2"
                                    >
                                        Assign
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Maintenance
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    BUS-102
                                </TableCell>
                                <TableCell>Bus</TableCell>
                                <TableCell>45</TableCell>
                                <TableCell>XYZ-1235</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    >
                                        On Trip
                                    </Badge>
                                </TableCell>
                                <TableCell>Route A - Morning</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mr-2"
                                    >
                                        Reassign
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        View Schedule
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    BUS-103
                                </TableCell>
                                <TableCell>Bus</TableCell>
                                <TableCell>30</TableCell>
                                <TableCell>XYZ-1236</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    >
                                        On Trip
                                    </Badge>
                                </TableCell>
                                <TableCell>HR Training Session</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mr-2"
                                    >
                                        Reassign
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        View Schedule
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    VAN-201
                                </TableCell>
                                <TableCell>Van</TableCell>
                                <TableCell>15</TableCell>
                                <TableCell>ABC-2345</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-green-100 text-green-800 hover:bg-green-100"
                                    >
                                        Available
                                    </Badge>
                                </TableCell>
                                <TableCell>None</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mr-2"
                                    >
                                        Assign
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Maintenance
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    CAR-301
                                </TableCell>
                                <TableCell>Car</TableCell>
                                <TableCell>4</TableCell>
                                <TableCell>DEF-3456</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-red-100 text-red-800 hover:bg-red-100"
                                    >
                                        Maintenance
                                    </Badge>
                                </TableCell>
                                <TableCell>Under Repair</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        View Details
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
