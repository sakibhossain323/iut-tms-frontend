"use client";

import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { updateRequisitionStatus } from "@/lib/actions";
import { Requisition } from "@/lib/definitions";
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select";

export default function StatusDialog({
    requisition,
}: {
    requisition: Requisition;
}) {
    const [status, setStatus] = useState(requisition?.status);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className="bg-blue-600 transition-colors hover:bg-blue-700"
                >
                    Update Status
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Requisition Status</DialogTitle>
                </DialogHeader>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="PENDING">Pending</option>
                    <option value="HOD_APPROVED">In Review</option>
                    <option value="COMPLETED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                </select>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="submit"
                            className="bg-blue-600 transition-colors hover:bg-blue-700"
                            onClick={(e) => {
                                const formData = new FormData();
                                formData.append("status", status);
                                formData.append(
                                    "id",
                                    requisition.id.toString()
                                );
                                updateRequisitionStatus(formData);
                            }}
                        >
                            Save Changes
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
