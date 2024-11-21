import Link from "next/link";
import NavLinks from "./NavLinks";
import { HiOutlinePower } from "react-icons/hi2";
import LogoutButton from "@/components/LogoutButton";

export default function Navbar() {
    return (
        <div className="flex h-full flex-col px-3 py-4 lg:px-2">
            <Link
                className="flex items-end justify-start bg-primary rounded-md mb-2 p-4 h-20 lg:h-32"
                href="/"
            >
                <h1 className="text-2xl font-medium text-white">IUT TMS</h1>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md lg:block"></div>
                {/* <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <button
                    className="flex h-12 w-full grow items-center justify-center gap-2 
                    rounded-md p-3 text-sm font-medium lg:justify-start lg:p-2 lg:px-3
                    hover:bg-primary hover:text-white"
                >
                    <HiOutlinePower size={20} />
                    <div>Log Out</div>
                </button>
            </form> */}
                <form>
                    <LogoutButton
                        className="flex h-12 w-full grow items-center justify-center gap-2 
                rounded-md p-3 text-sm font-medium lg:justify-start lg:p-2 lg:px-3 hover:bg-primary
                hover:text-white"
                    >
                        <HiOutlinePower size={20} />
                        <div>Log Out</div>
                    </LogoutButton>
                </form>
            </div>
        </div>
    );
}
