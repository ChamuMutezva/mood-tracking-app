"use client";

import { useActionState, useEffect, useState } from "react";
import { Field, Label, Input, Button } from "@headlessui/react";
import Link from "next/link";
import { RequestEmailFormState } from "@/lib/types";
import { requestPasswordReset } from "@/actions/request-password-reset";
// import { useSearchParams } from "next/navigation";
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/16/solid";

const initialState: RequestEmailFormState = {
    errors: {},
    message: "",
    success: false,
};

export default function ForgotPasswordForm() {
    // const searchParams = useSearchParams();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

    const [state, formAction, isPending] = useActionState<
        RequestEmailFormState,
        FormData
    >(requestPasswordReset, initialState);

    useEffect(() => {
        if (state?.success && !isRedirecting) {
            console.log("Password reset email sent successfully");
            setShowSuccessOverlay(true);
            setIsRedirecting(true);

            // Brief delay for better UX before showing success message
            const timer = setTimeout(() => {
                setShowSuccessOverlay(false);
                setIsRedirecting(false);
            }, 3000); // Show success overlay for 3 seconds

            return () => clearTimeout(timer);
        }
    }, [state?.success, isRedirecting]);

    const status = () => {
        if (isPending) return "Sending instructions...";
        return "Send Reset Instructions";
    };

    return (
        <div className="auth-sub-container">
            {showSuccessOverlay && (
                <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
                    <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
                        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Email Sent!
                        </h3>
                        <p className="text-gray-600">
                            Check your email for password reset instructions
                        </p>
                        <Link
                            href={"/login"}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                            aria-disabled={isRedirecting}
                        >
                            Return to login
                        </Link>
                    </div>
                </div>
            )}

            <div
                className={`bg-white rounded-2xl shadow-xl p-8 transition-opacity duration-300 ${
                    showSuccessOverlay ? "opacity-60" : "opacity-100"
                }`}
            >
                {/* Form Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Reset your password
                    </h1>
                    <p className="text-gray-600">
                        Enter your email address and we&apos;ll send you
                        instructions to reset your password
                    </p>
                </div>

                <form action={formAction} className="space-y-6" noValidate>
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

                    {state?.errors?.general && (
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
                            placeholder="name@email.com"
                            defaultValue={""}
                            aria-describedby={
                                state?.errors?.email ? "email-error" : undefined
                            }
                            aria-invalid={!!state?.errors?.email}
                            className={`input text-preset-6-regular ${
                                state?.errors?.email
                                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300"
                            }`}
                            disabled={isPending || isRedirecting}
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

                    <Button
                        type="submit"
                        disabled={isPending || isRedirecting}
                        className="btn-submit"
                    >
                        {status()}
                    </Button>
                </form>

                {/* Back to Login Link */}
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Remember your password?{" "}
                        <Link
                            href="/login"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                            aria-disabled={isRedirecting}
                        >
                            Back to login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
