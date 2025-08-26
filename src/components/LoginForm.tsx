"use client";

import { useActionState, useEffect } from "react";
import { Field, Label, Input, Button } from "@headlessui/react";
import Link from "next/link";
import { handleLogin, LoginFormState } from "@/actions/login";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState<
        LoginFormState,
        FormData
    >(handleLogin, {
        errors: {},
    });
    const router = useRouter();
    useEffect(() => {
        if (state.redirectTo) {
            console.log("Redirecting to:", state.redirectTo);
            router.push(state.redirectTo);
        }
    }, [state.redirectTo, router]);

    return (
        <div className="w-full max-w-[33.25rem]">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                {/* Form Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome back!
                    </h1>
                    <p className="text-gray-600">
                        Log in to continue tracking your mood and sleep
                    </p>
                </div>

                <form action={formAction} className="space-y-6" noValidate>
                    {state.success && (
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
                            className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"
                        >
                            <p className="text-red-600 text-sm">
                                {state.errors.auth}
                            </p>
                        </div>
                    )}

                    <Field>
                        <Label
                            htmlFor="email"
                            className="block text-preset-6-regular text-foreground mb-2"
                        >
                            Email address
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="name@email.com"
                            defaultValue={state.preservedEmail || ""}
                            aria-describedby={
                                state.errors.email ? "email-error" : undefined
                            }
                            aria-invalid={!!state.errors.email}
                            className={`w-full px-4 py-3 border text-preset-6-regular rounded-[var(--radius-10)] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                state.errors.email
                                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {state.errors.email && (
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
                            className="block text-preset-6-regular text-foreground mb-2"
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
                                state.errors.password
                                    ? "password-error"
                                    : undefined
                            }
                            aria-invalid={!!state.errors.password}
                            className={`w-full px-4 py-3 border text-preset-6-regular rounded-[var(--radius-10)] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                state.errors.password
                                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {state.errors.password && (
                            <p
                                id="password-error"
                                className="mt-1 text-sm text-red-600"
                            >
                                {state.errors.password}
                            </p>
                        )}
                    </Field>

                    <div className="text-sm text-right mb-2">
                        <Link
                            href="/forgot-password"
                            className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-[var(--radius-10)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Logging in..." : "Log In"}
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
    );
}
