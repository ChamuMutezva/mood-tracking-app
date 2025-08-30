import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { z } from "zod";
import type { User } from "@/lib/types";
import postgres from "postgres";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<User | null> {
    try {
        const users = await sql<
            User[]
        >`SELECT * FROM users WHERE email = ${email}`;
        if (users.length === 0) {
            return null;
        }                 
        return users[0];
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Failed to fetch user");
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                try {
                    const parsedCredentials = z
                        .object({
                            email: z.string().email(),
                            password: z.string().min(6),
                        })
                        .safeParse(credentials);

                    if (!parsedCredentials.success) {
                        console.log("Invalid credentials format");
                        return null;
                    }                   

                    const { email, password } = parsedCredentials.data;                   
                    const user = await getUser(email);
                    
                    if (!user) {
                        console.log("User not found:", email);
                        return null;
                    }

                    // Check if user has a password
                    if (!user.password_hash) {
                        console.log(
                            "User has no password set. Full user object:",
                            JSON.stringify(user, null, 2)
                        );
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password_hash
                    );
                    console.log("Password match result:", passwordMatch);

                    // Check if user has a password
                    if (!user.password_hash) {
                        console.log(
                            "User has no password set. Full user object:",
                            JSON.stringify(user, null, 2)
                        );
                        return null;
                    }

                    if (passwordMatch) {
                        // Map user to NextAuth User type (id as string)
                        return {
                            ...user,
                            id: String(user.id),
                        };
                    } else {
                        console.log("Password does not match for user:", email);
                        return null;
                    }
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
});
