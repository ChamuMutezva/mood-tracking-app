import Image from "next/image";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { Suspense } from "react";

export default async function ForgotPasswordPage() {
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
            <Suspense
                fallback={
                    <div className="w-full max-w-lg">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    Reset your password
                                </h1>
                                <p className="text-gray-600">
                                    Enter your email address and we'll send you
                                    instructions to reset your password
                                </p>
                            </div>
                            <div className="animate-pulse space-y-6">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                }
            >
                <ForgotPasswordForm />
            </Suspense>
        </main>
    );
}
