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
            href: "/admin",
            variant: "default" as const,
        },
        {
            title: "Requisitions",
            icon: "fileText",
            href: "/admin/requisitions",
            variant: "default" as const,
        },
        // {
        //     title: "Trips",
        //     icon: "calendar",
        //     href: "/admin/trips",
        //     variant: "default" as const,
        // },
        // {
        //     title: "Subscriptions",
        //     icon: "users",
        //     href: "/admin/subscriptions",
        //     variant: "default" as const,
        // },
        // {
        //     title: "One-Time Tickets",
        //     icon: "ticket",
        //     href: "/admin/tickets",
        //     variant: "default" as const,
        // },
        {
            title: "Vehicles",
            icon: "car",
            href: "/admin/vehicles",
            variant: "default" as const,
        },
        {
            title: "Drivers",
            icon: "contact",
            href: "/admin/drivers",
            variant: "default" as const,
        },
        {
            title: "System Users",
            icon: "userCog",
            href: "/admin/users",
            variant: "default" as const,
        },
    ];
    return (
        <>
            <AppSidebar routes={routes}>{children}</AppSidebar>
        </>
    );
}
