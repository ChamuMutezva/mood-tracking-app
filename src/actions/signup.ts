"use server";

import { registerUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

// Define the form schema
const signupSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export interface SignupFormState {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        auth?: string[];
    };
    preservedName?: string;
    preservedEmail?: string;
    success?: string;
    redirectTo?: string;
}

export async function handleSignup(
    prevState: SignupFormState,
    formData: FormData
): Promise<SignupFormState> {
    const validatedFields = signupSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            preservedName: formData.get("name") as string,
            preservedEmail: formData.get("email") as string,
        };
    }

    const { name, email, password } = validatedFields.data;
    let user;
    try {
        // Create user in your database
        user = await registerUser(name, email, password);

    } catch (error) {
        console.error("Signup error:", error);
        return {
            errors: {
                auth: ["An error occurred during signup. Please try again."],
            },
            preservedName: name,
            preservedEmail: email,
        };
    }
    // After successful user creation, perform the redirect.
    // This is outside the try/catch block.
    if (user) {
        redirect("/login");
    }
    // This return statement is now only for cases where the user was not created
    // but no error was thrown (e.g., a specific return value from registerUser).
    return {
        errors: {
            auth: ["Failed to create account. Please try again."],
        },
        preservedName: name,
        preservedEmail: email,
    };
}
