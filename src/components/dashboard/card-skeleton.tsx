import { Card, CardContent, CardHeader } from "../ui/card";

export function CardSkeleton() {
    return (
        <Card className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
                <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </CardContent>
        </Card>
    );
}
