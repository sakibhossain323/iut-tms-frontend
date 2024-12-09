import { z } from "zod";

export const RequisitionFormSchema = z.object({
    purpose: z.string().min(1, { message: "Purpose is required" }),
    dateRequired: z.string().min(1, { message: "Starting date is required" }),
    timeRequired: z.string().min(1, { message: "Starting time is required" }),
    returnDate: z.string().min(1, { message: "Return date is required" }),
    returnTime: z.string().min(1, { message: "Return time is required" }),
    destination: z.string().min(1, { message: "Destination is required" }),
    numberOfPassengers: z.coerce
        .number()
        .min(1, { message: "At least one passenger is required" }),
    contactNumber: z.string().min(3, { message: "Invalid contact number" }),
});
