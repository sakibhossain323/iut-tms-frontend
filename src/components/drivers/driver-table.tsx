import Link from "next/link";
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
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { memo, useState, useTransition } from "react";
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
import { toast } from "sonner";
import { updateDriverStatusAction } from "@/lib/actions/driver-actions";

interface DriverTableProps {
    drivers: Driver[];
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

export function DriverTable({ drivers }: DriverTableProps) {
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [isPending, startTransition] = useTransition();

    // Handle status update
    const handleStatusUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedDriver) return;

        const formData = new FormData(e.currentTarget);
        formData.append("driverId", selectedDriver.id);

        startTransition(async () => {
            try {
                const result = await updateDriverStatusAction(formData);

                if (result.success) {
                    toast.success("Driver status updated successfully");
                    setStatusDialogOpen(false);
                } else {
                    toast.error(
                        result.error?.message ||
                            "Failed to update driver status"
                    );
                }
            } catch (error) {
                toast.error("An error occurred while updating driver status");
            }
        });
    };
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Contact</TableHead>
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
                                {driver.id.substring(0, 8)}
                                ...
                            </TableCell>
                            <TableCell>{driver.name}</TableCell>
                            <TableCell>
                                {driver.licenseNumber} ({driver.licenseType})
                            </TableCell>
                            <TableCell>{driver.contact}</TableCell>
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
                                                {selectedDriver?.name}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form
                                            onSubmit={handleStatusUpdate}
                                            className="space-y-4 py-2"
                                        >
                                            <div className="space-y-2">
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
                                                    type="submit"
                                                    disabled={isPending}
                                                >
                                                    {isPending
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
    );
}
