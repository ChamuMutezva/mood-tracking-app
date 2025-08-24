import Link from "next/link";
import { Field, Label, Input, Button } from "@headlessui/react";
import Image from "next/image";
import { handleLogin } from "@/actions/login";

interface LoginPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LoginPage({
    searchParams,
}: Readonly<LoginPageProps>) {
    const params = await searchParams;
    const emailError = params.error_email as string;
    const passwordError = params.error_password as string;
    const authError = params.error_auth as string;
    const successMessage = params.success as string;
    const preservedEmail = params.email as string;
    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-4">
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

                    <form action={handleLogin} className="space-y-6" noValidate>
                        {successMessage && (
                            <div
                                className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4"
                                role="alert"
                                aria-live="polite"
                            >
                                <p className="text-green-600 text-sm">
                                    {successMessage}
                                </p>
                            </div>
                        )}

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
                                defaultValue={preservedEmail || ""}
                                aria-describedby={
                                    emailError ? "email-error" : undefined
                                }
                                aria-invalid={!!emailError}
                                className={`w-full px-4 py-3 border text-preset-6-regular rounded-[var(--radius-10)] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    emailError
                                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {emailError && (
                                <p
                                    role="alert"
                                    aria-live="polite"
                                    id="email-error"
                                    className="mt-1 text-sm text-red-600"
                                >
                                    {emailError}
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
                                    passwordError ? "password-error" : undefined
                                }
                                aria-invalid={!!passwordError}
                                className={`w-full px-4 py-3 border text-preset-6-regular rounded-[var(--radius-10)] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    passwordError
                                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {passwordError && (
                                <p
                                    id="password-error"
                                    className="mt-1 text-sm text-red-600"
                                >
                                    {passwordError}
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
        </main>
    );
}
