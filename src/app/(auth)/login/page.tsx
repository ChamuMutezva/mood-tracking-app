import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
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
            <LoginForm />
        </main>
    );
}
