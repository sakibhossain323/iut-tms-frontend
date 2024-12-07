import ListSkeleton from "@/components/requisitions/ListSkeleton";
import RequisitionList from "@/components/requisitions/RequisitionList";
import SearchRequisitions from "@/components/requisitions/SearchRequisitions";
import Link from "next/link";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

export default function Page() {
    return (
        <div className="w-full p-2">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-semibold">Requisitions</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
                <SearchRequisitions />
                <Link
                    href="/dashboard/requisitions/new"
                    className="flex h-10 items-center rounded-lg px-4 gap-2 text-sm font-medium text-white
                                bg-blue-600 hover:bg-indigo-600"
                >
                    <span className="hidden md:block">New Requistion</span>
                    <LuPlus size={18} />
                </Link>
            </div>
            <Suspense fallback={<ListSkeleton />}>
                <RequisitionList />
            </Suspense>
        </div>
    );
}
