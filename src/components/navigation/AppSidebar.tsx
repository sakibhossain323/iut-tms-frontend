"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import {
    ActivityIcon,
    CalendarIcon,
    CarIcon,
    FileTextIcon,
    HomeIcon,
    TicketIcon,
    UserIcon,
    UsersIcon,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function AppSidebar({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const routes = [
        {
            title: "Dashboard",
            icon: HomeIcon,
            href: "/admin",
            variant: "default" as const,
        },
        {
            title: "Trips",
            icon: CalendarIcon,
            href: "/admin/trips",
            variant: "default" as const,
        },
        {
            title: "Requisitions",
            icon: FileTextIcon,
            href: "/admin/requisitions",
            variant: "default" as const,
        },
        {
            title: "Subscriptions",
            icon: UsersIcon,
            href: "/admin/subscriptions",
            variant: "default" as const,
        },
        {
            title: "One-Time Tickets",
            icon: TicketIcon,
            href: "/admin/tickets",
            variant: "default" as const,
        },
        {
            title: "Vehicles",
            icon: CarIcon,
            href: "/admin/vehicles",
            variant: "default" as const,
        },
        {
            title: "Drivers",
            icon: UserIcon,
            href: "/admin/drivers",
            variant: "default" as const,
        },
    ];

    const { data } = useSession();

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <Sidebar collapsible="icon">
                    {/* Sidebar header */}
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg">
                                    <span>
                                        <ActivityIcon size={24} />
                                    </span>
                                    <span className="font-bold text-xl">
                                        IUT TMS
                                    </span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>

                    {/* Sidebar navigation routes */}
                    <SidebarContent>
                        <SidebarMenu>
                            {routes.map((route) => (
                                <SidebarMenuItem key={route.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === route.href}
                                        tooltip={route.title}
                                    >
                                        <Link href={route.href}>
                                            <route.icon className="h-5 w-5" />
                                            <span>{route.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>

                    {/* Sidebar footer */}
                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="py-6">
                                    <div className="flex items-center">
                                        <Avatar>
                                            <AvatarImage src="/placeholder-user.jpg" />
                                            <AvatarFallback className="border-2">
                                                {(data?.user?.name ||
                                                    "u")[0].toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="ml-2 space-y-1 hidden group-data-[state=expanded]:block">
                                            <p className="text-sm font-medium leading-none">
                                                {data?.user?.name}
                                            </p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {data?.user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                {/* Main content */}
                <SidebarInset className="flex flex-col">
                    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="h-6" />
                        <div className="flex-1">
                            <h1 className="text-xl font-semibold">
                                Transport Management System
                            </h1>
                        </div>
                    </header>
                    <main className="flex-1">{children}</main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
