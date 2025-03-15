"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
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
    registerUser,
    type RegisterFormState,
} from "@/lib/actions/auth-actions";

// Initial form state
const initialState: RegisterFormState = {
    errors: {},
    success: false,
    message: "",
};

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formState, formAction, isPending] = useActionState(
        registerUser,
        initialState
    );
    // Remove this line:
    // const [isSubmitting, setIsSubmitting] = useState(false)

    // Client-side validation for immediate feedback
    const [clientErrors, setClientErrors] = useState({
        name: "",
        email: "",
        designation: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
    });

    // Form data for client-side validation
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        designation: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
    });

    // Handle form state changes (from server action)
    useEffect(() => {
        if (formState.success) {
            toast.success("Registration successful", {
                description:
                    "Your account has been created. You can now log in.",
            });

            // Redirect to login page after successful registration
            setTimeout(() => {
                router.push("/auth/login");
            }, 1500);
        } else if (formState.message && !formState.success) {
            toast.error("Registration failed", {
                description: formState.message,
            });
        }
    }, [formState, router]);

    // Client-side validation
    const validateField = (name: string, value: string) => {
        let error = "";

        switch (name) {
            case "name":
                if (!value.trim()) {
                    error = "Name is required";
                }
                break;
            case "email":
                if (!value) {
                    error = "Email is required";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = "Email is invalid";
                }
                break;
            case "designation":
                if (!value.trim()) {
                    error = "Designation is required";
                }
                break;
            case "contactNumber":
                if (!value) {
                    error = "Contact number is required";
                } else if (!/^\+?[0-9\s-()]{8,}$/.test(value)) {
                    error = "Contact number is invalid";
                }
                break;
            case "password":
                if (!value) {
                    error = "Password is required";
                } else if (value.length < 6) {
                    error = "Password must be at least 6 characters";
                }
                break;
            case "confirmPassword":
                if (!value) {
                    error = "Please confirm your password";
                } else if (value !== formData.password) {
                    error = "Passwords do not match";
                }
                break;
        }

        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        // If confirming password, also validate confirmPassword
        if (name === "password") {
            const confirmError = formData.confirmPassword
                ? value !== formData.confirmPassword
                    ? "Passwords do not match"
                    : ""
                : "";
            setClientErrors((prev) => ({
                ...prev,
                confirmPassword: confirmError,
            }));
        }
    };

    // Client-side validation before form submission
    const validateForm = () => {
        const newErrors = {
            name: validateField("name", formData.name),
            email: validateField("email", formData.email),
            designation: validateField("designation", formData.designation),
            contactNumber: validateField(
                "contactNumber",
                formData.contactNumber
            ),
            password: validateField("password", formData.password),
            confirmPassword: validateField(
                "confirmPassword",
                formData.confirmPassword
            ),
        };

        setClientErrors(newErrors);

        // Check if there are any errors
        return !Object.values(newErrors).some((error) => error !== "");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // We still need this to prevent form submission if client-side validation fails
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
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight">
                        IUT Transport Management System
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Create a new account
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            Fill in your details to create an account
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
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={isPending}
                                    aria-invalid={
                                        getFieldError("name") ? "true" : "false"
                                    }
                                />
                                {getFieldError("name") && (
                                    <p className="text-sm text-red-500">
                                        {getFieldError("name")}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isPending}
                                    aria-invalid={
                                        getFieldError("email")
                                            ? "true"
                                            : "false"
                                    }
                                />
                                {getFieldError("email") && (
                                    <p className="text-sm text-red-500">
                                        {getFieldError("email")}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="designation">
                                        Designation
                                    </Label>
                                    <Input
                                        id="designation"
                                        name="designation"
                                        placeholder="Lecturer"
                                        value={formData.designation}
                                        onChange={handleChange}
                                        disabled={isPending}
                                        aria-invalid={
                                            getFieldError("designation")
                                                ? "true"
                                                : "false"
                                        }
                                    />
                                    {getFieldError("designation") && (
                                        <p className="text-sm text-red-500">
                                            {getFieldError("designation")}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contactNumber">
                                        Contact Number
                                    </Label>
                                    <Input
                                        id="contactNumber"
                                        name="contactNumber"
                                        placeholder="+880 1xx-xxx-xxx"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        disabled={isPending}
                                        aria-invalid={
                                            getFieldError("contactNumber")
                                                ? "true"
                                                : "false"
                                        }
                                    />
                                    {getFieldError("contactNumber") && (
                                        <p className="text-sm text-red-500">
                                            {getFieldError("contactNumber")}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={isPending}
                                        aria-invalid={
                                            getFieldError("password")
                                                ? "true"
                                                : "false"
                                        }
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                        <span className="sr-only">
                                            {showPassword
                                                ? "Hide password"
                                                : "Show password"}
                                        </span>
                                    </Button>
                                </div>
                                {getFieldError("password") && (
                                    <p className="text-sm text-red-500">
                                        {getFieldError("password")}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        disabled={isPending}
                                        aria-invalid={
                                            getFieldError("confirmPassword")
                                                ? "true"
                                                : "false"
                                        }
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                        <span className="sr-only">
                                            {showConfirmPassword
                                                ? "Hide password"
                                                : "Show password"}
                                        </span>
                                    </Button>
                                </div>
                                {getFieldError("confirmPassword") && (
                                    <p className="text-sm text-red-500">
                                        {getFieldError("confirmPassword")}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                            >
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
                                        Creating account...
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Create Account
                                    </div>
                                )}
                            </Button>
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    href="/auth/login"
                                    className="font-medium text-primary hover:text-primary/90"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
            <Toaster position="bottom-right" richColors />
        </div>
    );
}
