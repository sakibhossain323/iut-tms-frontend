"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuListTodo } from "react-icons/lu";
import { MdOutlinePendingActions } from "react-icons/md";

const links = [
    {
        name: "Overview",
        path: "/dashboard",
        icon: MdOutlinePendingActions,
    },
    {
        name: "Requisitions",
        path: "/dashboard/requisitions",
        icon: LuListTodo,
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
                            "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium" +
                                " lg:flex-none lg:justify-start lg:p-2 lg:px-3 hover:bg-sky-100 hover:text-blue-600",
                            {
                                "bg-sky-100 text-blue-600":
                                    pathname === link.path,
                            }
                        )}
                    >
                        <Icon size={20} />
                        <div className="hidden lg:block">{link.name}</div>
                    </Link>
                );
            })}
        </>
    );
}
