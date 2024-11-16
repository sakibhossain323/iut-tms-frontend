"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const router = useRouter();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const body = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: "FACULTY",
        };
        const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/auth/register";
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (res.ok) {
            alert("Registration successful. Please login to continue.");
            router.push("/auth/login");
        } else {
            alert("Registration failed. Please try again");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="card w-full max-w-lg shadow-lg bg-white">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        Create an Account
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        Register to access IUT Transport Management System
                    </p>

                    <form onSubmit={handleOnSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label" htmlFor="username">
                                Username
                            </label>
                            <div className="relative">
                                <AiOutlineUser className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    className="input input-bordered w-full pl-10"
                                    value={formData.username}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="email">
                                IUT Email
                            </label>
                            <div className="relative">
                                <AiOutlineMail className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="example@iut-dhaka.edu"
                                    className="input input-bordered w-full pl-10"
                                    value={formData.email}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <AiOutlineLock className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full pl-10"
                                    value={formData.password}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <AiOutlineLock className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="input input-bordered w-full pl-10"
                                    value={formData.confirmPassword}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>

                        <button className="btn btn-primary w-full mt-4">
                            Register
                        </button>
                    </form>

                    <div className="text-sm text-center text-gray-500 mt-4">
                        Already have an account?{" "}
                        <Link href="/auth/login">
                            <span className="text-primary cursor-pointer">
                                Login
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
