import ResetPasswordForm from "@/components/ResetPasswordForm";

export default async function ResetPasswordPage({
    searchParams,
}: Readonly<{
    searchParams: Promise<{ token: string }>;
}>) {
    const { token } = await searchParams;

    return (
        <main className="flex flex-col items-center justify-center relative lg:justify-around  min-h-screen  lg:flex-row w-full lg:p-4">
            <ResetPasswordForm token={token} />
        </main>
    );
}
