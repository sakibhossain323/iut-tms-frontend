import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Role,
    RequisitionStatus as Status,
    type Requisition,
} from "@/lib/definitions";
import { format } from "date-fns/format";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface RequisitionTableProps {
    requisitions: Requisition[];
}

export function RequisitionTable({ requisitions }: RequisitionTableProps) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const role = session?.role;
    const showRequester =
        role === Role.ADMIN ||
        role === Role.TRANSPORT_OFFICER ||
        role === Role.HOD;

    const showDepartment =
        role === Role.ADMIN || role === Role.TRANSPORT_OFFICER;

    const formatDateTime = (isoString: string) => {
        return format(new Date(isoString), "hh:mm a; MMM dd, yyyy");
    };
    // Status badge styling helper
    const getStatusBadge = (status: string) => {
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
            case Status.COMPLETED:
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

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    {showRequester && <TableHead>Requester</TableHead>}
                    {showDepartment && <TableHead>Department</TableHead>}
                    <TableHead>Purpose</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Passengers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {requisitions.length > 0 ? (
                    requisitions.map((req) => (
                        <TableRow key={req.id}>
                            <TableCell className="font-medium">
                                {req.id}
                            </TableCell>
                            {showRequester && (
                                <TableCell>{req?.user?.email}</TableCell>
                            )}
                            {showDepartment && (
                                <TableCell>
                                    {req?.user?.department || "--"}
                                </TableCell>
                            )}
                            <TableCell>{req.purpose}</TableCell>
                            <TableCell>
                                {formatDateTime(req.dateTimeRequired)}
                            </TableCell>
                            <TableCell>{req.numberOfPassengers}</TableCell>
                            <TableCell>{getStatusBadge(req.status)}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`${pathname}/${req.id}`}>
                                        View
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                            No requisitions found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
