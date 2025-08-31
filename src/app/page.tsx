import Link from "next/link";
import Image from "next/image";
import { LogInIcon, UserPlusIcon, SparklesIcon , MoonIcon, BarChart2Icon, LockIcon} from "lucide-react";

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
                <h1 className="text-3xl font-bold text-gray-800 mb-2 sm:text-4xl">
                    Unlock Your Inner Peace
                </h1>
                <p className="text-lg text-gray-600">
                    Track your mood and sleep patterns to better understand your
                    well-being
                </p>
            </div>

            <section
                className="w-full max-w-xl"
                aria-labelledby="start-section"
            >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h2
                            id="start-section"
                            className="text-2xl font-bold text-gray-900 mb-2"
                        >
                            Welcome to MoodTracker
                        </h2>
                        <p className="text-gray-600">
                            Start your journey to better mental health and sleep
                            quality
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4 flex flex-col justify-center items-center gap-4">
                        {/* Login Button */}
                        <Link
                            href="/login"
                            className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-preset-5-bold text-blue-600 bg-transparent rounded-[var(--radius-10)] 
                        hover:bg-blue-50 transition-colors duration-200 shadow-sm hover:shadow-md"
                            aria-label="Log into an existing account"
                        >
                            <LogInIcon className="h-5 w-5" />
                            <span>Log In</span>
                        </Link>

                        {/* Sign Up Button */}
                        <Link
                            href="/signup"
                            className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-preset-5-bold text-white bg-blue-600 rounded-[var(--radius-10)] 
                        hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                            aria-label="Create New Account"
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
                        <p className="mb-2 flex items-center justify-center gap-2">
                            <SparklesIcon
                                className="h-4 w-4 text-gray-500"
                                aria-hidden="true"
                            />
                            <span>Track your daily mood patterns</span>
                        </p>
                        <p className="mb-2 flex items-center justify-center gap-2">
                            <MoonIcon
                                className="h-4 w-4 text-gray-500"
                                aria-hidden="true"
                            />
                            <span>Monitor your sleep quality</span>
                        </p>
                        <p className="mb-2 flex items-center justify-center gap-2">
                            <BarChart2Icon
                                className="h-4 w-4 text-gray-500"
                                aria-hidden="true"
                            />
                            <span>Get insights and analytics</span>
                        </p>
                        <p className="flex items-center justify-center gap-2">
                            <LockIcon
                                className="h-4 w-4 text-gray-500"
                                aria-hidden="true"
                            />
                            <span>Your data is always private and secure</span>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
