"use server";
import { redirect } from "next/navigation";
import { validateUser } from "@/lib/auth";

export interface LoginFormState {
    errors: {
        email?: string;
        password?: string;
        auth?: string;
    };
    preservedEmail?: string;
    success?: string;
    redirectTo?: string;
}

export async function handleLogin(
    prevState: LoginFormState,
    formData: FormData
): Promise<LoginFormState> {
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
        return {
            errors,
            preservedEmail: email,
        };
    }

    try {
        const user = await validateUser(email, password);
        console.log("User from validateUser:", user);
        if (!user) {
            return {
                errors: { auth: "Invalid email or password" },
                preservedEmail: email,
            };
        }

        console.log("Login successful for user:", user.email);
        return {
            errors: {},
            success: "Login successful! Redirecting...",    
            redirectTo: "/dashboard" // Add a redirect property
        }
    } catch (error) {
        console.error("Login error:", error);
        return {
            errors: { auth: "An unexpected error occurred. Please try again." },
            preservedEmail: email,
        };
    }
    
}
