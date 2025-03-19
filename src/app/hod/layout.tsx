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
            href: "/hod",
            variant: "default" as const,
        },
        {
            title: "Requisitions",
            icon: "fileText",
            href: "/hod/requisitions",
            variant: "default" as const,
        },
        // {
        //     title: "Trips",
        //     icon: "calendar",
        //     href: "/hod/trips",
        //     variant: "default" as const,
        // },
        // {
        //     title: "Subscriptions",
        //     icon: "users",
        //     href: "/hod/subscriptions",
        //     variant: "default" as const,
        // },
        // {
        //     title: "One-Time Tickets",
        //     icon: "ticket",
        //     href: "/hod/tickets",
        //     variant: "default" as const,
        // },
    ];
    return (
        <>
            <AppSidebar routes={routes}>{children}</AppSidebar>
        </>
    );
}
