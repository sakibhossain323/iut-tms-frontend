import { AppSidebar } from "@/components/navigation/AppSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const routes = [
        {
            title: "Dashboard",
            icon: "home",
            href: "/dashboard",
            variant: "default" as const,
        },
        {
            title: "Trips",
            icon: "calendar",
            href: "/dashboard/trips",
            variant: "default" as const,
        },
        {
            title: "Requisitions",
            icon: "fileText",
            href: "/dashboard/requisitions",
            variant: "default" as const,
        },
        {
            title: "Subscriptions",
            icon: "users",
            href: "/dashboard/subscriptions",
            variant: "default" as const,
        },
        {
            title: "One-Time Tickets",
            icon: "ticket",
            href: "/dashboard/tickets",
            variant: "default" as const,
        },
    ];
    return (
        <>
            <AppSidebar routes={routes}>{children}</AppSidebar>
        </>
    );
}
