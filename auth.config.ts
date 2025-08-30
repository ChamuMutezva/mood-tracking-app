import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return Response.redirect(new URL("/login", nextUrl));
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            return true;
        },
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({session, token}) {
            if (token && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    providers: [],
} satisfies NextAuthConfig;
