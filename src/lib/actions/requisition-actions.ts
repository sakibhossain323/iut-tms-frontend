"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Requisition } from "@/lib/definitions";
import { z } from "zod";

// Define the requisition form schema using Zod
const requisitionSchema = z.object({
    purpose: z.string().min(1, "Purpose is required"),
    pickupLocation: z.string().min(1, "Pickup location is required"),
    placesToVisit: z.string().min(1, "Places to visit is required"),
    pickupTime: z.string().min(1, "Pickup time is required"),
    pickupDate: z.string().min(1, "Pickup date is required"),
    numberOfPassengers: z
        .string()
        .min(1, "Number of passengers is required")
        .refine((val) => !isNaN(Number(val)), "Must be a valid number")
        .refine((val) => Number(val) > 0, "Must be greater than 0")
        .refine((val) => Number(val) < 100, "Must be less than  100"),
    contactPersonNumber: z
        .string()
        .regex(/^\+?[0-9\s-()]{8,}$/, "Please enter a valid contact number"),
});

// Type for the form state returned to the client
export type RequisitionFormState = {
    errors?: {
        purpose?: string[];
        pickupLocation?: string[];
        placesToVisit?: string[];
        pickupTime?: string[];
        pickupDate?: string[];
        numberOfPassengers?: string[];
        contactPersonNumber?: string[];
        _form?: string[];
    };
    success?: boolean;
    message?: string;
};

export async function createRequisition(
    prevState: RequisitionFormState,
    formData: FormData
): Promise<RequisitionFormState> {
    // Validate form data
    const validatedFields = requisitionSchema.safeParse({
        purpose: formData.get("purpose"),
        pickupLocation: formData.get("pickupLocation"),
        placesToVisit: formData.get("placesToVisit"),
        pickupTime: formData.get("pickupTime"),
        pickupDate: formData.get("pickupDate"),
        numberOfPassengers: formData.get("numberOfPassengers"),
        contactPersonNumber: formData.get("contactPersonNumber"),
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
    const {
        purpose,
        pickupLocation,
        placesToVisit,
        pickupTime,
        pickupDate,
        numberOfPassengers,
        contactPersonNumber,
    } = validatedFields.data;

    try {
        const body = {
            purpose,
            placesToVisit,
            placeToPickup: pickupLocation,
            dateTimeRequired: `${pickupDate}T${pickupTime}:00Z`,
            numberOfPassengers,
            contactPersonNumber,
        };

        const session = await getServerSession(authOptions);
        const url = process.env.BACKEND_BASE_URL + "/requisitions";
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            // Handle non-2xx status codes
            const data = await res.json();
            return {
                errors: data.errors,
                success: false,
                message: data.message || "Requisition creation failed.",
            };
        }

        // Return success state
        return {
            success: true,
            message: "Requisition created successfully!",
        };
    } catch (error) {
        // Generic error
        return {
            errors: {
                _form: ["Something went wrong. Please try again."],
            },
            success: false,
            message: "Requisition creation failed.",
        };
    }
}

export type RequisitionsParams = {
    searchQuery?: string;
    statusFilter?: string;
    page?: number;
    itemsPerPage?: number;
};

export type PaginatedRequisitions = {
    data: Requisition[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
};
/**
 * Server action to fetch requisitions with filtering and pagination
 */
export async function fetchRequisitionsAction({
    searchQuery = "",
    statusFilter = "all",
    page = 1,
    itemsPerPage = 5,
}: RequisitionsParams): Promise<PaginatedRequisitions> {
    const session = await getServerSession(authOptions);
    const url = process.env.BACKEND_BASE_URL + "/requisitions/all";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch requisitions");
    }
    const requisitions: Requisition[] = await response.json();
    console.log(requisitions);

    const filteredRequisitions = requisitions.filter((req) => {
        // Filter by status
        if (statusFilter !== "all" && req.status !== statusFilter) {
            return false;
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                req.user.email.toLowerCase().includes(query) ||
                req.department.toLowerCase().includes(query) ||
                req.purpose.toLowerCase().includes(query) ||
                req.id.toLowerCase().includes(query)
            );
        }

        return true;
    });

    // Calculate pagination
    const totalItems = filteredRequisitions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedRequisitions = filteredRequisitions.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return {
        data: paginatedRequisitions,
        totalItems,
        totalPages,
        currentPage: page,
    };
}
