"use client";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";

const LogoutButton = ({
    children,
    className,
}: {
    children: ReactNode;
    className: string;
}) => {
    const handleSignOut = async () => {
        await signOut();
    };
    return (
        <button onClick={handleSignOut} className={className}>
            {children}
        </button>
    );
};

export default LogoutButton;
