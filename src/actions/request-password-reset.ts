"use server";
import { sql } from "@vercel/postgres";
import { RequestEmailFormState, ForgotPasswordSchema } from "@/lib/types";
import { updateSchema } from "./update-schema";
import { Resend } from "resend";
import MoodResetPasswordEmail from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);
// Forgot password - called by the forgot-password form
export async function requestPasswordReset(
    state: RequestEmailFormState,
    formData: FormData
): Promise<RequestEmailFormState> {
    //1. Ensure the schema is up to date
    await updateSchema();

    //2. Validate form fields
    const validatedFields = ForgotPasswordSchema.safeParse({
        email: formData.get("email"),
    });

    //3. If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            ...state,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid email. Failed to request password reset.",
            success: false,
        };
    }

    const { email } = validatedFields.data;

    try {
        //4. Check if the email exists in the database
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        console.log("new user:", user.rows[0]);
        if (user.rows.length === 0) {
            return {
                errors: {
                    email: ["No account found with this email address."],
                },
                success: false,
            };
        }

        const currentUser = user.rows[0];
        const currentTime = new Date();

        //5. Check if the existing reset token has expired
        console.log(currentUser.reset_token_expiry, currentTime);
        if (
            currentUser.reset_token_expiry &&
            new Date(currentUser.reset_token_expiry) > currentTime
        ) {
            console.log("Valid token exists, not sending new email");
            return {
                message:
                    "A password reset link has already been sent. You still have a valid token. Please check your email or try again later.",
                success: false,
            };
        }

        console.log(
            "No valid token exists or token has expired, generating new token"
        );
        //6. Generate a password reset token
        const resetToken = crypto.randomUUID();
        const resetTokenExpiry = new Date(Date.now() + 3600000); // Token expires in 1 hour

        const offset = resetTokenExpiry.getTimezoneOffset() * 60000;
        const adjustedExpiry = new Date(resetTokenExpiry.getTime() - offset);
        //7. Save the reset token and expiry in the database
        console.log("Attempting SQL update");
        try {
            await sql`
            UPDATE users
            SET reset_token = ${resetToken}, reset_token_expiry = ${adjustedExpiry.toISOString()}
            WHERE email = ${email}
        `;
        } catch (sqlError) {
            console.error("SQL Error:", sqlError);
            throw new Error("Database update failed");
        }

        console.log("New reset token:", resetToken);
        console.log("New reset token expiry:", resetTokenExpiry);

        //8. Send password reset email
        const name = currentUser.name;
        await sendPasswordResetEmail(name, email, resetToken);

        return {
            message: "Password reset link sent to your email.",
            success: true,
        };
    } catch (error) {
        return {
            ...state,
            errors: {
                general: "A domain setup error occurred. Please try again.",
            },
            success: false,
        };
    }
}

// SEND PASSWORD RESET - called by the resetPasswordReset function
async function sendPasswordResetEmail(
    name: string,
    email: string,
    resetToken: string
) {
    // Implement email sending logic here
    // You can use a service like SendGrid, AWS SES, or any other email service
    console.log(
        `Sending password reset email for ${name} to ${email} with token ${resetToken}`
    );

    try {
        const appUrl = process.env.APP_URL ?? "http://localhost:3000"; // Fallback for local development
        const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;

        const { data, error } = await resend.emails.send({
            from: "Chamu <admin@preprince.co.za>", // Replace with your verified sender delivered@resend.dev
            to: email,
            subject: "Reset Your Password",
            react: MoodResetPasswordEmail({
                userFirstname: name,
                email: email,
                resetPasswordLink: resetUrl,
            }),
        });

        if (error) {
            console.error("Error sending reset email:", error);
            throw new Error("Failed to send password reset email");
        }

        console.log("Reset email sent:", data);
        return { data };
    } catch (error) {
        console.error("Error in sendPasswordResetEmail:", error);
        throw new Error("Failed to send password reset email");
    }
}
