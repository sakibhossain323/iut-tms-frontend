// AdminDashboard.jsx
import { Suspense } from "react";
import {
    ActiveDriversCard,
    ActiveVehiclesCard,
    PendingRequisitionsCard,
} from "@/components/dashboard/card";
import { CardSkeleton } from "@/components/dashboard/card-skeleton";

export default function AdminDashboard() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardSkeleton />}>
                    <PendingRequisitionsCard />
                </Suspense>
                <Suspense fallback={<CardSkeleton />}>
                    <ActiveVehiclesCard />
                </Suspense>

                <Suspense fallback={<CardSkeleton />}>
                    <ActiveDriversCard />
                </Suspense>
                {/* 

                <Suspense fallback={<CardSkeleton />}>
                    <TotalUsersCard />
                </Suspense> */}
            </div>
        </div>
    );
}
