"use client";
import { useState } from "react";
import type React from "react";
import Link from "next/link";
import { Button, Field, Label, Input } from "@headlessui/react";
import Image from "next/image";

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "password" || name === "confirmPassword") {
            setErrors((prev) => ({
                ...prev,
                password: "",
                confirmPassword: "",
            }));
        }
    };

    const validatePasswords = () => {
        const newErrors = { password: "", confirmPassword: "" };

        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return !newErrors.password && !newErrors.confirmPassword;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePasswords()) {
            return;
        }

        console.log("Sign up form submitted:", formData);
        alert("Sign up form submitted! (No database integration yet)");
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
                        <h1 className="text-preset-3 text-foreground text-left mb-2">
                            Create an account
                        </h1>
                        <p className="text-preset-6-regular text-accent-foreground text-left">
                            Join to track your daily mood and sleep with ease.
                        </p>
                    </div>

                    {/* Sign Up Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Field>
                                <Label
                                    htmlFor="name"
                                    className="block text-preset-6-regular text-foreground mb-2"
                                >
                                    Full name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 border text-foreground border-gray-300 rounded-[var(--radius-10)] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </Field>
                        </div>

                        <div>
                            <Field>
                                <Label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="name@email.com"
                                    className="w-full px-4 py-3 border border-gray-300 text-foreground rounded-[var(--radius-10)] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </Field>
                        </div>

                        <div>
                            <Field>
                                <Label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    className={`w-full px-4 py-3 border text-foreground rounded-[var(--radius-10)] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.password
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                            </Field>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <Field>
                                <Label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm your password"
                                    className={`w-full px-4 py-3 border text-foreground rounded-[var(--radius-10)] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.confirmPassword
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                            </Field>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-[var(--radius-10)] transition-colors duration-200"
                        >
                            Sign Up
                        </Button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Already got an account?{" "}
                            <Link
                                href="/login"
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Log in.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
