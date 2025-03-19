import {
    Calendar,
    Clock,
    Users,
    Briefcase,
    Building,
    UserRound,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getRequisitionData } from "@/lib/data/requisition-data";
import { format } from "date-fns/format";
import AssignmentInfoCard from "@/components/requisitions/requisition-detail/assignment-info-card";
import {
    Requisition,
    Role,
    RequisitionStatus as Status,
    User,
} from "@/lib/definitions";
import { Badge } from "@/components/ui/badge";
import { ActivityLogCard } from "@/components/requisitions/requisition-detail/activity-log-card";
import { getUserData } from "@/lib/data/user-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpdateRoleDialog from "@/components/users/role-update-dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

export default async function UserDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // Get requisition ID from URL or use default
    const session = await getServerSession(authOptions);
    const id = session?.id as string;

    // Fetch requisition data
    const user: User = await getUserData(id);

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">User Details</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Profile Card */}
                <Card className="md:col-span-1">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src="#" alt={user.name} />
                            <AvatarFallback>
                                {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{user.name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    ID
                                </span>
                                <span className="font-medium">{user.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Role
                                </span>
                                <Badge
                                    className={getRoleBadgeColor(user.role)}
                                    variant="outline"
                                >
                                    {user.role}
                                </Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Department
                                </span>
                                <span className="font-medium">
                                    {user.department}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Designation
                                </span>
                                <span className="font-medium">
                                    {user.designation}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Contact
                                </span>
                                <span className="font-medium">
                                    {user.contactNumber}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* User Details and Management */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Account Management</CardTitle>
                        <CardDescription>
                            Manage user account settings and permissions
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* eWallet Section */}
                        <div>
                            <h3 className="text-lg font-medium mb-2">
                                eWallet Balance
                            </h3>
                            <div className="bg-muted p-4 rounded-md">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">
                                        Current Balance
                                    </span>
                                    <span className="text-2xl font-bold">
                                        ${user.eWalletBalance.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
