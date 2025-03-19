"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { toast, Toaster } from "sonner";
import { AddDriverAction, AddDriverResult } from "@/lib/actions/driver-actions";

// Initial form state
const initialState: AddDriverResult = {
    errors: {},
    success: false,
    message: "",
};

export default function AddDriverDialog({
    handleRefresh,
}: {
    handleRefresh: () => void;
}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formState, formAction, isPending] = useActionState(
        AddDriverAction,
        initialState
    );

    // Form data for client-side validation
    const [formData, setFormData] = useState({
        email: "",
        licenseNumber: "",
    });

    // Client-side validation errors
    const [clientErrors, setClientErrors] = useState({
        email: "",
        licenseNumber: "",
    });

    // Handle form state changes (from server action)
    useEffect(() => {
        if (formState.success) {
            toast.success("Success", {
                description: "Driver has been added successfully.",
            });
            // Close dialog after success
            setDialogOpen(false);
            // Refresh driver list
            handleRefresh();
        } else if (formState.message && !formState.success) {
            toast.error("Submission failed", {
                description: formState.message,
            });
        }
    }, [formState]);

    // Reset form when dialog closes
    useEffect(() => {
        if (!dialogOpen) {
            setFormData({ email: "", licenseNumber: "" });
            setClientErrors({ email: "", licenseNumber: "" });
        }
    }, [dialogOpen]);

    // Client-side validation
    const validateField = (name: string, value: string) => {
        let error = "";

        switch (name) {
            case "email":
                if (!value.trim()) {
                    error = "Email is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = "Please enter a valid email address";
                }
                break;
            case "licenseNumber":
                if (!value.trim()) {
                    error = "License number is required";
                }
                break;
        }

        return error;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update form data
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Validate field and update client errors
        const error = validateField(name, value);
        setClientErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    // Client-side validation before form submission
    const validateForm = () => {
        const newErrors = {
            email: validateField("email", formData.email),
            licenseNumber: validateField(
                "licenseNumber",
                formData.licenseNumber
            ),
        };

        setClientErrors(newErrors);

        // Check if there are any errors
        return !Object.values(newErrors).some((error) => error !== "");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent form submission if client-side validation fails
        if (!validateForm()) {
            e.preventDefault();
            return;
        }
    };

    // Get server-side or client-side error for a field
    const getFieldError = (fieldName: keyof typeof clientErrors) => {
        // First check server errors
        const serverErrors = formState.errors?.[fieldName];
        if (serverErrors && serverErrors.length > 0) {
            return serverErrors[0];
        }

        // Then check client errors
        return clientErrors[fieldName];
    };

    return (
        <>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button size="sm">Add Driver</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Driver</DialogTitle>
                        <DialogDescription>
                            Enter the user's email and license information
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        action={formAction}
                        onSubmit={handleSubmit}
                        className="space-y-4 py-2"
                    >
                        {/* Form-level error */}
                        {formState.errors?._form && (
                            <div className="rounded-md bg-red-50 p-3 text-red-500 dark:bg-red-900/30 dark:text-red-200">
                                {formState.errors._form.map((error, i) => (
                                    <p key={i}>{error}</p>
                                ))}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">User Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="user@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isPending}
                                className={
                                    getFieldError("email")
                                        ? "border-red-500"
                                        : ""
                                }
                                aria-invalid={
                                    getFieldError("email") ? "true" : "false"
                                }
                            />
                            {getFieldError("email") && (
                                <p className="text-sm text-red-500">
                                    {getFieldError("email")}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="licenseNumber">
                                License Number
                            </Label>
                            <Input
                                id="licenseNumber"
                                name="licenseNumber"
                                placeholder="Enter license number"
                                value={formData.licenseNumber}
                                onChange={handleInputChange}
                                disabled={isPending}
                                className={
                                    getFieldError("licenseNumber")
                                        ? "border-red-500"
                                        : ""
                                }
                                aria-invalid={
                                    getFieldError("licenseNumber")
                                        ? "true"
                                        : "false"
                                }
                            />
                            {getFieldError("licenseNumber") && (
                                <p className="text-sm text-red-500">
                                    {getFieldError("licenseNumber")}
                                </p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <div className="flex items-center">
                                        <svg
                                            className="mr-2 h-4 w-4 animate-spin"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Submitting...
                                    </div>
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Toaster position="bottom-right" richColors />
        </>
    );
}
