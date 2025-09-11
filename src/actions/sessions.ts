import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/lib/types";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// helper function for creating a new session
export async function createSession(payload: SessionPayload, expiration: string = "1d") {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiration)
        .sign(encodedKey);
}

export async function verifySession(token: string) {
    try {
        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
}

export async function getCustomSession() {
    const cookieStore = cookies();
    const token = (await cookieStore).get("custom-session")?.value;

    if (!token) return null;

    return verifySession(token);
}


export async function deleteCustomSession() {
  (await cookies()).delete('custom-session');
}
