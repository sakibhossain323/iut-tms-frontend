import { AppSidebar } from "@/components/navigation/AppSidebar";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AppSidebar>{children}</AppSidebar>
        </>
    );
}
