"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";

export default function PaginationBar({ total }: { total: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page") || "1");
    const totalPages = Math.ceil(total / 10);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const createPageUrl = (page: number) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={createPageUrl(currentPage - 1)} />
                </PaginationItem>
                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href={createPageUrl(page)}
                            isActive={page === currentPage}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext href={createPageUrl(currentPage + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
