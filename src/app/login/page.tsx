"use client";
import { useState } from "react";
import type React from "react";
import Link from "next/link";
import { Field, Label, Input, Button } from "@headlessui/react";
import Image from "next/image";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear errors when user starts typing
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = { email: "", password: "" };

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        setErrors(newErrors);
        return !newErrors.email && !newErrors.password;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        console.log("Sign in form submitted:", formData);
        alert("Sign in form submitted! (No database integration yet)");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-4">
            {/* Logo and Brand */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Image
                        src="/assets/images/logo.svg"
                        alt=""
                        width={178}
                        height={40}
                        priority
                    />
                </div>
            </div>
            <div className="w-full max-w-[33.125rem]">
                <div className="bg-white rounded-[var(--radius-16)] shadow-xl p-8">
                    {/* Form Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Welcome back!
                        </h1>
                        <p className="text-gray-600">
                            Log in to continue tracking your mood and sleep
                        </p>
                    </div>

                    {/* Sign In Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Field>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </Label>
                            <Input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="name@email.com"
                                className={`w-full px-4 py-3 border text-foreground rounded-[var(--radius-10)]  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </Field>

                        <Field>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </Label>
                            <Input
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                className={`w-full px-4 py-3 border text-foreground rounded-[var(--radius-10)]  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </Field>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-[var(--radius-10)] transition-colors duration-200"
                        >
                            Log In
                        </Button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Haven&apos;t got an account?{" "}
                            <Link
                                href="/signup"
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
