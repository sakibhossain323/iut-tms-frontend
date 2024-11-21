import Navbar from "@/components/navigation/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen flex-col lg:flex-row lg:overflow-hidden">
            <div className="w-full lg:w-72 flex-none">
                <Navbar />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto lg:p-12">
                {children}
            </div>
        </div>
    );
}
