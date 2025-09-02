// middleware.ts (FIXED VERSION)
import { auth } from "./auth";

export default auth;

export const config = {
    matcher: ["/dashboard/:path*"],
};
