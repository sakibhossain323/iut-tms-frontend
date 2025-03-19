import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getUserData(id: string) {
    const session = await getServerSession(authOptions);
    const url = process.env.BACKEND_BASE_URL + `/users/${id}/profile`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user profile");
    }
    return await response.json();
}
