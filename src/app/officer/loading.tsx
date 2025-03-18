import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Main content area */}
            <div className="flex-1 overflow-auto p-6">
                {/* Header with search and profile */}
                <div className="flex items-center justify-between mb-6">
                    <Skeleton className="h-8 w-48" />
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-9 w-9" />
                        <Skeleton className="h-9 w-9" />
                        <Skeleton className="h-9 w-9 rounded-full" />
                    </div>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white p-4 rounded-lg border shadow-sm"
                        >
                            <div className="flex justify-between mb-3">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-6 w-6" />
                            </div>
                            <Skeleton className="h-8 w-24 mb-2" />
                            <div className="flex items-center space-x-2">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chart section */}
                <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <Skeleton className="h-5 w-40" />
                        <div className="flex space-x-2">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                    </div>
                    <Skeleton className="h-64 w-full rounded-md" />
                </div>

                {/* Table section */}
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <Skeleton className="h-5 w-40" />
                        <div className="flex space-x-2">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-8 w-8" />
                        </div>
                    </div>

                    {/* Table header */}
                    <div className="flex items-center py-2 border-b">
                        <Skeleton className="h-4 w-4 mr-3" />
                        <Skeleton className="h-4 w-40 mr-6" />
                        <Skeleton className="h-4 w-32 mr-6" />
                        <Skeleton className="h-4 w-32 mr-6" />
                        <Skeleton className="h-4 w-24 mr-6" />
                        <Skeleton className="h-4 w-24" />
                    </div>

                    {/* Table rows */}
                    {[...Array(7)].map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center py-3 border-b"
                        >
                            <Skeleton className="h-4 w-4 mr-3" />
                            <Skeleton className="h-4 w-40 mr-6" />
                            <Skeleton className="h-4 w-32 mr-6" />
                            <Skeleton className="h-4 w-32 mr-6" />
                            <Skeleton className="h-4 w-24 mr-6" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    ))}

                    {/* Table pagination */}
                    <div className="flex items-center justify-between mt-4">
                        <Skeleton className="h-4 w-36" />
                        <div className="flex items-center space-x-1">
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
