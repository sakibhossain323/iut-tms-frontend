"use client";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
    const handleSignOut = async () => {
        await signOut();
    };
    return <button onClick={handleSignOut}>Log Out</button>;
};

export default LogoutButton;
