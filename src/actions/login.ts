"use server";
import { redirect } from "next/navigation";
import { validateUser } from "@/lib/auth";

export async function handleLogin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Server-side validation
    const errors: Record<string, string> = {};

    if (!email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Please enter a valid email address";
    }

    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(errors).length > 0) {
        const searchParams = new URLSearchParams();
        Object.entries(errors).forEach(([field, message]) => {
            searchParams.set(`error_${field}`, message);
        });
        if (email) searchParams.set("email", email); // Preserve email input
        redirect(`/login?${searchParams.toString()}`);
    }

    try {
        const user = await validateUser(email, password);
        console.log("User from validateUser:", user);
        if (!user) {
            const searchParams = new URLSearchParams();
            searchParams.set("error_auth", "Invalid email or password");
            if (email) searchParams.set("email", email);
            redirect(`/login?${searchParams.toString()}`);
        }

        console.log("Login successful for user:", user.email);
    } catch (error) {
        console.error("Login error:", error);
        const searchParams = new URLSearchParams();
        searchParams.set("error_auth", "An error occurred. Please try again.");
        if (email) searchParams.set("email", email);
        redirect(`/login?${searchParams.toString()}`);
    }

    redirect("/dashboard");
}
