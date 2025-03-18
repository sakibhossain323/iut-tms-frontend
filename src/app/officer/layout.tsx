import { AppSidebar } from "@/components/navigation/AppSidebar";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const routes = [
        {
            title: "Dashboard",
            icon: "home",
            href: "/officer",
            variant: "default" as const,
        },
        {
            title: "Requisitions",
            icon: "fileText",
            href: "/officer/requisitions",
            variant: "default" as const,
        },
        // {
        //     title: "Trips",
        //     icon: "calendar",
        //     href: "/officer/trips",
        //     variant: "default" as const,
        // },
        // {
        //     title: "Subscriptions",
        //     icon: "users",
        //     href: "/officer/subscriptions",
        //     variant: "default" as const,
        // },
        // {
        //     title: "One-Time Tickets",
        //     icon: "ticket",
        //     href: "/officer/tickets",
        //     variant: "default" as const,
        // },
        {
            title: "Vehicles",
            icon: "car",
            href: "/officer/vehicles",
            variant: "default" as const,
        },
        {
            title: "Drivers",
            icon: "contact",
            href: "/officer/drivers",
            variant: "default" as const,
        },
        {
            title: "System Users",
            icon: "userCog",
            href: "/officer/users",
            variant: "default" as const,
        },
    ];
    return (
        <>
            <AppSidebar routes={routes}>{children}</AppSidebar>
        </>
    );
}
