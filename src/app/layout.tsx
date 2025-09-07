import type { Metadata } from "next";
import { Reddit_Sans } from "next/font/google";
import { EdgeStoreProvider } from "@/lib/edgestore";
import "./globals.css";

const redditSans = Reddit_Sans({
    variable: "--font-reddit-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Mood tracking app",
    description: "Track your mood, sleeping hours and feelings everyday",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${redditSans.variable}  antialiased`}>
                <EdgeStoreProvider> {children}</EdgeStoreProvider>
            </body>
        </html>
    );
}
