import Link from "next/link";
import { Field, Label, Input, Button } from "@headlessui/react";
import Image from "next/image";
import { handleForgotPassword } from "@/actions/forgot-password";

interface ForgotPasswordPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ForgotPasswordPage({
    searchParams,
}: Readonly<ForgotPasswordPageProps>) {
    const params = await searchParams;
    const emailError = params.error_email as string;
    const generalError = params.error_general as string;
    const successMessage = params.success as string;
    const preservedEmail = params.email as string;

    return (
        <main className="auth-parent">
            {/* Logo and Brand */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Image
                        src="/assets/images/logo.svg"
                        alt="Mood tracking system"
                        width={178}
                        height={40}
                        priority
                    />
                </div>
            </div>

            <div className="auth-sub-container">
                <div className="bg-white rounded-2xl shadow-xl p-8">
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

                    <form
                        action={handleForgotPassword}
                        className="space-y-6"
                        noValidate
                    >
                        {successMessage && (
                            <div
                                className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4"
                                role="alert"
                                aria-live="polite"
                            >
                                <p className="text-green-600 text-sm">
                                    {successMessage}
                                </p>
                            </div>
                        )}

                        {generalError && (
                            <div
                                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4"
                                role="alert"
                                aria-live="assertive"
                            >
                                <p className="text-red-600 text-sm">
                                    {generalError}
                                </p>
                            </div>
                        )}

                        <Field>
                            <Label
                                htmlFor="email"
                                className="label"
                            >
                                Email address
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@email.com"
                                defaultValue={preservedEmail || ""}
                                aria-invalid={emailError ? "true" : "false"}
                                aria-describedby={
                                    emailError ? "email-error" : undefined
                                }
                                className={`input ${
                                    emailError
                                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {emailError && (
                                <p
                                    id="email-error"
                                    className="mt-1 text-sm text-red-600"
                                    role="alert"
                                    aria-live="polite"
                                >
                                    {emailError}
                                </p>
                            )}
                        </Field>

                        <Button type="submit" className="btn-submit">
                            Send Reset Instructions
                        </Button>
                    </form>

                    {/* Back to Login Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Remember your password?{" "}
                            <Link
                                href="/login"
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Back to login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
