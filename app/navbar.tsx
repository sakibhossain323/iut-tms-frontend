import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiUserCircleThin } from "react-icons/pi";
import LogoutButton from "./auth/logoutComponent";

const Navbar = () => {
    return (
        <header className="container mx-auto w-4/5">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <ul className="menu menu-horizontal text-xl font-medium">
                        <li>
                            <Link href="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end mx-2">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle"
                        >
                            <div className="indicator">
                                <IoIosNotificationsOutline size={30} />
                                <span className="badge badge-sm indicator-item bg-info my-5">
                                    8
                                </span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-96 shadow"
                        >
                            <div className="card-body">
                                <span className="text-lg font-bold">
                                    Notifcations
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="dropdown dropdown-end mx-2">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <PiUserCircleThin size={40} />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link href="#">Profile</Link>
                            </li>
                            <li>
                                <LogoutButton />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
