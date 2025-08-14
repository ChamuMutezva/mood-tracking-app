import type { Metadata } from "next";
import {  Reddit_Sans } from "next/font/google";
import "./globals.css";

const redditSans = Reddit_Sans({
    variable: "--font-reddit-sans",
    subsets: ["latin"],
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
            <body
                className={`${redditSans.variable}  antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
