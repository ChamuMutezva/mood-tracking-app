"use server";
import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/auth";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";
import { createSession } from "./sessions";
import { cookies } from "next/headers";
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

        // Create custom JWT session
       const customSessionToken = await createSession({
            email,
            timestamp: Date.now()
        });

        (await cookies()).set('custom-session', customSessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 1, // 1 day
        });

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
