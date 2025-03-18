import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function UserTableSkeleton() {
    // Use a smaller number of skeleton rows to reduce ResizeObserver pressure
    const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Designation</TableHead>
                        <TableHead>Contact Number</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {skeletonRows.map((index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton className="h-4 w-[150px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[200px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[120px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[120px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-[80px]" />
                            </TableCell>
                            <TableCell className="text-right">
                                <Skeleton className="h-8 w-[60px] ml-auto" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
