"use client";

import {
    ExclamationTriangleIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Button, Label, Input, Field } from "@headlessui/react";
import { useActionState, useEffect } from "react";
import { resetPassword } from "@/actions/reset-password";
import { useRouter } from "next/navigation";
import { ResetPasswordFormState } from "@/lib/types";
import Link from "next/link";

const initialState: ResetPasswordFormState = {
    errors: {},
    message: "",
    success: false,
};

export default function ResetPasswordForm({
    token,
}: Readonly<{ token: string }>) {
    const [state, formAction, isPending] = useActionState<
        ResetPasswordFormState,
        FormData
    >(resetPassword, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            const timer = setTimeout(() => {
                router.push("/login?reset=success");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [state.success, router]);

    const status = () => {
        if (isPending) return "Resetting...";
        return "Reset Password";
    };

    return (
        <div className="auth-sub-container">
            <div className="auth-form-container">
                <div className="text-center mb-8">
                    <h1 className="text-preset-3 form-main-heading">
                        Reset Password
                    </h1>
                    <p className="text-preset-6-regular text-accent-foreground text-left">
                        Enter your new password below.
                    </p>
                </div>
                <form action={formAction} className="space-y-6" noValidate>
                    {state.errors?.general && (
                        <div
                            role="alert"
                            aria-live="polite"
                            className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2"
                        >
                            <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                            <p className="text-red-600 text-sm">
                                {state.errors.general}
                            </p>
                        </div>
                    )}
                    {/* Success message (if any) */}
                    {state.message && !state.errors?.general && (
                        <div
                            role="alert"
                            aria-live="polite"
                            className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center gap-2"
                        >
                            <CheckCircleIcon className="h-5 w-5 text-green-600" />
                            <p className="text-green-600 text-sm">
                                {state.message}
                            </p>
                        </div>
                    )}
                    <input type="hidden" name="token" value={token} />

                    {/* NEW PASSWORD */}
                    <Field>
                        <Label
                            className="label text-preset-6-regular"
                            htmlFor="password"
                        >
                            New Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter new password"
                                aria-required="true"
                                minLength={6}
                                aria-describedby={
                                    state?.errors?.password
                                        ? "password-error"
                                        : undefined
                                }
                                aria-invalid={!!state?.errors?.password}
                                disabled={isPending}
                                className={`input text-preset-6-regular pl-10 ${
                                    state?.errors?.password
                                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                        </div>
                        {state?.errors?.password && (
                            <p
                                id="password-error"
                                className="text-sm text-red-500"
                            >
                                {state.errors.password}
                            </p>
                        )}
                    </Field>

                    {/* CONFIRM PASSWORD */}
                    <Field>
                        <Label
                            className="label text-preset-6-regular"
                            htmlFor="confirmPassword"
                        >
                            Confirm New Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                aria-required="true"
                                minLength={6}
                                aria-describedby={
                                    state?.errors?.confirmPassword
                                        ? "confirm-password-error"
                                        : undefined
                                }
                                aria-invalid={!!state?.errors?.confirmPassword}
                                disabled={isPending}
                                className={`input text-preset-6-regular pl-10 ${
                                    state?.errors?.confirmPassword
                                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                        </div>
                        {state?.errors?.confirmPassword && (
                            <p
                                id="confirm-password-error"
                                className="text-sm text-red-500"
                            >
                                {state.errors.confirmPassword}
                            </p>
                        )}
                    </Field>
                    <Button type="submit" className="btn-submit">
                        {status()}
                    </Button>
                </form>
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Remember your password 
                        <Link
                            href="/login"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                            aria-disabled={isPending}
                        >
                          {" "} back to  Login.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
