import type React from "react";
import Link from "next/link";
import { Button, Field, Label, Input } from "@headlessui/react";
import Image from "next/image";
import { handleSignup } from "@/actions/signup";

interface SignupPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SignUpPage({
    searchParams,
}: Readonly<SignupPageProps>) {
    const params = await searchParams;
    const nameError = params.error_name as string;
    const emailError = params.error_email as string;
    const passwordError = params.error_password as string;
    const confirmPasswordError = params.error_confirmPassword as string;
    const authError = params.error_auth as string;
    const preservedName = params.name as string;
    const preservedEmail = params.email as string;

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-100
         to-blue-100 flex flex-col items-center justify-center p-4"
        >
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
                    <form action={handleSignup} className="space-y-6">
                        {authError && (
                            <div
                                role="alert"
                                aria-live="polite"
                                className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"
                            >
                                <p className="text-red-600 text-sm">
                                    {authError}
                                </p>
                            </div>
                        )}
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
                                    placeholder="Enter your full name"
                                    defaultValue={preservedName || ""}
                                    aria-describedby={
                                        nameError ? "name-error" : undefined
                                    }
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                        nameError
                                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                                {nameError && (
                                    <p
                                        role="alert"
                                        className="mt-1 text-sm text-red-600"
                                    >
                                        {nameError}
                                    </p>
                                )}
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
                                    placeholder="name@email.com"
                                    defaultValue={preservedEmail || ""}
                                    aria-describedby={
                                        emailError ? "email-error" : undefined
                                    }
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                        emailError
                                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                                {emailError && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {emailError}
                                    </p>
                                )}
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
                                    placeholder="Enter your password"
                                    autoComplete="new-password"
                                    aria-describedby={
                                        passwordError
                                            ? "password-error"
                                            : undefined
                                    }
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                        passwordError
                                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                                {passwordError && (
                                    <p
                                        role="alert"
                                        className="mt-1 text-sm text-red-600"
                                    >
                                        {passwordError}
                                    </p>
                                )}
                            </Field>
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
                                    autoComplete="new-password"
                                    placeholder="Confirm your password"
                                    aria-describedby={
                                        confirmPasswordError
                                            ? "confirm-password-error"
                                            : undefined
                                    }
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                        confirmPasswordError
                                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                                {confirmPasswordError && (
                                    <p
                                        role="alert"
                                        className="mt-1 text-sm text-red-600"
                                    >
                                        {confirmPasswordError}
                                    </p>
                                )}
                            </Field>
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
