import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
export default function AdminDashboard() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Button>Download Report</Button>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Requisitions
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">
                            +8% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Subscriptions
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <path d="M2 10h20" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">132</div>
                        <p className="text-xs text-muted-foreground">
                            +12.5% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tickets Sold Today
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">48</div>
                        <p className="text-xs text-muted-foreground">
                            +7% from yesterday
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Vehicles
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-muted-foreground">
                            +2 since last week
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Upcoming Requisitions</CardTitle>
                        <CardDescription>
                            Recent requisitions that need approval
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Marketing Department - Company Outing
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        May 20, 2025 • 8:00 AM - 5:00 PM • 30
                                        Passengers
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    <Button variant="outline" className="mr-2">
                                        Reject
                                    </Button>
                                    <Button>Approve</Button>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Engineering Team - Client Visit
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        May 22, 2025 • 10:00 AM - 2:00 PM • 8
                                        Passengers
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    <Button variant="outline" className="mr-2">
                                        Reject
                                    </Button>
                                    <Button>Approve</Button>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Executive Meeting - Downtown Office
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        May 25, 2025 • 9:00 AM - 11:00 AM • 4
                                        Passengers
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    <Button variant="outline" className="mr-2">
                                        Reject
                                    </Button>
                                    <Button>Approve</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">
                            View All Requisitions
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Subscription Queue</CardTitle>
                        <CardDescription>
                            Pending subscription requests
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        John Smith
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Route A - Daily Commute • Morning &
                                        Evening
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    <Button size="sm">Approve</Button>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Sarah Johnson
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Route C - Downtown Express • Morning
                                        Only
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    <Button size="sm">Approve</Button>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Michael Wilson
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Route B - Campus Shuttle • Full Day
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    <Button size="sm">Approve</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">
                            View All Requests
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
