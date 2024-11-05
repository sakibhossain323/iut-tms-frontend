"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaBus } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            // username: email,
            email,
            password,
            callbackUrl: "/dashboard",
        });
        console.log(result);
        if (result?.ok) {
            router.push("/dashboard");
        } else {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center space-y-4">
                        {/* Header */}
                        <FaBus className="h-12 w-12 text-primary" />
                        <h2 className="card-title text-2xl font-bold">
                            IUT Transport Management
                        </h2>
                        <p className="text-base-content/60">
                            Login to access transport services
                        </p>

                        {/* Login Form */}
                        <form
                            onSubmit={handleLogin}
                            className="form-control w-full gap-4"
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <MdEmail className="w-5 h-5 opacity-70" />
                                    <input
                                        type="email"
                                        placeholder="your.email@iut-dhaka.edu"
                                        className="grow"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <RiLockPasswordLine className="w-5 h-5 opacity-70" />
                                    <input
                                        type="password"
                                        className="grow"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </label>
                            </div>

                            {/* Footer */}
                            <div className="card-actions flex flex-col w-full gap-4 mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                >
                                    Login
                                </button>
                                <div className="text-sm text-center text-base-content/70">
                                    Don't have an account?{" "}
                                    <a href="#" className="link link-primary">
                                        Register
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form> */}
        </div>
    );
};

export default Login;