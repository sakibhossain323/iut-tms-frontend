import Link from "next/link";
import { type User, Role } from "@/lib/definitions";
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
import { memo } from "react";

interface UserTableProps {
    users: User[];
}

const getRoleBadgeColor = (role: Role) => {
    switch (role) {
        case Role.ADMIN:
            return "bg-red-100 text-red-800 hover:bg-red-100";
        case Role.TRANSPORT_OFFICER:
            return "bg-purple-100 text-purple-800 hover:bg-purple-100";
        case Role.HOD:
            return "bg-blue-100 text-blue-800 hover:bg-blue-100";
        case Role.USER:
            return "bg-green-100 text-green-800 hover:bg-green-100";
        case Role.DRIVER:
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
        default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
};

// Memoize the table row to prevent unnecessary re-renders
const UserTableRow = memo(({ user }: { user: User }) => (
    <TableRow key={user.id}>
        <TableCell className="font-medium">{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.designation}</TableCell>
        <TableCell>{user.contactNumber}</TableCell>
        <TableCell>
            <Badge className={getRoleBadgeColor(user.role)} variant="outline">
                {user.role}
            </Badge>
        </TableCell>
        <TableCell className="text-right">
            <Button variant="ghost" size="sm" asChild>
                <Link href={`/users/${user.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                </Link>
            </Button>
        </TableCell>
    </TableRow>
));

UserTableRow.displayName = "UserTableRow";

export function UserTable({ users }: UserTableProps) {
    return (
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
                {users.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                            No users found.
                        </TableCell>
                    </TableRow>
                ) : (
                    users.map((user) => (
                        <UserTableRow key={user.id} user={user} />
                    ))
                )}
            </TableBody>
        </Table>
    );
}
