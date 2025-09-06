import ResetPasswordForm from "@/components/ResetPasswordForm";
import { Suspense } from "react";
import Image from "next/image";

export default async function ResetPasswordPage({
    searchParams,
}: Readonly<{
    searchParams: Promise<{ token: string }>;
}>) {
    const { token } = await searchParams;

    return (
        <main className="auth-parent">
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
                                    Enter your new password and confirm the password again
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
                <ResetPasswordForm token={token} />
            </Suspense>
        </main>
    );
}
