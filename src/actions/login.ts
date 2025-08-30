"use server";
import { redirect } from "next/navigation";
import {  loginSchema } from "@/lib/auth";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";

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

export async function authenticate(
    prevState: LoginFormState,
    formData: FormData
): Promise<LoginFormState> {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const callbackUrl = (formData.get("callbackUrl") as string) || "/dashboard";

    // Validate with Zod
    const result = loginSchema.safeParse({ email, password });

    // If validation fails, return all errors
    if (!result.success) {
        const errors: { email?: string; password?: string } = {};

        result.error.issues.forEach((issue) => {
            const field = issue.path[0] as keyof typeof errors;
            errors[field] = issue.message;
        });

        return {
            errors,
            preservedEmail: email,
        };
    }

    try {
        const signInResult = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (signInResult?.error) {
            return {
                errors: { auth: "Invalid email or password." },
                preservedEmail: email,
            };
        }
         
        redirect(callbackUrl);
       
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        errors: { auth: "Invalid credentials." },
                        preservedEmail: email,
                    };
                default:
                    return {
                        errors: { auth: "Something went wrong." },
                        preservedEmail: email,
                    };
            }
        }

        // Re-throw if it's not an AuthError
        throw error;
    }
}
