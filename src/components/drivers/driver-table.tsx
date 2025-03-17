import { Driver, DriverStatus as Status } from "@/lib/definitions";
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
import { useActionState, useEffect, useOptimistic, useState } from "react";

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

interface DriverTableProps {
    drivers: Driver[];
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
        case Status.ON_LEAVE:
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

const initialState: UpdateDriverStatusResult = {
    success: false,
    error: {},
    message: "",
};

export function DriverTable({ drivers, handleRefresh }: DriverTableProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

    const [formState, formAction, pending] = useActionState(
        updateDriverStatusAction,
        initialState
    );

    useEffect(() => {
        if (formState?.success) {
            toast.success("Success", {
                description: "Driver status has been updated successfully.",
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
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>License</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {drivers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No drivers found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        drivers.map((driver) => (
                            <TableRow key={driver.id}>
                                <TableCell className="font-medium">
                                    {driver.id}
                                </TableCell>
                                <TableCell>{driver?.user?.name}</TableCell>
                                <TableCell>{driver?.user?.email}</TableCell>
                                <TableCell>
                                    {driver?.user?.contactNumber}
                                </TableCell>
                                <TableCell>{driver.licenseNumber}</TableCell>
                                <TableCell>
                                    {getStatusBadge(driver.status)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Dialog
                                        open={
                                            statusDialogOpen &&
                                            selectedDriver?.id === driver.id
                                        }
                                        onOpenChange={(open) => {
                                            setStatusDialogOpen(open);
                                            if (open) setSelectedDriver(driver);
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
                                                    Change the status of{" "}
                                                    {selectedDriver?.user?.name}
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form
                                                action={formAction}
                                                className="space-y-4 py-2"
                                            >
                                                <div className="space-y-2">
                                                    {/* hidden input field for driverid */}
                                                    <input
                                                        type="hidden"
                                                        name="driverId"
                                                        value={
                                                            selectedDriver?.id
                                                        }
                                                    />
                                                    <Label htmlFor="status">
                                                        Status
                                                    </Label>
                                                    <select
                                                        id="status"
                                                        name="status"
                                                        defaultValue={
                                                            selectedDriver?.status
                                                        }
                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        <option value="ACTIVE">
                                                            Active
                                                        </option>
                                                        <option value="INACTIVE">
                                                            Inactive
                                                        </option>
                                                        <option value="ON_LEAVE">
                                                            On Leave
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
