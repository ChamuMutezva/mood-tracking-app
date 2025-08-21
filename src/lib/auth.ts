import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL!);

export interface User {
    id: number;
    email: string;
    name: string;
    created_at: string;
}

export async function validateUser(
    email: string,
    password: string
): Promise<User | null> {
    try {
        // Find user by email
        const users = await sql`
      SELECT id, email, name, password_hash, created_at 
      FROM users 
      WHERE email = ${email}
      LIMIT 1
    `;

        if (users.length === 0) {
            return null; // User not found
        }

        const user = users[0];

        // Verify password
        const isValidPassword = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isValidPassword) {
            return null; // Invalid password
        }

        // Return user without password hash
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            created_at: user.created_at,
        };
    } catch (error) {
        console.error("Database error during login:", error);
        return null;
    }
}

export async function createUser(
    email: string,
    password: string,
    name: string
): Promise<User | null> {
    try {
        // Hash password
        const saltRounds = 12;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Insert user
        const users = await sql`
      INSERT INTO users (email, password_hash, name, created_at)
      VALUES (${email}, ${password_hash}, ${name}, NOW())
      RETURNING id, email, name, created_at
    `;

        return users[0] as User;
    } catch (error) {
        console.error("Database error during user creation:", error);
        return null;
    }
}

export async function registerUser(name: string, email: string, password: string): Promise<User> {
  try {
    // Check if user already exists
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${email} LIMIT 1
    `

    if (existingUsers.length > 0) {
      throw new Error("User already exists")
    }

    // Hash password
    const saltRounds = 12
    const password_hash = await bcrypt.hash(password, saltRounds)

    // Insert user
    const users = await sql`
      INSERT INTO users (email, password_hash, name, created_at)
      VALUES (${email}, ${password_hash}, ${name}, NOW())
      RETURNING id, email, name, created_at
    `

    return users[0] as User
  } catch (error) {
    if (error instanceof Error && error.message === "User already exists") {
      throw error
    }
    console.error("Database error during user registration:", error)
    throw new Error("Registration failed")
  }
}
