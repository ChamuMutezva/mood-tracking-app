import Link from "next/link";
import { Field, Label, Input, Button } from "@headlessui/react";
import Image from "next/image";

async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Server-side validation
    const errors: string[] = [];

    if (!email) {
        errors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.push("Please enter a valid email address");
    }

    if (!password) {
        errors.push("Password is required");
    } else if (password.length < 6) {
        errors.push("Password must be at least 6 characters long");
    }

    if (errors.length > 0) {
        // In a real app, you'd handle errors properly
        console.log("Validation errors:", errors);
        return;
    }

    console.log("Login attempt:", { email, password: "***" });

    // TODO: Add actual authentication logic here
    // For now, just log the attempt

    // Redirect to dashboard after successful login (when implemented)
    // redirect("/dashboard")
}

export default function LoginPage() {
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
            <div className="w-full max-w-md">
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

                    <form action={handleLogin} className="space-y-6">
                        <Field>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </Label>
                            <Input
                                name="email"
                                type="email"
                                required
                                placeholder="name@email.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </Field>

                        <Field>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </Label>
                            <Input
                                name="password"
                                type="password"
                                required
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </Field>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
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
