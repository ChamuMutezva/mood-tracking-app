import Link from "next/link";
import Image from "next/image";
import { LogInIcon } from "lucide-react";

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
            </div>

            <div className="w-full max-w-[33.25rem]">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Welcome back!
                        </h1>
                        <p className="text-gray-600">
                            Log in to continue tracking your mood and sleep
                        </p>
                    </div>

                    {/* Back to Login Link */}
                    <div className="text-center mt-6">
                        <Link
                            href="/login"
                            className="group flex justify-center items-center gap-2 rounded-[var(--radius-10)]
                             px-3 py-1.5 data-focus:bg-[hsl(var(--blue-200))] bg-card-foreground"
                        >
                           <LogInIcon className="h-5 w-5 text-primary-foreground group-hover:text-foreground" />
                            <span className="text-primary-foreground">Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
