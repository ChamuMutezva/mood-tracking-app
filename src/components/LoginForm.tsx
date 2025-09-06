"use client";

import { useActionState, useEffect, useState } from "react";
import { Field, Label, Input, Button } from "@headlessui/react";
import Link from "next/link";
import { LoginFormState, authenticate } from "@/actions/login";
import { useRouter, useSearchParams } from "next/navigation";
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/16/solid";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

    const [state, formAction, isPending] = useActionState<
        LoginFormState,
        FormData
    >(authenticate, { errors: {} });

    useEffect(() => {
        if (state.redirectTo && !isRedirecting) {
            console.log("Redirecting to:", state.redirectTo);
            setShowSuccessOverlay(true);
            setIsRedirecting(true);

            // Brief delay for better UX before redirecting
            const timer = setTimeout(() => {
                return router.push(state.redirectTo!);
            }, 800); // 800ms delay for smooth transition

            return () => clearTimeout(timer);
        }
    }, [state.redirectTo, router, isRedirecting]);

    const status = () => {
        if (isRedirecting) return "Redirecting...";
        if (isPending) return "Logging in...";
        return "Log In";
    };

    return (
        <div className="auth-sub-container">
            {showSuccessOverlay && (
                <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
                    <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
                        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Login Successful!
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Redirecting to your dashboard...
                        </p>
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`auth-form-container ${
                    showSuccessOverlay ? "opacity-60" : "opacity-100"
                }`}
            >
                {/* Form Header */}
                <div className="text-center mb-8">
                    <h1 className="text-preset-3 form-main-heading">
                        Welcome back!
                    </h1>
                    <p className="text-preset-6-regular text-accent-foreground text-left">
                        Log in to continue tracking your mood and sleep
                    </p>
                </div>

                <form action={formAction} className="space-y-6" noValidate>
                    {/* Add hidden callbackUrl field */}
                    <input
                        type="hidden"
                        name="callbackUrl"
                        value={callbackUrl}
                    />
                    {state?.success && !showSuccessOverlay && (
                        <div
                            className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4"
                            role="alert"
                            aria-live="polite"
                        >
                            <p className="text-green-600 text-sm">
                                {state.success}
                            </p>
                        </div>
                    )}

                    {state.errors.auth && (
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
                        <Label
                            htmlFor="email"
                            className="label text-preset-6-regular"
                        >
                            Email address
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
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
                            disabled={isRedirecting}
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
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            aria-describedby={
                                state?.errors?.password
                                    ? "password-error"
                                    : undefined
                            }
                            aria-invalid={!!state.errors.password}
                            className={`input text-preset-6-regular ${
                                state?.errors?.password
                                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300"
                            }`}
                            disabled={isRedirecting}
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

                    <div className="text-sm text-right mb-2">
                        <Link
                            href="/forgot-password"
                            className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline"
                            aria-disabled={isRedirecting}
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending || isRedirecting}
                        className="btn-submit"
                    >
                        {status()}
                    </Button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Haven&apos;t got an account?{" "}
                        <Link
                            href="/signup"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                            aria-disabled={isRedirecting}
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
