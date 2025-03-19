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
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { updateUserRoleAction } from "@/lib/actions/user-actions";

// Define the role enum
export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    DRIVER = "DRIVER",
    HOD = "HOD",
    TRANSPORT_OFFICER = "TRANSPORT_OFFICER",
}

// Define the form state type
interface UpdateRoleFormState {
    success: boolean;
    message: string;
}

// Define the component props
interface UpdateRoleDialogProps {
    userId: string;
    currentRole?: Role;
}

const initialState: UpdateRoleFormState = {
    success: false,
    message: "",
};

export default function UpdateRoleDialog({
    userId,
    currentRole,
}: UpdateRoleDialogProps) {
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | undefined>(
        currentRole
    );
    const [isLoading, setIsLoading] = useState(false);

    const [formState, formAction, pending] = useActionState(
        updateUserRoleAction,
        initialState
    );

    // Handle form state changes
    useEffect(() => {
        if (formState?.success) {
            toast.success("Success", {
                description: "User role has been updated successfully.",
            });
            setDialogOpen(false);
            router.refresh();
        } else if (formState?.message && !formState.success) {
            toast.error("Update failed", {
                description: formState.message,
            });
        }
    }, [formState, router]);

    return (
        <>
            <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    setDialogOpen(open);
                }}
            >
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        Update Role
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update User Role</DialogTitle>
                        <DialogDescription>
                            Change the user's role and permissions
                        </DialogDescription>
                    </DialogHeader>
                    <form action={formAction} className="space-y-4 py-2">
                        <input type="hidden" name="userId" value={userId} />

                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <select
                                id="role"
                                name="role"
                                defaultValue={currentRole}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {Object.values(Role).map((role) => (
                                    <option key={role} value={role}>
                                        {role.replace("_", " ")}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                                disabled={pending || isLoading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={pending}>
                                {pending ? "Updating..." : "Update Role"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Toaster position="bottom-right" richColors />
        </>
    );
}
