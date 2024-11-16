"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineCalendar, AiOutlinePhone } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { buffer } from "stream/consumers";

const RequisitionForm = () => {
    const [formData, setFormData] = useState({
        userId: 0,
        dateRequired: "",
        timeRequired: "",
        returnDate: "",
        returnTime: "",
        destination: "",
        purpose: "",
        numberOfPassengers: "",
        contactNumber: "",
    });
    const router = useRouter();
    const { status, data: session } = useSession();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const dateRequired = `${formData.dateRequired}T${formData.timeRequired}:00Z`;
        const returnDate = `${formData.returnDate}T${formData.returnTime}:00Z`;
        const token = session?.accessToken as string;
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("Payload:", payload);
        const reqBody = {
            userId: payload.userId,
            purpose: formData.purpose,
            destination: formData.destination,
            dateRequired,
            returnDate,
            numberOfPassengers: formData.numberOfPassengers,
            contactNumber: formData.contactNumber,
        };

        const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/requisitions";
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(reqBody),
        });

        if (res.ok) {
            router.push("/dashboard");
        } else {
            console.log(res);
            alert("Failed to submit requisition");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="card w-full max-w-2xl shadow-lg bg-white">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        Vehicle Requisition Request
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        Submit your transport requisition for approval
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">Purpose of Travel</label>
                            <input
                                id="purpose"
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Describe the purpose of your travel"
                                value={formData.purpose}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">Starting Date</label>
                                <input
                                    id="dateRequired"
                                    type="date"
                                    className="input input-bordered w-full"
                                    value={formData.dateRequired}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">Starting Time</label>
                                <input
                                    id="timeRequired"
                                    type="time"
                                    className="input input-bordered w-full"
                                    value={formData.timeRequired}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">Return Date</label>
                                <input
                                    id="returnDate"
                                    type="date"
                                    className="input input-bordered w-full"
                                    value={formData.returnDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">Return Time</label>
                                <input
                                    id="returnTime"
                                    type="time"
                                    className="input input-bordered w-full"
                                    value={formData.returnTime}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">Destination</label>
                            <input
                                id="destination"
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Enter the destination"
                                value={formData.destination}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                Number of Passengers
                            </label>
                            <div className="relative">
                                <BsFillPeopleFill className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    id="numberOfPassengers"
                                    type="number"
                                    className="input input-bordered w-full pl-10"
                                    placeholder="Total passengers"
                                    value={formData.numberOfPassengers}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                Contact Number (Person in Charge)
                            </label>
                            <div className="relative">
                                <AiOutlinePhone className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    id="contactNumber"
                                    type="tel"
                                    className="input input-bordered w-full pl-10"
                                    placeholder="Contact number"
                                    value={formData.contactNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <button className="btn btn-primary w-full mt-4">
                            Submit Requisition
                        </button>
                    </form>

                    <div className="text-sm text-center text-gray-500 mt-4">
                        Your request will be processed through the approval
                        system.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequisitionForm;
