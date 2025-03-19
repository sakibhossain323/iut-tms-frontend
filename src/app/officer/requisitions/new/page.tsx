"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useActionState } from "react";
import { CalendarIcon } from "lucide-react";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    createRequisition,
    type RequisitionFormState,
} from "@/lib/actions/requisition-actions";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import Link from "next/link";

// Initial form state
const initialState: RequisitionFormState = {
    errors: {},
    success: false,
    message: "",
};

const generateTimeOptions = () => {
    const timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
        timeOptions.push({
            value: `${hour.toString().padStart(2, "0")}:00`,
            label: `${hour.toString().padStart(2, "0")}:00`,
        });
        timeOptions.push({
            value: `${hour.toString().padStart(2, "0")}:30`,
            label: `${hour.toString().padStart(2, "0")}:30`,
        });
    }
    return timeOptions;
};

export default function CreateRequisitionPage() {
    const router = useRouter();
    const pathname = usePathname();
    const [formState, formAction, isPending] = useActionState(
        createRequisition,
        initialState
    );

    // Date picker state
    const [date, setDate] = useState<Date | undefined>(undefined);
    const timeOptions = generateTimeOptions();

    // Client-side validation for immediate feedback
    const [clientErrors, setClientErrors] = useState({
        purpose: "",
        pickupLocation: "",
        placesToVisit: "",
        pickupTime: "",
        pickupDate: "",
        numberOfPassengers: "",
        contactPersonNumber: "",
    });

    // Form data for client-side validation
    const [formData, setFormData] = useState({
        purpose: "",
        pickupLocation: "",
        placesToVisit: "",
        pickupTime: "",
        pickupDate: "",
        numberOfPassengers: "",
        contactPersonNumber: "",
    });

    // Handle form state changes (from server action)
    useEffect(() => {
        if (formState.success) {
            toast.success("Success", {
                description: "Your requisition has been created successfully.",
            });

            // Redirect to dashboard or requisitions list after success
            setTimeout(() => {
                router.push(pathname.replace("/new", ""));
            }, 1500);
        } else if (formState.message && !formState.success) {
            toast.error("Submission failed", {
                description: formState.message,
            });
        }
    }, [formState, router]);

    // Update form data when date changes
    useEffect(() => {
        if (date) {
            const formattedDate = format(date, "yyyy-MM-dd");
            setFormData((prev) => ({
                ...prev,
                pickupDate: formattedDate,
            }));

            // Validate the field
            const error = validateField("pickupDate", formattedDate);
            setClientErrors((prev) => ({
                ...prev,
                pickupDate: error,
            }));
        }
    }, [date]);

    // Client-side validation
    const validateField = (name: string, value: string) => {
        let error = "";

        switch (name) {
            case "purpose":
                if (!value.trim()) {
                    error = "Purpose is required";
                }
                break;
            case "pickupLocation":
                if (!value.trim()) {
                    error = "Pickup location is required";
                }
                break;
            case "placesToVisit":
                if (!value.trim()) {
                    error = "Places to visit is required";
                }
                break;
            case "pickupTime":
                if (!value.trim()) {
                    error = "Pickup time is required";
                }
                break;
            case "pickupDate":
                if (!value.trim()) {
                    error = "Pickup date is required";
                }
                break;
            case "numberOfPassengers":
                if (!value) {
                    error = "Number of passengers is required";
                } else if (isNaN(Number(value))) {
                    error = "Must be a valid number";
                } else if (Number(value) <= 0) {
                    error = "Must be greater than 0";
                } else if (Number(value) > 100) {
                    error = "Number of passengers must be less than 100";
                }
                break;
            case "contactPersonNumber":
                if (!value) {
                    error = "Contact number is required";
                } else if (!/^\+?[0-9\s-()]{8,}$/.test(value)) {
                    error = "Contact number is invalid";
                }
                break;
        }

        return error;
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
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

    const handleSelectChange = (value: string, name: string) => {
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
            purpose: validateField("purpose", formData.purpose),
            pickupLocation: validateField(
                "pickupLocation",
                formData.pickupLocation
            ),
            placesToVisit: validateField(
                "placesToVisit",
                formData.placesToVisit
            ),
            pickupTime: validateField("pickupTime", formData.pickupTime),
            pickupDate: validateField("pickupDate", formData.pickupDate),
            numberOfPassengers: validateField(
                "numberOfPassengers",
                formData.numberOfPassengers
            ),
            contactPersonNumber: validateField(
                "contactPersonNumber",
                formData.contactPersonNumber
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
        <div className="flex w-full max-w-7xl items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
            <div className="w-full max-w-2xl space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Create New Requisition
                    </h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Requisition Details</CardTitle>
                        <CardDescription>
                            Fill in the details to request transportation
                        </CardDescription>
                    </CardHeader>
                    <form action={formAction} onSubmit={handleSubmit}>
                        {/* Form-level error */}
                        {formState.errors?._form && (
                            <div className="mx-6 mb-4 rounded-md bg-red-50 p-3 text-red-500 dark:bg-red-900/30 dark:text-red-200">
                                {formState.errors._form.map((error, i) => (
                                    <p key={i}>{error}</p>
                                ))}
                            </div>
                        )}

                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="purpose">Purpose</Label>
                                <Input
                                    id="purpose"
                                    name="purpose"
                                    placeholder="Purpose of the trip"
                                    value={formData.purpose}
                                    onChange={handleInputChange}
                                    disabled={isPending}
                                    aria-invalid={
                                        getFieldError("purpose")
                                            ? "true"
                                            : "false"
                                    }
                                />
                                {getFieldError("purpose") && (
                                    <p className="text-sm text-red-500">
                                        {getFieldError("purpose")}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="placesToVisit">
                                    Place(s) to Visit
                                </Label>
                                <Input
                                    id="placesToVisit"
                                    name="placesToVisit"
                                    placeholder="Dhaka Airport"
                                    value={formData.placesToVisit}
                                    onChange={handleInputChange}
                                    disabled={isPending}
                                    aria-invalid={
                                        getFieldError("placesToVisit")
                                            ? "true"
                                            : "false"
                                    }
                                />
                                {getFieldError("placesToVisit") && (
                                    <p className="text-sm text-red-500">
                                        {getFieldError("placesToVisit")}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pickupLocation">
                                    Pickup Location
                                </Label>
                                <Input
                                    id="pickupLocation"
                                    name="pickupLocation"
                                    placeholder="IUT Main Gate"
                                    value={formData.pickupLocation}
                                    onChange={handleInputChange}
                                    disabled={isPending}
                                    aria-invalid={
                                        getFieldError("pickupLocation")
                                            ? "true"
                                            : "false"
                                    }
                                />
                                {getFieldError("pickupLocation") && (
                                    <p className="text-sm text-red-500">
                                        {getFieldError("pickupLocation")}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="pickupDate">
                                        Pickup Date
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={`w-full justify-start text-left font-normal ${
                                                    !date &&
                                                    "text-muted-foreground"
                                                }`}
                                                disabled={isPending}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date
                                                    ? format(date, "PPP")
                                                    : "Select date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <input
                                        type="hidden"
                                        name="pickupDate"
                                        value={formData.pickupDate}
                                    />
                                    {getFieldError("pickupDate") && (
                                        <p className="text-sm text-red-500">
                                            {getFieldError("pickupDate")}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="pickupTime">
                                        Pickup Time
                                    </Label>
                                    <Select
                                        onValueChange={(value) =>
                                            handleSelectChange(
                                                value,
                                                "pickupTime"
                                            )
                                        }
                                        disabled={isPending}
                                    >
                                        <SelectTrigger
                                            id="pickupTime"
                                            className={`w-full ${
                                                getFieldError("pickupTime")
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <SelectValue placeholder="Select time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timeOptions.map((time) => (
                                                <SelectItem
                                                    key={time.value}
                                                    value={time.value}
                                                >
                                                    {time.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <input
                                        type="hidden"
                                        name="pickupTime"
                                        value={formData.pickupTime}
                                    />
                                    {getFieldError("pickupTime") && (
                                        <p className="text-sm text-red-500">
                                            {getFieldError("pickupTime")}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="numberOfPassengers">
                                        Number of Passengers
                                    </Label>
                                    <Input
                                        id="numberOfPassengers"
                                        name="numberOfPassengers"
                                        type="number"
                                        min="1"
                                        placeholder="1"
                                        value={formData.numberOfPassengers}
                                        onChange={handleInputChange}
                                        disabled={isPending}
                                        aria-invalid={
                                            getFieldError("numberOfPassengers")
                                                ? "true"
                                                : "false"
                                        }
                                    />
                                    {getFieldError("numberOfPassengers") && (
                                        <p className="text-sm text-red-500">
                                            {getFieldError(
                                                "numberOfPassengers"
                                            )}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contactPersonNumber">
                                        Contact Person Number
                                    </Label>
                                    <Input
                                        id="contactPersonNumber"
                                        name="contactPersonNumber"
                                        placeholder="+880 1xx-xxx-xxx"
                                        value={formData.contactPersonNumber}
                                        onChange={handleInputChange}
                                        disabled={isPending}
                                        aria-invalid={
                                            getFieldError("contactPersonNumber")
                                                ? "true"
                                                : "false"
                                        }
                                    />
                                    {getFieldError("contactPersonNumber") && (
                                        <p className="text-sm text-red-500">
                                            {getFieldError(
                                                "contactPersonNumber"
                                            )}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-end mt-4 space-x-2">
                            <Button variant="outline" type="button" asChild>
                                <Link href={pathname.replace("/new", "")}>
                                    Cancel
                                </Link>
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
                                    <div className="flex items-center">
                                        Submit
                                    </div>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
            <Toaster position="bottom-right" richColors />
        </div>
    );
}
