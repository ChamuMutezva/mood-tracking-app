"use server"
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { ResetPasswordFormState, ResetPasswordSchema } from "@/lib/types";

// RESET PASSWORD - called by the reset-password form
export async function resetPassword(
    state: ResetPasswordFormState | undefined,
    formData: FormData
): Promise<ResetPasswordFormState> {
    // 1. Validate form fields
    const validatedFields = ResetPasswordSchema.safeParse({
        token: formData.get("token"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });

    // 2. If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            ...state,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid input. Failed to reset password.",
            success: false,
        };
    }

    const { token, password } = validatedFields.data;
 try {
        // 3. Check if the token is valid and not expired
        const result = await sql`
        SELECT * FROM users
        WHERE reset_token = ${token}
        AND reset_token_expiry > NOW()
      `;

        if (result.rows.length === 0) {
            return {
                errors: {
                    general: "Invalid or expired reset token",
                },
                success: false,
            };
        }

        const user = result.rows[0];

        // 4. Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Update the user's password and clear the reset token
        await sql`
        UPDATE users
        SET password = ${hashedPassword}, reset_token = NULL, reset_token_expiry = NULL
        WHERE id = ${user.id}
         `;

        // 6. If password reset is successful, return success state
        return { success: true, message: "Password reset successfully" };
    } catch (error) {
        console.error("Error resetting password:", error);
        return {
            errors: {
                general: "Failed to reset password. Please try again.",
            },
            success: false,
        };
    }
}
// End of reset password