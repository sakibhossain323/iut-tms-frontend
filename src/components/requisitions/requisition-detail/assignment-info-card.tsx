import { Car, User } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Driver, Vehicle } from "@/lib/definitions";
import AssignDialog from "./assign-dialog";

interface AssignmentInfoCardProps {
    requisitionId: string;
    vehicle: Vehicle | null;
    driver: Driver | null;
}

export default async function AssignmentInfoCard({
    requisitionId,
    vehicle,
    driver,
}: AssignmentInfoCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Assignment Information</CardTitle>
                <CardDescription>
                    Vehicle and driver assigned to this requisition
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Vehicle Information */}
                <div className="flex items-start">
                    <Car className="h-5 w-5 mr-2 mt-1 text-muted-foreground" />
                    <div>
                        <p className="text-sm font-medium">Assigned Vehicle</p>
                        <div className="flex items-center">
                            <p className="text-lg">
                                {vehicle
                                    ? `${vehicle.type} | ${vehicle.capacity} Seats | ${vehicle.registrationNumber}`
                                    : "Not Assigned"}
                            </p>
                        </div>
                    </div>
                </div>
                <Separator />

                {/* Driver Information */}
                <div className="flex items-start">
                    <User className="h-5 w-5 mr-2 mt-1 text-muted-foreground" />
                    <div>
                        <p className="text-sm font-medium">Assigned Driver</p>
                        <div className="flex items-center">
                            <p className="text-lg">
                                {driver
                                    ? `${driver?.user?.name} | Contact: ${driver?.user?.contactNumber}`
                                    : "Not Assigned"}
                            </p>
                        </div>
                    </div>
                </div>
                <AssignDialog
                    requisitionId={requisitionId}
                    vehicle={vehicle}
                    driver={driver}
                />
            </CardContent>
        </Card>
    );
}
