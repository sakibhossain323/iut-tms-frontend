"use client";

import { useActionState, useEffect, useRef } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { createRequisition } from "@/lib/actions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RequisitionFormSchema } from "@/lib/validations";
import { State } from "@/lib/definitions";

export default function RequisitionForm() {
    const initialState: State = { message: "" };
    const [state, formAction] = useActionState(createRequisition, initialState);

    const form = useForm<z.infer<typeof RequisitionFormSchema>>({
        resolver: zodResolver(RequisitionFormSchema),
        mode: "onBlur",
        defaultValues: {
            purpose: "",
            dateRequired: "",
            timeRequired: "",
            returnDate: "",
            returnTime: "",
            destination: "",
            numberOfPassengers: 1,
            contactNumber: "",
        },
    });

    const { isValid } = form.formState;

    useEffect(() => {
        state?.errors &&
            Object.entries(state.errors).forEach(([key, value]) => {
                form.setError(key as any, { message: value[0] });
            });
    }, [state?.errors]);

    return (
        <Form {...form}>
            <form className="space-y-6" action={formAction}>
                <div className="rounded-md p-4 lg:p-6 space-y-4">
                    {/* Purpose */}
                    <FormField
                        control={form.control}
                        name="purpose"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Purpose</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter purpose of your travel"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Starting Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="dateRequired"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Starting Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="timeRequired"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Starting Time</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Return Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="returnDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Return Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="returnTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Return Time</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Destination */}
                    <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destination</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter destination"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Number of Passengers */}
                    <FormField
                        control={form.control}
                        name="numberOfPassengers"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number of Passengers</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            placeholder="Total passengers"
                                            {...field}
                                            className="pl-10"
                                        />
                                        <BsFillPeopleFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Contact Number */}
                    <FormField
                        control={form.control}
                        name="contactNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Contact Number (Person in Charge)
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type="tel"
                                            placeholder="Contact number"
                                            {...field}
                                            className="pl-10"
                                        />
                                        <AiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-start gap-4">
                    <Link
                        href="/dashboard/requisitions"
                        className="flex h-10 items-center rounded-lg px-4 text-sm font-medium bg-gray-200 text-gray-600 hover:bg-gray-300"
                    >
                        Cancel
                    </Link>
                    <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-indigo-600"
                        disabled={!isValid}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}
