import Link from "next/link";
import Image from "next/image";
import { LogInIcon, UserPlusIcon } from "lucide-react";

export default async function HomePage() {
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
                <p className="text-lg text-gray-600">
                    Track your mood and sleep patterns to better understand your
                    well-being
                </p>
            </div>

            <div className="w-full max-w-[33.25rem]">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Welcome to MoodTracker
                        </h1>
                        <p className="text-gray-600">
                            Start your journey to better mental health and sleep
                            quality
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        {/* Login Button */}
                        <Link
                            href="/login"
                            className="group flex justify-center items-center gap-2 rounded-[var(--radius-10)]
                             px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                             transition-colors duration-200 shadow-sm hover:shadow-md"
                        >
                            <LogInIcon className="h-5 w-5" />
                            <span>Login to Your Account</span>
                        </Link>

                        {/* Sign Up Button */}
                        <Link
                            href="/signup"
                            className="group flex justify-center items-center gap-2 rounded-[var(--radius-10)]
                             px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 
                             hover:text-white font-semibold transition-colors duration-200 
                             shadow-sm hover:shadow-md"
                        >
                            <UserPlusIcon className="h-5 w-5" />
                            <span>Create New Account</span>
                        </Link>
                    </div>
                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Or
                            </span>
                        </div>
                    </div>
                    {/* Additional Info */}
                    <div className="text-center text-sm text-gray-600">
                        <p className="mb-2">
                            ✨ Track your daily mood patterns
                        </p>
                        <p className="mb-2">💤 Monitor your sleep quality</p>
                        <p className="mb-2">📊 Get insights and analytics</p>
                        <p>🔒 Your data is always private and secure</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
