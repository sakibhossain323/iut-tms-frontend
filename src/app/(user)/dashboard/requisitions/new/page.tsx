import RequisitionForm from "@/components/requisitions/RequisitionForm";

export default function Page() {
    return (
        <div className="w-full p-2">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-semibold font-mono">
                    New Requisition
                </h1>
            </div>
            <div className="mt-8">
                <RequisitionForm />
            </div>
        </div>
    );
}
