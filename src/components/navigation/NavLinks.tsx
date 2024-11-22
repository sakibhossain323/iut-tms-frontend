"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiBookAdd } from "react-icons/bi";
import { LuListTodo } from "react-icons/lu";

const links = [
    {
        name: "Overview",
        path: "/dashboard",
        icon: LuListTodo,
    },
    {
        name: "Requisitions",
        path: "/requisitions",
        icon: BiBookAdd,
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
                            "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-lg font-medium " +
                                "hover:bg-sky-100 hover:text-blue-600 lg:flex-none lg:justify-start lg:p-2 lg:px-3",
                            {
                                "bg-sky-100 text-blue-600":
                                    pathname === link.path,
                            }
                        )}
                    >
                        <Icon size={24} />
                        <span>{link.name}</span>
                    </Link>
                );
            })}
        </>
    );
}
