"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { MoodEntry } from "@/lib/types";

interface AddMoodEntryParams {
    userId: number;
    mood: number;
    sleepHours: number;
    feelings: string[];
    journalEntry: string | null;
}

export async function addMoodEntry({
    userId,
    mood,
    sleepHours,
    feelings,
    journalEntry,
}: AddMoodEntryParams): Promise<{
    success: boolean;
    data?: MoodEntry;
    error?: string;
}> {
    try {
        // Get today's date components
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // JavaScript months are 0-indexed
        const day = today.getDate();

        // Check if an entry already exists for today for this user
        const existingEntry = await sql`
      SELECT id FROM mood_entries
      WHERE user_id = ${userId}
      AND EXTRACT(YEAR FROM created_at) = ${year}
      AND EXTRACT(MONTH FROM created_at) = ${month}
      AND EXTRACT(DAY FROM created_at) = ${day}
    `;

        if (existingEntry.length > 0) {
            return {
                success: false,
                error: "You have already logged your mood today.",
            };
        }

        const [newEntry] = await sql`
      INSERT INTO mood_entries (user_id, mood, sleep_hours, feelings, journal_entry, created_at)
      VALUES (${userId}, ${mood}, ${sleepHours}, ${feelings}, ${journalEntry}, NOW())
      RETURNING id, user_id, mood, sleep_hours, feelings, journal_entry, created_at
    `;

        revalidatePath("/"); // Revalidate the home page to show updated data
        return { success: true, data: newEntry as MoodEntry };
    } catch (error) {
        console.error("Error adding mood entry:", error);
        return { success: false, error: "Failed to add mood entry." };
    }
}
