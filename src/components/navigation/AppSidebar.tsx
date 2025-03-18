"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import {
    ActivityIcon,
    CalendarIcon,
    CarIcon,
    ContactIcon,
    FileTextIcon,
    HelpCircle,
    HomeIcon,
    LogOut,
    Settings,
    TicketIcon,
    UserCogIcon,
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
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const iconMap: Record<string, React.ElementType> = {
    activity: ActivityIcon,
    calendar: CalendarIcon,
    car: CarIcon,
    contact: ContactIcon,
    fileText: FileTextIcon,
    helpCircle: HelpCircle,
    home: HomeIcon,
    logOut: LogOut,
    settings: Settings,
    ticket: TicketIcon,
    userCog: UserCogIcon,
    user: UserIcon,
    users: UsersIcon,
};

export function AppSidebar({
    children,
    routes,
}: {
    children: React.ReactNode;
    routes: Array<{
        title: string;
        icon: string;
        href: string;
        variant: string;
    }>;
}) {
    const pathname = usePathname();

    const { data: session } = useSession();

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
                            {routes.map((route) => {
                                const IconComponent = iconMap[route.icon];
                                return (
                                    <SidebarMenuItem key={route.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={pathname === route.href}
                                            tooltip={route.title}
                                        >
                                            <Link href={route.href}>
                                                <IconComponent className="h-5 w-5" />
                                                <span>{route.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarContent>

                    {/* Sidebar footer */}
                    <SidebarFooter>
                        <DropdownMenu>
                            {/* user info */}
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-sidebar-accent rounded-md transition-colors">
                                    <div className="flex items-center">
                                        <Avatar>
                                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                            <AvatarFallback className="border">
                                                {session?.user?.name![0].toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="ml-2 space-y-1 hidden group-data-[state=expanded]:block">
                                            <p className="text-sm font-medium leading-none">
                                                {session?.user?.name}
                                            </p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {session?.user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem>
                                    <ContactIcon className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <HelpCircle className="mr-2 h-4 w-4" />
                                    <span>Help & Support</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                    <SidebarMenuButton
                                        onClick={async () => await signOut()}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </SidebarMenuButton>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
