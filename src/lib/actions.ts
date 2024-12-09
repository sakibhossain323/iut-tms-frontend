"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { RequisitionFormSchema } from "@/lib/validations";
import { State } from "@/lib/definitions";

export async function createRequisition(prevState: State, formData: FormData) {
    const validation = RequisitionFormSchema.safeParse({
        purpose: formData.get("purpose"),
        dateRequired: formData.get("dateRequired"),
        timeRequired: formData.get("timeRequired"),
        returnDate: formData.get("returnDate"),
        returnTime: formData.get("returnTime"),
        destination: formData.get("destination"),
        numberOfPassengers: formData.get("numberOfPassengers"),
        contactNumber: formData.get("contactNumber"),
    });

    if (!validation.success) {
        console.error(validation.error.flatten().fieldErrors);
        return {
            errors: validation.error.flatten().fieldErrors,
            message: "Invalid form data",
        };
    }
    const {
        purpose,
        dateRequired,
        timeRequired,
        returnDate,
        returnTime,
        destination,
        numberOfPassengers,
        contactNumber,
    } = validation.data;

    const session = await getServerSession(authOptions);
    const token = session?.accessToken as string;
    const payload = JSON.parse(atob(token.split(".")[1]));

    const reqBody = {
        userId: payload.userId,
        purpose: purpose,
        destination: destination,
        dateRequired: `${dateRequired}T${timeRequired}:00Z`,
        returnDate: `${returnDate}T${returnTime}:00Z`,
        numberOfPassengers: numberOfPassengers,
        contactNumber: contactNumber,
    };

    const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/requisitions";
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reqBody),
    });

    if (!res.ok) {
        console.error(reqBody);
        return { message: "Failed to submit requisition" };
    }

    revalidatePath("/dashboard/requisitions");
    redirect("/dashboard/requisitions");
}
