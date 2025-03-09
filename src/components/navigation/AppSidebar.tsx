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

export function AppSidebar({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const routes = [
        {
            title: "Dashboard",
            icon: HomeIcon,
            href: "/",
            variant: "default" as const,
        },
        {
            title: "Requisitions",
            icon: FileTextIcon,
            href: "/requisitions",
            variant: "default" as const,
        },
        {
            title: "Subscriptions",
            icon: UsersIcon,
            href: "/subscriptions",
            variant: "default" as const,
        },
        {
            title: "One-Time Ticketing",
            icon: TicketIcon,
            href: "/ticketing",
            variant: "default" as const,
        },
        {
            title: "Vehicles",
            icon: CarIcon,
            href: "/vehicles",
            variant: "default" as const,
        },
        {
            title: "Trips",
            icon: CalendarIcon,
            href: "/trips",
            variant: "default" as const,
        },
    ];

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <Sidebar collapsible="icon">
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
                    <SidebarContent>
                        <SidebarMenu>
                            {routes.map((route) => (
                                <SidebarMenuItem key={route.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === route.href}
                                        tooltip={route.title}
                                    >
                                        <a href={route.href}>
                                            <route.icon className="h-5 w-5" />
                                            <span>{route.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter>
                        <div className="flex items-center justify-between p-4">
                            <Avatar>
                                <AvatarImage
                                    src="/placeholder-user.jpg"
                                    alt="Admin"
                                />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            <div className="ml-2 space-y-1 hidden group-data-[state=expanded]:block">
                                <p className="text-sm font-medium leading-none">
                                    admin user
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    admin-user@testing.com
                                </p>
                            </div>
                        </div>
                    </SidebarFooter>
                </Sidebar>
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
