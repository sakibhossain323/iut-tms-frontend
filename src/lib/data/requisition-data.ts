import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getRequisitionData(id: string) {
    const session = await getServerSession(authOptions);
    const url = process.env.BACKEND_BASE_URL + "/requisitions/" + id;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch requisition");
    }
    return await response.json();
}
