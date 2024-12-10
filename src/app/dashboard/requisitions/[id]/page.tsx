import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getReqStat, Requisition } from "@/lib/definitions";
import RequisitionDetails from "@/components/requisitions/RequisitionDetails";
import Link from "next/link";
import StatusDialog from "@/components/requisitions/StatusDialog";
import { Button } from "@/components/ui/button";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;
    const session = await getServerSession(authOptions);
    const res = await fetch(
        process.env.BACKEND_BASE_URL + "/requisitions/" + id,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        }
    );

    if (!res.ok) {
        return <div>Failed to fetch data</div>;
    }

    const requisition: Requisition = await res.json();
    const statusColor = getReqStat(requisition.status).color;
    const statusLabel = getReqStat(requisition.status).label;

    return (
        <div className="w-full p-2">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-semibold font-mono">
                    Requisition Details
                </h1>
            </div>
            <div className="mt-8">
                <div className="mb-4 text-lg font-semibold">
                    <span className={statusColor}>{statusLabel}</span>
                </div>
                <RequisitionDetails requisition={requisition} />
                <div className="flex justify-start gap-4 mt-4">
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/dashboard/requisitions">Back</Link>
                    </Button>
                    <StatusDialog requisition={requisition} />
                </div>
            </div>
        </div>
    );
}
