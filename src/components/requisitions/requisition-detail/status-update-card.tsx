"use client";

import { CheckCircle, XCircle, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { vehicles } from "@/lib/data/mock-data";

interface StatusUpdateCardProps {
    status: string;
    assignedVehicle: string | null;
    onStatusUpdate: (status: string) => void;
    onVehicleAssign: (vehicleId: string) => void;
    isUpdating: boolean;
}

export function StatusUpdateCard({
    status,
    assignedVehicle,
    onStatusUpdate,
    onVehicleAssign,
    isUpdating,
}: StatusUpdateCardProps) {
    // Available vehicles for assignment
    const availableVehicles = vehicles.filter((v) => v.status === "available");

    return (
        <Card>
            <CardHeader>
                <CardTitle>Status Management</CardTitle>
                <CardDescription>
                    Update the status of this requisition
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="status">Current Status</Label>
                        <Select
                            value={status}
                            onValueChange={onStatusUpdate}
                            disabled={isUpdating}
                        >
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
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

                    <div className="flex space-x-2">
                        {status === "pending" && (
                            <>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="destructive"
                                            className="flex-1"
                                            disabled={isUpdating}
                                        >
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Reject
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Reject Requisition
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to reject
                                                this requisition? This action
                                                cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() =>
                                                    onStatusUpdate("rejected")
                                                }
                                                className="bg-red-600 hover:bg-red-700"
                                            >
                                                Reject
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            className="flex-1"
                                            disabled={isUpdating}
                                        >
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Approve
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Approve Requisition
                                            </DialogTitle>
                                            <DialogDescription>
                                                Assign a vehicle to approve this
                                                requisition.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <Label htmlFor="approve-vehicle">
                                                Available Vehicles
                                            </Label>
                                            <Select
                                                onValueChange={onVehicleAssign}
                                            >
                                                <SelectTrigger id="approve-vehicle">
                                                    <SelectValue placeholder="Select a vehicle" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {availableVehicles.map(
                                                        (vehicle) => (
                                                            <SelectItem
                                                                key={vehicle.id}
                                                                value={
                                                                    vehicle.id
                                                                }
                                                            >
                                                                {vehicle.id} -{" "}
                                                                {vehicle.type} (
                                                                {
                                                                    vehicle.capacity
                                                                }{" "}
                                                                seats)
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                onClick={() => {}}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    onStatusUpdate("approved")
                                                }
                                            >
                                                Approve without Vehicle
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </>
                        )}

                        {status === "approved" && !assignedVehicle && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        className="flex-1"
                                        disabled={isUpdating}
                                    >
                                        <Car className="mr-2 h-4 w-4" />
                                        Assign Vehicle
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Assign Vehicle
                                        </DialogTitle>
                                        <DialogDescription>
                                            Select a vehicle to assign to this
                                            requisition.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <Label htmlFor="assign-vehicle">
                                            Available Vehicles
                                        </Label>
                                        <Select onValueChange={onVehicleAssign}>
                                            <SelectTrigger id="assign-vehicle">
                                                <SelectValue placeholder="Select a vehicle" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableVehicles.map(
                                                    (vehicle) => (
                                                        <SelectItem
                                                            key={vehicle.id}
                                                            value={vehicle.id}
                                                        >
                                                            {vehicle.id} -{" "}
                                                            {vehicle.type} (
                                                            {vehicle.capacity}{" "}
                                                            seats)
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => {}}
                                        >
                                            Cancel
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}

                        {status === "approved" && (
                            <Button
                                className="flex-1"
                                onClick={() => onStatusUpdate("completed")}
                                disabled={isUpdating}
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Completed
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
