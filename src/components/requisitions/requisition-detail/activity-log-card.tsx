import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Approval, RequisitionStatus, Role, Vehicle } from "@/lib/definitions";
import { format } from "date-fns";
import UpdateStatusDialog from "./update-status-dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface ActivityLogCardProps {
    createdAt: string;
    approvals: Approval[];
    vehicle: Vehicle | null;
}

const formatDate = (isoString: string) => {
    return format(new Date(isoString), "hh:mm a; MMM dd, yyyy");
};

export async function ActivityLogCard({
    createdAt,
    approvals,
    vehicle,
}: ActivityLogCardProps) {
    // find first approval by HOD and Transport Officer
    const byHOD = approvals.find(
        (approval) => approval?.approverRole === Role.HOD
    );
    const byTO = approvals.find(
        (approval) => approval?.approverRole === Role.TRANSPORT_OFFICER
    );

    const session = await getServerSession(authOptions);
    const role = session?.role;
    const allowHodUpdate =
        byHOD?.approvalStatus === RequisitionStatus.PENDING &&
        (role === Role.ADMIN || role === Role.HOD);
    const allowTOUpate =
        byTO?.approvalStatus === RequisitionStatus.PENDING &&
        (role === Role.ADMIN || role === Role.TRANSPORT_OFFICER);

    return (
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
                        <div className="mr-2 h-2 w-2 mt-2 rounded-full bg-gray-500"></div>
                        <div>
                            <p className="text-sm font-medium">Created</p>
                            <p className="text-xs text-muted-foreground">
                                at{" "}
                                {format(
                                    new Date(createdAt),
                                    "hh:mm a; MMM dd, yyyy"
                                )}
                            </p>
                        </div>
                    </div>
                    {byHOD?.approvalStatus === RequisitionStatus.APPROVED && (
                        <div className="flex items-start">
                            <div className="mr-2 h-2 w-2 mt-2 rounded-full bg-blue-500"></div>
                            <div>
                                <p className="text-sm font-medium">Approved</p>
                                <p className="text-xs text-muted-foreground">
                                    {`by HOD at ${formatDate(
                                        byHOD.approvalDate
                                    )}`}
                                </p>
                            </div>
                        </div>
                    )}
                    {byTO?.approvalStatus === RequisitionStatus.APPROVED && (
                        <div className="flex items-start">
                            <div className="mr-2 h-2 w-2 mt-2 rounded-full bg-purple-500"></div>
                            <div>
                                <p className="text-sm font-medium">Approved</p>
                                <p className="text-xs text-muted-foreground">
                                    {`by Transport Officer at ${formatDate(
                                        byTO.approvalDate
                                    )}`}
                                </p>
                            </div>
                        </div>
                    )}
                    {vehicle && (
                        <div className="flex items-start">
                            <div className="mr-2 h-2 w-2 mt-2 rounded-full bg-green-500"></div>
                            <div>
                                <p className="text-sm font-medium">Done</p>
                                <p className="text-xs text-muted-foreground">
                                    Vehicle and driver has been assigned
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <>
                    {allowHodUpdate && (
                        <div className="flex space-x-2">
                            <UpdateStatusDialog
                                approvalId={byHOD.id}
                                status={RequisitionStatus.REJECTED}
                            />
                            <UpdateStatusDialog
                                approvalId={byHOD.id}
                                status={RequisitionStatus.APPROVED}
                            />
                        </div>
                    )}
                </>
                <>
                    {allowTOUpate && (
                        <div className="flex space-x-2">
                            <UpdateStatusDialog
                                approvalId={byTO.id}
                                status={RequisitionStatus.REJECTED}
                            />
                            <UpdateStatusDialog
                                approvalId={byTO.id}
                                status={RequisitionStatus.APPROVED}
                            />
                        </div>
                    )}
                </>
            </CardFooter>
        </Card>
    );
}
