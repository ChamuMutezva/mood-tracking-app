"use server";

import { signOut } from "../../auth";
import { deleteCustomSession } from "./sessions";

export async function logout() {
    await deleteCustomSession();
    await signOut({ redirectTo: "/login" });
}
