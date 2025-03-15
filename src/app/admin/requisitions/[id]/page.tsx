"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Users,
    Briefcase,
    Building,
    Car,
    CheckCircle,
    XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { Label } from "@/components/ui/label";
import { vehicles } from "@/lib/data/mock-data";
import { string } from "zod";

// Sample requisition data - in a real app, this would come from an API
const requisition = {
    id: "REQ-001",
    requester: "John Doe",
    department: "Marketing",
    purpose: "Company Outing",
    date: "May 20, 2025",
    time: "8:00 AM - 5:00 PM",
    passengers: 30,
    status: "pending",
    assignedVehicle: null as string | null,
    createdAt: "May 5, 2025",
    notes: "Need a vehicle with air conditioning and enough space for equipment.",
    destination: "Sunset Beach Resort",
    pickupLocation: "Company Headquarters, Main Entrance",
};

export default function RequisitionDetailPage() {
    const [status, setStatus] = useState(requisition.status);
    const [assignedVehicle, setAssignedVehicle] = useState(
        requisition.assignedVehicle
    );
    const [isUpdating, setIsUpdating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

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
            case "completed":
                return (
                    <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                    >
                        Completed
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    // Handle status update
    const handleStatusUpdate = (newStatus: string) => {
        setIsUpdating(true);

        // Simulate API call
        setTimeout(() => {
            setStatus(newStatus);
            setIsUpdating(false);
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }, 1000);
    };

    // Handle vehicle assignment
    const handleVehicleAssign = (vehicleId: string) => {
        setIsUpdating(true);

        // Simulate API call
        setTimeout(() => {
            setAssignedVehicle(vehicleId);
            if (status === "pending") {
                setStatus("approved");
            }
            setIsUpdating(false);
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }, 1000);
    };

    // Available vehicles for assignment
    const availableVehicles = vehicles.filter((v) => v.status === "available");

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            {/* Header with navigation and status */}
            <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/requisitions">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Requisitions
                    </Link>
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">
                    Requisition #{requisition.id}
                </h2>
                <div className="flex items-center space-x-2">
                    {getStatusBadge(status)}
                </div>
            </div>

            {/* Success message */}
            {showSuccess && (
                <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <span className="block sm:inline">
                        Requisition updated successfully!
                    </span>
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
                {/* Requisition Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Requisition Information</CardTitle>
                        <CardDescription>
                            Details of the requisition request
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center">
                            <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Purpose</p>
                                <p className="text-lg">{requisition.purpose}</p>
                            </div>
                        </div>
                        <Separator />

                        <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Date</p>
                                <p className="text-lg">{requisition.date}</p>
                            </div>
                        </div>
                        <Separator />

                        <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Time</p>
                                <p className="text-lg">{requisition.time}</p>
                            </div>
                        </div>
                        <Separator />

                        <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">
                                    Number of Passengers
                                </p>
                                <p className="text-lg">
                                    {requisition.passengers}
                                </p>
                            </div>
                        </div>
                        <Separator />

                        <div className="flex items-start">
                            <Car className="h-5 w-5 mr-2 mt-1 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">
                                    Assigned Vehicle
                                </p>
                                <div className="flex items-center">
                                    <p className="text-lg">
                                        {assignedVehicle || "Not Assigned"}
                                    </p>
                                    {status !== "rejected" && (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="ml-2"
                                                >
                                                    {assignedVehicle
                                                        ? "Reassign"
                                                        : "Assign"}
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Assign Vehicle
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Select a vehicle to
                                                        assign to this
                                                        requisition.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="py-4">
                                                    <Label htmlFor="vehicle">
                                                        Available Vehicles
                                                    </Label>
                                                    <Select
                                                        onValueChange={
                                                            handleVehicleAssign
                                                        }
                                                    >
                                                        <SelectTrigger id="vehicle">
                                                            <SelectValue placeholder="Select a vehicle" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {availableVehicles.map(
                                                                (vehicle) => (
                                                                    <SelectItem
                                                                        key={
                                                                            vehicle.id
                                                                        }
                                                                        value={
                                                                            vehicle.id
                                                                        }
                                                                    >
                                                                        {
                                                                            vehicle.id
                                                                        }{" "}
                                                                        -{" "}
                                                                        {
                                                                            vehicle.type
                                                                        }{" "}
                                                                        (
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
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Separator />

                        <div className="flex items-start">
                            <div>
                                <p className="text-sm font-medium">
                                    Pickup Location
                                </p>
                                <p className="text-lg">
                                    {requisition.pickupLocation}
                                </p>
                            </div>
                        </div>
                        <Separator />

                        <div className="flex items-start">
                            <div>
                                <p className="text-sm font-medium">
                                    Destination
                                </p>
                                <p className="text-lg">
                                    {requisition.destination}
                                </p>
                            </div>
                        </div>
                        <Separator />

                        <div className="flex items-start">
                            <div>
                                <p className="text-sm font-medium">
                                    Additional Notes
                                </p>
                                <p className="text-lg">{requisition.notes}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Requester Information and Status Management */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Requester Information</CardTitle>
                            <CardDescription>
                                Details of the person who made the request
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center">
                                <div>
                                    <p className="text-sm font-medium">
                                        Requester Name
                                    </p>
                                    <p className="text-lg">
                                        {requisition.requester}
                                    </p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center">
                                <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Department
                                    </p>
                                    <p className="text-lg">
                                        {requisition.department}
                                    </p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center">
                                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Request Date
                                    </p>
                                    <p className="text-lg">
                                        {requisition.createdAt}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

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
                                    <Label htmlFor="status">
                                        Current Status
                                    </Label>
                                    <Select
                                        value={status}
                                        onValueChange={handleStatusUpdate}
                                    >
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
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

                                <div className="flex space-x-2">
                                    {status === "pending" && (
                                        <>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        className="flex-1"
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
                                                            Are you sure you
                                                            want to reject this
                                                            requisition? This
                                                            action cannot be
                                                            undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    "rejected"
                                                                )
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
                                                    <Button className="flex-1">
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
                                                            Assign a vehicle to
                                                            approve this
                                                            requisition.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="py-4">
                                                        <Label htmlFor="approve-vehicle">
                                                            Available Vehicles
                                                        </Label>
                                                        <Select
                                                            onValueChange={
                                                                handleVehicleAssign
                                                            }
                                                        >
                                                            <SelectTrigger id="approve-vehicle">
                                                                <SelectValue placeholder="Select a vehicle" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {availableVehicles.map(
                                                                    (
                                                                        vehicle
                                                                    ) => (
                                                                        <SelectItem
                                                                            key={
                                                                                vehicle.id
                                                                            }
                                                                            value={
                                                                                vehicle.id
                                                                            }
                                                                        >
                                                                            {
                                                                                vehicle.id
                                                                            }{" "}
                                                                            -{" "}
                                                                            {
                                                                                vehicle.type
                                                                            }{" "}
                                                                            (
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
                                                                handleStatusUpdate(
                                                                    "approved"
                                                                )
                                                            }
                                                        >
                                                            Approve without
                                                            Vehicle
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </>
                                    )}

                                    {status === "approved" &&
                                        !assignedVehicle && (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="flex-1">
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
                                                            Select a vehicle to
                                                            assign to this
                                                            requisition.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="py-4">
                                                        <Label htmlFor="assign-vehicle">
                                                            Available Vehicles
                                                        </Label>
                                                        <Select
                                                            onValueChange={
                                                                handleVehicleAssign
                                                            }
                                                        >
                                                            <SelectTrigger id="assign-vehicle">
                                                                <SelectValue placeholder="Select a vehicle" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {availableVehicles.map(
                                                                    (
                                                                        vehicle
                                                                    ) => (
                                                                        <SelectItem
                                                                            key={
                                                                                vehicle.id
                                                                            }
                                                                            value={
                                                                                vehicle.id
                                                                            }
                                                                        >
                                                                            {
                                                                                vehicle.id
                                                                            }{" "}
                                                                            -{" "}
                                                                            {
                                                                                vehicle.type
                                                                            }{" "}
                                                                            (
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
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        )}

                                    {status === "approved" && (
                                        <Button
                                            className="flex-1"
                                            onClick={() =>
                                                handleStatusUpdate("completed")
                                            }
                                        >
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Mark as Completed
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Activity Log</CardTitle>
                            <CardDescription>
                                Recent activity on this requisition
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="mr-2 h-2 w-2 mt-2 rounded-full bg-green-500"></div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            Requisition Created
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {requisition.createdAt} by{" "}
                                            {requisition.requester}
                                        </p>
                                    </div>
                                </div>

                                {status !== "pending" && (
                                    <div className="flex items-start">
                                        <div className="mr-2 h-2 w-2 mt-2 rounded-full bg-blue-500"></div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                Status Updated to{" "}
                                                {status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    status.slice(1)}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Just now by Admin
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {assignedVehicle && (
                                    <div className="flex items-start">
                                        <div className="mr-2 h-2 w-2 mt-2 rounded-full bg-purple-500"></div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                Vehicle {assignedVehicle}{" "}
                                                Assigned
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Just now by Admin
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
