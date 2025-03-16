import { UserTableSkeleton } from "@/components/users/user-table-skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">System Users</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="h-10 bg-muted rounded-md animate-pulse" />
                <div className="h-10 bg-muted rounded-md animate-pulse" />
                <div className="h-10 bg-muted rounded-md animate-pulse" />
            </div>

            <UserTableSkeleton />
        </div>
    );
}
