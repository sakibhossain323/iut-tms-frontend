import Link from "next/link";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Users,
    Briefcase,
    Building,
    UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { headers } from "next/headers";
import { getRequisitionData } from "@/lib/data/requisition-data";
import { format } from "date-fns/format";
import { RequisitionDetailWrapper } from "@/components/requisitions/requisition-detail/requisition-detail-wrapper";
import AssignmentInfoCard from "@/components/requisitions/requisition-detail/assignment-info-card";
import { Requisition, RequisitionStatus as Status } from "@/lib/definitions";
import { Badge } from "@/components/ui/badge";
import { ActivityLogCard } from "@/components/requisitions/requisition-detail/activity-log-card";

const getStatusBadge = (status: Status) => {
    switch (status) {
        case Status.PENDING:
            return (
                <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                >
                    Pending
                </Badge>
            );
        case Status.APPROVED:
            return (
                <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 hover:bg-green-100"
                >
                    Approved
                </Badge>
            );
        case Status.REJECTED:
            return (
                <Badge
                    variant="outline"
                    className="bg-red-100 text-red-800 hover:bg-red-100"
                >
                    Rejected
                </Badge>
            );
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};

export default async function RequisitionDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // Get requisition ID from URL or use default
    const requisitionId = (await params).id;

    // Fetch requisition data
    const requisition: Requisition = await getRequisitionData(requisitionId);

    const {
        id,
        purpose,
        dateTimeRequired,
        numberOfPassengers,
        placeToPickup,
        placesToVisit,
        status,
        vehicle,
        driver,
        notes,
        createdAt,
        user,
        approvals,
    } = requisition;

    const { name, designation, email, department } = user;

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            {/* Header with navigation and status */}
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">
                    Requisition #{id}
                </h2>
                {getStatusBadge(status)}
            </div>

            {/* Requistion Status Badge */}
            <div className="absolute top-8 right-8"></div>

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
                                <p className="text-lg">{purpose || "--"}</p>
                            </div>
                        </div>
                        <Separator />

                        <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">
                                    Pickup Date
                                </p>
                                <p className="text-lg">
                                    {format(
                                        new Date(dateTimeRequired),
                                        "MMM dd, yyyy"
                                    ) || "--"}
                                </p>
                            </div>
                        </div>
                        <Separator />

                        <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">
                                    Pickup Time
                                </p>
                                <p className="text-lg">
                                    {format(
                                        new Date(dateTimeRequired),
                                        "hh:mm a"
                                    ) || "--"}
                                </p>
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
                                    {numberOfPassengers || "--"}
                                </p>
                            </div>
                        </div>
                        <Separator />

                        <div className="flex items-start">
                            <div>
                                <p className="text-sm font-medium">
                                    Pickup Location
                                </p>
                                <p className="text-lg">{placeToPickup}</p>
                            </div>
                        </div>
                        <Separator />

                        <div className="flex items-start">
                            <div>
                                <p className="text-sm font-medium">
                                    Destination
                                </p>
                                <p className="text-lg">{placesToVisit}</p>
                            </div>
                        </div>
                        <Separator />

                        <div className="flex items-start">
                            <div>
                                <p className="text-sm font-medium">
                                    Additional Notes
                                </p>
                                <p className="text-lg">
                                    {requisition.notes || "--"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Requester Information and Client Components */}
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
                                <UserRound className="h-5 w-5 mr-2 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Requested by
                                    </p>
                                    <p className="text-sm">
                                        {name || "--"}, {designation || " --"}{" "}
                                        <br />
                                        {email || "--"}
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
                                        {department || "--"}
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
                                        {format(
                                            new Date(createdAt),
                                            "hh:mm a; MMM dd, yyyy"
                                        ) || "--"}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Client components for vehicle, status, and activity log */}
                    <ActivityLogCard
                        createdAt={createdAt}
                        approvals={approvals}
                        vehicle={vehicle}
                    />
                    {/* <RequisitionDetailWrapper requisition={requisition} /> */}
                    <AssignmentInfoCard
                        requisitionId={id}
                        vehicle={vehicle}
                        driver={driver}
                    />
                </div>
            </div>
        </div>
    );
}
