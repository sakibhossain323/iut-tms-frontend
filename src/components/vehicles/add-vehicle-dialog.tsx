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
import {
    AddVehicleAction,
    AddVehicleResult,
} from "@/lib/actions/vehicle-actions";

// Initial form state
const initialState: AddVehicleResult = {
    errors: {},
    success: false,
    message: "",
};

export default function AddVehicleDialog({
    handleRefresh,
}: {
    handleRefresh: () => void;
}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formState, formAction, isPending] = useActionState(
        AddVehicleAction,
        initialState
    );

    // Form data for client-side validation
    const [formData, setFormData] = useState({
        registrationNumber: "",
        type: "",
        capacity: "",
    });

    // Client-side validation errors
    const [clientErrors, setClientErrors] = useState({
        registrationNumber: "",
        type: "",
        capacity: "",
    });

    // Handle form state changes (from server action)
    useEffect(() => {
        if (formState.success) {
            toast.success("Success", {
                description: "Vehicle has been added successfully.",
            });
            // Close dialog after success
            setDialogOpen(false);
            // Refresh vehicle list
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
            setFormData({ registrationNumber: "", type: "", capacity: "" });
            setClientErrors({ registrationNumber: "", type: "", capacity: "" });
        }
    }, [dialogOpen]);

    // Client-side validation
    const validateField = (name: string, value: string) => {
        let error = "";

        switch (name) {
            case "registrationNumber":
                if (!value.trim()) {
                    error = "Registration number is required";
                }
                break;
            case "type":
                if (!value.trim()) {
                    error = "Vehicle type is required";
                }
                break;
            case "capacity":
                if (!value.trim()) {
                    error = "Capacity is required";
                } else if (!/^\d+$/.test(value)) {
                    error = "Capacity must be a number";
                } else if (parseInt(value) < 1) {
                    error = "Capacity must be a positive integer";
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
            registrationNumber: validateField(
                "registrationNumber",
                formData.registrationNumber
            ),
            type: validateField("type", formData.type),
            capacity: validateField("capacity", formData.capacity),
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
                    <Button size="sm">Add Vehicle</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Vehicle</DialogTitle>
                        <DialogDescription>
                            Enter the vehicle registration, type, and capacity
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
                            <Label htmlFor="registrationNumber">
                                Registration Number
                            </Label>
                            <Input
                                id="registrationNumber"
                                name="registrationNumber"
                                placeholder="Enter registration number"
                                value={formData.registrationNumber}
                                onChange={handleInputChange}
                                disabled={isPending}
                                className={
                                    getFieldError("registrationNumber")
                                        ? "border-red-500"
                                        : ""
                                }
                                aria-invalid={
                                    getFieldError("registrationNumber")
                                        ? "true"
                                        : "false"
                                }
                            />
                            {getFieldError("registrationNumber") && (
                                <p className="text-sm text-red-500">
                                    {getFieldError("registrationNumber")}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Vehicle Type</Label>
                            <Input
                                id="type"
                                name="type"
                                placeholder="Enter vehicle type"
                                value={formData.type}
                                onChange={handleInputChange}
                                disabled={isPending}
                                className={
                                    getFieldError("type")
                                        ? "border-red-500"
                                        : ""
                                }
                                aria-invalid={
                                    getFieldError("type") ? "true" : "false"
                                }
                            />
                            {getFieldError("type") && (
                                <p className="text-sm text-red-500">
                                    {getFieldError("type")}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="capacity">Capacity</Label>
                            <Input
                                id="capacity"
                                name="capacity"
                                type="number"
                                min="1"
                                placeholder="Enter capacity"
                                value={formData.capacity}
                                onChange={handleInputChange}
                                disabled={isPending}
                                className={
                                    getFieldError("capacity")
                                        ? "border-red-500"
                                        : ""
                                }
                                aria-invalid={
                                    getFieldError("capacity") ? "true" : "false"
                                }
                            />
                            {getFieldError("capacity") && (
                                <p className="text-sm text-red-500">
                                    {getFieldError("capacity")}
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
