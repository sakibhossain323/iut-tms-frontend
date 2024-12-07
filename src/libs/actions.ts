"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
export async function createRequisition(prevState: any, formData: FormData) {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken as string;
    const payload = JSON.parse(atob(token.split(".")[1]));

    const dateRequired = `${formData.get("dateRequired")}T${formData.get(
        "timeRequired"
    )}:00Z`;
    const returnDate = `${formData.get("returnDate")}T${formData.get(
        "returnTime"
    )}:00Z`;

    const reqBody = {
        userId: payload.userId,
        purpose: formData.get("purpose"),
        destination: formData.get("destination"),
        dateRequired,
        returnDate,
        numberOfPassengers: formData.get("numberOfPassengers"),
        contactNumber: formData.get("contactNumber"),
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
        return { message: "Failed to submit requisition" };
    }

    revalidatePath("/dashboard/requisitions");
    redirect("/dashboard/requisitions");
}
