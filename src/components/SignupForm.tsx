"use client";

import { useActionState } from "react";
import { Field, Label, Input, Button } from "@headlessui/react";
import Link from "next/link";
import { SignupFormState, handleSignup } from "@/actions/signup";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";

export default function SignupForm() {
    const [state, formAction, isPending] = useActionState<
        SignupFormState,
        FormData
    >(handleSignup, { errors: {} });

    const status = () => {
        if (isPending) return "Signing up...";
        return "Sign Up";
    };

    return (
        <div className="auth-sub-container">
            <div
                className={`bg-white rounded-2xl shadow-xl p-8 transition-opacity duration-300 
                   
                `}
            >
                {/* Form Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Create an account
                    </h1>
                    <p className="text-gray-600">
                        Join to track your daily mood and sleep with ease.
                    </p>
                </div>

                <form action={formAction} className="space-y-6" noValidate>
                    {state.errors?.auth && (
                        <div
                            role="alert"
                            aria-live="polite"
                            className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2"
                        >
                            <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                            <p className="text-red-600 text-sm">
                                {state.errors.auth}
                            </p>
                        </div>
                    )}

                    <Field>
                        <Label htmlFor="name" className="label text-preset-6-regular">
                            Full name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            defaultValue={state?.preservedName || ""}
                            aria-describedby={
                                state?.errors?.name ? "name-error" : undefined
                            }
                            aria-invalid={!!state?.errors?.name}
                            className={`input text-preset-6-regular ${
                                state?.errors?.name
                                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300"
                            }`}
                            disabled={isPending}
                        />
                        {state?.errors?.name && (
                            <p
                                role="alert"
                                aria-live="polite"
                                id="name-error"
                                className="mt-1 text-sm text-red-600"
                            >
                                {state.errors.name}
                            </p>
                        )}
                    </Field>

                    <Field>
                        <Label htmlFor="email" className="label text-preset-6-regular">
                            Email address
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@email.com"
                            defaultValue={state?.preservedEmail || ""}
                            aria-describedby={
                                state?.errors?.email ? "email-error" : undefined
                            }
                            aria-invalid={!!state?.errors?.email}
                            className={`input text-preset-6-regular ${
                                state?.errors?.email
                                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300"
                            }`}
                            disabled={isPending}
                        />
                        {state?.errors?.email && (
                            <p
                                role="alert"
                                aria-live="polite"
                                id="email-error"
                                className="mt-1 text-sm text-red-600"
                            >
                                {state.errors.email}
                            </p>
                        )}
                    </Field>

                    <Field>
                        <Label
                            htmlFor="password"
                            className="label text-preset-6-regular"
                        >
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Enter your password"
                            aria-describedby={
                                state?.errors?.password
                                    ? "password-error"
                                    : undefined
                            }
                            aria-invalid={!!state.errors?.password}
                            className={`input text-preset-6-regular ${
                                state?.errors?.password
                                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300"
                            }`}
                            disabled={isPending}
                        />
                        {state?.errors?.password && (
                            <p
                                id="password-error"
                                className="mt-1 text-sm text-red-600"
                            >
                                {state?.errors?.password}
                            </p>
                        )}
                    </Field>

                    <Field>
                        <Label
                            htmlFor="confirmPassword"
                            className="label text-preset-6-regular"
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
                                state?.errors?.confirmPassword
                                    ? "confirm-password-error"
                                    : undefined
                            }
                            aria-invalid={!!state.errors?.confirmPassword}
                            className={`input text-preset-6-regular ${
                                state?.errors?.confirmPassword
                                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300"
                            }`}
                            disabled={isPending}
                        />
                        {state?.errors?.confirmPassword && (
                            <p
                                role="alert"
                                className="mt-1 text-sm text-red-600"
                                id="confirm-password-error"
                            >
                                {state.errors.confirmPassword}
                            </p>
                        )}
                    </Field>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="btn-submit"
                    >
                        {status()}
                    </Button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Already got an account?{" "}
                        <Link
                            href="/login"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                            aria-disabled={isPending}
                        >
                            Log in.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
