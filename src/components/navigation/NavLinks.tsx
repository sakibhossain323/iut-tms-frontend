"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const links = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: HiOutlineClipboardDocumentList,
    },
    {
        name: "Requisitions",
        path: "/requisitions",
        icon: HiOutlineClipboardDocumentList,
    },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const Icon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.path}
                        className={clsx(
                            "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium " +
                                "hover:text-primary lg:flex-none lg:justify-start lg:p-2 lg:px-3",
                            {
                                "text-primary": pathname === link.path,
                            }
                        )}
                    >
                        <Icon className="w-6" />
                        <span>{link.name}</span>
                    </Link>
                );
            })}
        </>
    );
}
