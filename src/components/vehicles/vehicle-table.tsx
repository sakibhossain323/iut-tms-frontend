import { VehicleStatus as Status, Vehicle } from "@/lib/definitions";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useActionState, useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { toast, Toaster } from "sonner";
import {
    updateDriverStatusAction,
    UpdateDriverStatusResult,
} from "@/lib/actions/driver-actions";
import { usePathname, useRouter } from "next/navigation";
import { updateVehicleStatusAction } from "@/lib/actions/vehicle-actions";

interface VehicleTableProps {
    vehicles: Vehicle[];
    handleRefresh: () => void;
}

const getStatusBadge = (status: string) => {
    switch (status) {
        case Status.INACTIVE:
            return (
                <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                >
                    Inactive
                </Badge>
            );
        case Status.ACTIVE:
            return (
                <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 hover:bg-green-100"
                >
                    Active
                </Badge>
            );
        case Status.UNDER_MAINTENANCE:
            return (
                <Badge
                    variant="outline"
                    className="bg-red-100 text-red-800 hover:bg-red-100"
                >
                    Under Maintenance
                </Badge>
            );
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};

const initialState: UpdateDriverStatusResult = {
    success: false,
    error: {},
    message: "",
};

export function VehicleTable({ vehicles, handleRefresh }: VehicleTableProps) {
    const router = useRouter();
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(
        null
    );

    const [formState, formAction, pending] = useActionState(
        updateVehicleStatusAction,
        initialState
    );

    useEffect(() => {
        if (formState?.success) {
            toast.success("Success", {
                description: "Vehicle status has been updated successfully.",
            });
            setStatusDialogOpen(false);
            handleRefresh();
        } else if (formState?.message && !formState.success) {
            toast.error("Submission failed", {
                description: formState.message,
            });
        }
    }, [formState, router]);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Registration No.</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vehicles.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No drivers found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        vehicles.map((vehicle) => (
                            <TableRow key={vehicle.id}>
                                <TableCell className="font-medium">
                                    {vehicle.id}
                                </TableCell>
                                <TableCell>
                                    {vehicle?.registrationNumber}
                                </TableCell>
                                <TableCell>{vehicle?.type}</TableCell>
                                <TableCell>{vehicle?.capacity}</TableCell>
                                <TableCell>
                                    {getStatusBadge(vehicle.status)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Dialog
                                        open={
                                            statusDialogOpen &&
                                            selectedVehicle?.id === vehicle.id
                                        }
                                        onOpenChange={(open) => {
                                            setStatusDialogOpen(open);
                                            if (open)
                                                setSelectedVehicle(vehicle);
                                        }}
                                    >
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                Update Status
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Update Driver Status
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Change the status of vehicle
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form
                                                action={formAction}
                                                className="space-y-4 py-2"
                                            >
                                                <div className="space-y-2">
                                                    {/* hidden input field for Vechileid */}
                                                    <input
                                                        type="hidden"
                                                        name="vehicleId"
                                                        value={
                                                            selectedVehicle?.id
                                                        }
                                                    />
                                                    <Label htmlFor="status">
                                                        Status
                                                    </Label>
                                                    <select
                                                        id="status"
                                                        name="status"
                                                        defaultValue={
                                                            selectedVehicle?.status
                                                        }
                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        <option
                                                            value={
                                                                Status.ACTIVE
                                                            }
                                                        >
                                                            Active
                                                        </option>
                                                        <option
                                                            value={
                                                                Status.INACTIVE
                                                            }
                                                        >
                                                            Inactive
                                                        </option>
                                                        <option
                                                            value={
                                                                Status.UNDER_MAINTENANCE
                                                            }
                                                        >
                                                            Under Maintenance
                                                        </option>
                                                    </select>
                                                </div>
                                                <DialogFooter>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() =>
                                                            setStatusDialogOpen(
                                                                false
                                                            )
                                                        }
                                                        disabled={pending}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        disabled={pending}
                                                    >
                                                        {pending
                                                            ? "Updating..."
                                                            : "Save Changes"}
                                                    </Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <Toaster position="bottom-right" richColors />
        </>
    );
}
