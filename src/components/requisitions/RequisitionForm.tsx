"use client";
import { useActionState } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { createRequisition } from "@/libs/actions";

export default function RequisitionForm() {
    const [state, formAction] = useActionState(createRequisition, null);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="card-body">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Vehicle Requisition Request
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Submit your transport requisition for approval
                </p>

                <form action={formAction} className="space-y-4">
                    <div className="form-control">
                        <label className="label">Purpose of Travel</label>
                        <input
                            id="purpose"
                            name="purpose"
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Describe the purpose of your travel"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">Starting Date</label>
                            <input
                                id="dateRequired"
                                name="dateRequired"
                                type="date"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Starting Time</label>
                            <input
                                id="timeRequired"
                                name="timeRequired"
                                type="time"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">Return Date</label>
                            <input
                                id="returnDate"
                                name="returnDate"
                                type="date"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Return Time</label>
                            <input
                                id="returnTime"
                                name="returnTime"
                                type="time"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">Destination</label>
                        <input
                            id="destination"
                            name="destination"
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Enter the destination"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">Number of Passengers</label>
                        <div className="relative">
                            <BsFillPeopleFill className="absolute left-3 top-3 text-gray-500" />
                            <input
                                id="numberOfPassengers"
                                name="numberOfPassengers"
                                type="number"
                                className="input input-bordered w-full pl-10"
                                placeholder="Total passengers"
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
                                name="contactNumber"
                                type="tel"
                                className="input input-bordered w-full pl-10"
                                placeholder="Contact number"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-4"
                    >
                        Submit Requisition
                    </button>
                </form>

                <div className="text-sm text-center text-gray-500 mt-4">
                    Your request will be processed through the approval system.
                </div>
            </div>
        </div>
    );
}
