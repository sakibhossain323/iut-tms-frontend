"use client";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import {
    updateStatusAction,
    UpdateStatusFormState,
} from "@/lib/actions/requisition-actions";
import { toast, Toaster } from "sonner";

interface UpdateStatusProps {
    approvalId: string;
    status: string;
}

const initialState: UpdateStatusFormState = {
    success: false,
    message: "",
};

export default function AssignDialog({
    approvalId,
    status,
}: UpdateStatusProps) {
    const isRejected = status === "REJECTED";
    const router = useRouter();
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formState, formAction, pending] = useActionState(
        updateStatusAction,
        initialState
    );

    // Handle form state changes
    useEffect(() => {
        if (formState?.success) {
            toast.success("Success", {
                description: "Requistion status successfully.",
            });
            setStatusDialogOpen(false);
            router.refresh();
        } else if (formState?.message && !formState.success) {
            toast.error("Submission failed", {
                description: formState.message,
            });
        }
    }, [formState, router]);

    return (
        <>
            <Dialog
                open={statusDialogOpen}
                onOpenChange={(open) => {
                    setStatusDialogOpen(open);
                }}
            >
                <DialogTrigger asChild>
                    {isRejected ? (
                        <Button
                            variant="destructive"
                            onClick={() => setStatusDialogOpen(true)}
                        >
                            Reject
                        </Button>
                    ) : (
                        <Button onClick={() => setStatusDialogOpen(true)}>
                            Approve
                        </Button>
                    )}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            Confirm {isRejected ? "Reject" : "Approve"}
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to{" "}
                            {isRejected ? "Reject" : "Approve"} this
                            requisition?
                        </DialogDescription>
                    </DialogHeader>
                    <form action={formAction} className="space-y-4 py-2">
                        <input
                            type="hidden"
                            name="approvalId"
                            value={approvalId}
                        />
                        <input type="hidden" name="status" value={status} />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setStatusDialogOpen(false)}
                                disabled={pending || isLoading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={pending}>
                                {pending ? "Assigning..." : "Confirm"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Toaster position="bottom-right" richColors />
        </>
    );
}
