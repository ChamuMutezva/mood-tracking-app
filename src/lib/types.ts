import { z } from "zod";
export interface User {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    created_at: string;
}

export interface MoodEntry {
    id: number;
    user_id: number;
    mood: number;
    sleep_hours: number;
    feelings: string[];
    journal_entry: string | null;
    created_at: string;
}

export interface MoodQuote {
    mood_level: number;
    quotes: string[];
}

export interface ChartData {
    id: number;
    date: string;
    sleep: number;
    mood: number;
    moodLabel: string;
    sleepLabel: string;
    feelings: string[];
    journal_entry: string | null;
}

export type RequestEmailFormState =
    | {
          errors?: {
              email?: string[];
              general?: string;
          };
          message?: string;
          success?: boolean;
      }
    | undefined;

export const ForgotPasswordSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
});

export type ResetPasswordFormState = {
    errors?: {
        token?: string[];
        password?: string[];
        confirmPassword?: string[];
        general?: string;
    };
    message?: string;
    success?: boolean;
};

// Define the schema for password reset
export const ResetPasswordSchema = z
    .object({
        token: z.string().uuid(),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long"),
        confirmPassword: z
            .string()
            .min(6, "Confirm password must be at least 6 characters long"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type SessionPayload = {
    userId?: number;
    email: string;
    name?: string;
    timestamp?: number;
};
