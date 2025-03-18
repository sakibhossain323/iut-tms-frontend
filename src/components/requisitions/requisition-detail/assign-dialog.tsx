"use client";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
    assignVehicleDriverAction,
    AssignVehicleDriverFormState,
} from "@/lib/actions/requisition-actions";
import { toast, Toaster } from "sonner";
import {
    Driver,
    DriverStatus,
    Vehicle,
    VehicleStatus,
} from "@/lib/definitions";
import { fetchVehiclesAction } from "@/lib/actions/vehicle-actions";
import { fetchDriversAction } from "@/lib/actions/driver-actions";
import { set } from "date-fns";

interface AssignDialogProps {
    requisitionId: string;
    vehicle: Vehicle | null;
    driver: Driver | null;
}

const initialState: AssignVehicleDriverFormState = {
    success: false,
    message: "",
};

export default function AssignDialog({
    requisitionId,
    vehicle,
    driver,
}: AssignDialogProps) {
    const router = useRouter();
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(
        vehicle
    );
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(driver);
    const [isLoading, setIsLoading] = useState(false);

    const [formState, formAction, pending] = useActionState(
        assignVehicleDriverAction,
        initialState
    );

    // Fetch available vehicles and drivers when dialog opens
    useEffect(() => {
        if (statusDialogOpen) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const vehiclesData = await fetchVehiclesAction({
                        statusFilter: VehicleStatus.ACTIVE,
                        itemsPerPage: 100,
                    });
                    const driversData = await fetchDriversAction({
                        statusFilter: DriverStatus.ACTIVE,
                        itemsPerPage: 100,
                    });

                    setVehicles(vehiclesData.data || []);
                    setDrivers(driversData.data || []);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    toast.error("Failed to load vehicles and drivers");
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData();
        }
    }, [statusDialogOpen]);

    // Handle form state changes
    useEffect(() => {
        if (formState?.success) {
            toast.success("Success", {
                description:
                    "Vehicle and driver have been assigned successfully.",
            });
            setStatusDialogOpen(false);
            setSelectedVehicle(vehicle);
            setSelectedDriver(driver);
            router.refresh();
        } else if (formState?.message && !formState.success) {
            toast.error("Submission failed", {
                description: formState.message,
            });
        }
    }, [formState, router]);

    return (
        <>
            <Dialog
                open={statusDialogOpen}
                onOpenChange={(open) => {
                    setStatusDialogOpen(open);
                }}
            >
                <DialogTrigger asChild>
                    <Button className="w-full">
                        {vehicle || driver ? "Reassign" : "Assign"} Vehicle &
                        Driver
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Assign Vehicle & Driver</DialogTitle>
                        <DialogDescription>
                            Select from available vehicles and drivers
                        </DialogDescription>
                    </DialogHeader>
                    <form action={formAction} className="space-y-4 py-2">
                        <input
                            type="hidden"
                            name="requisitionId"
                            value={requisitionId}
                        />

                        <div className="space-y-2">
                            <Label htmlFor="vehicleId">Vehicle</Label>
                            {isLoading ? (
                                <div className="h-10 bg-gray-100 animate-pulse rounded" />
                            ) : (
                                <>
                                    <select
                                        id="vehicleId"
                                        name="vehicleId"
                                        defaultValue={selectedVehicle?.id}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">
                                            Select a vehicle
                                        </option>
                                        {vehicles.length === 0 ? (
                                            <option value="" disabled>
                                                No available vehicles
                                            </option>
                                        ) : (
                                            vehicles.map((vehicle) => (
                                                <option
                                                    key={vehicle.id}
                                                    value={vehicle.id}
                                                >
                                                    {`${vehicle.type} | ${vehicle.capacity} Seats | ${vehicle.registrationNumber}`}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="driverId">Driver</Label>
                            {isLoading ? (
                                <div className="h-10 bg-gray-100 animate-pulse rounded" />
                            ) : (
                                <>
                                    <select
                                        id="driverId"
                                        name="driverId"
                                        defaultValue={selectedDriver?.id}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">
                                            Select a driver
                                        </option>
                                        {drivers.length === 0 ? (
                                            <option value="" disabled>
                                                No available drivers
                                            </option>
                                        ) : (
                                            drivers.map((driver) => (
                                                <option
                                                    key={driver.id}
                                                    value={driver.id}
                                                >
                                                    {driver.user.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setStatusDialogOpen(false)}
                                disabled={pending || isLoading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={pending}>
                                {pending ? "Assigning..." : "Assign"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Toaster position="bottom-right" richColors />
        </>
    );
}
