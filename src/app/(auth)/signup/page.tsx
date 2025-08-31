import type React from "react";
import Image from "next/image";
import { Suspense } from "react";
import SignupForm from "@/components/SignupForm";

export default async function SignUpPage() {
    return (
        <main
            className="min-h-screen bg-gradient-to-br from-purple-100
         to-blue-100 flex flex-col items-center justify-center p-4"
        >
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
            <Suspense
                fallback={
                    <div className="w-full max-w-[33.25rem]">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    Create an account
                                </h1>
                                <p className="text-gray-600">
                                    Join to track your daily mood and sleep with
                                    ease.
                                </p>
                            </div>
                            <div className="animate-pulse space-y-6">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                }
            >
                <SignupForm />
            </Suspense>
        </main>
    );
}
