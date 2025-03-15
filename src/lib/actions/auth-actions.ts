"use server";

import { z } from "zod";

// Define the registration form schema using Zod
const registerSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Please enter a valid email address"),
        designation: z.string().min(1, "Designation is required"),
        contactNumber: z
            .string()
            .regex(
                /^\+?[0-9\s-()]{8,}$/,
                "Please enter a valid contact number"
            ),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// Type for the form state returned to the client
export type RegisterFormState = {
    errors?: {
        name?: string[];
        email?: string[];
        designation?: string[];
        contactNumber?: string[];
        password?: string[];
        confirmPassword?: string[];
        _form?: string[];
    };
    success?: boolean;
    message?: string;
};

export async function registerUser(
    prevState: RegisterFormState,
    formData: FormData
): Promise<RegisterFormState> {
    // Validate form data
    const validatedFields = registerSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        designation: formData.get("designation"),
        contactNumber: formData.get("contactNumber"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });

    // If validation fails, return errors
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
            message: "Please correct the errors in the form.",
        };
    }

    // Destructure validated data
    const { name, email, designation, contactNumber, password } =
        validatedFields.data;

    try {
        const body = {
            name,
            email,
            password,
            designation,
            contactNumber,
        };
        const url = process.env.BACKEND_BASE_URL + "/users/register";
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            // Handle non-2xx status codes
            const data = await res.json();
            return {
                errors: data.errors,
                success: false,
                message: data.message || "Registration failed.",
            };
        }

        // Return success state
        return {
            success: true,
            message: "Registration successful! You can now log in.",
        };
    } catch (error) {
        // Generic error
        return {
            errors: {
                _form: ["Something went wrong. Please try again."],
            },
            success: false,
            message: "Registration failed.",
        };
    }
}
