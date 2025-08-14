import { sql } from "./db";
import type { MoodEntry, User, MoodQuote } from "./types";

export async function getMoodEntriesForUser(
    userId: number,
    limit = 11
): Promise<MoodEntry[]> {
    try {
        const entries = await sql`
      SELECT id, user_id, mood, sleep_hours, feelings, journal_entry, created_at
      FROM mood_entries 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC 
      LIMIT ${limit}
    `;
        return entries as MoodEntry[];
    } catch (error) {
        console.error("Error fetching mood entries:", error);
        throw new Error("Failed to fetch mood entries");
    }
}

export async function getMoodEntryForToday(
    userId: number
): Promise<MoodEntry | null> {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of today
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Set to start of tomorrow

        const entries = await sql`
      SELECT id, user_id, mood, sleep_hours, feelings, journal_entry, created_at
      FROM mood_entries 
      WHERE user_id = ${userId}
      AND created_at >= ${today.toISOString()}
      AND created_at < ${tomorrow.toISOString()}
      LIMIT 1
    `;
        return (entries[0] as MoodEntry) || null;
    } catch (error) {
        console.error("Error fetching mood entry for today:", error);
        return null;
    }
}

export async function getUserById(userId: number): Promise<User | null> {
    try {
        const users = await sql`
      SELECT id, name, email, created_at
      FROM users 
      WHERE id = ${userId}
      LIMIT 1
    `;
        return (users[0] as User) || null;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Failed to fetch user");
    }
}

export async function getMoodQuotes(): Promise<MoodQuote[]> {
    try {
        const quotes = await sql`
      SELECT mood_level, quotes
      FROM mood_quotes
      ORDER BY mood_level
    `;
        return quotes as MoodQuote[];
    } catch (error) {
        console.error("Error fetching mood quotes:", error);
        return [];
    }
}

export async function getAverageMoodForUser(
    userId: number,
    days = 5
): Promise<number | null> {
    try {
        // Calculate the date threshold on the client side
        const dateThreshold = new Date();
        dateThreshold.setDate(dateThreshold.getDate() - days);

        const result = await sql`
      SELECT AVG(mood) as average_mood
      FROM mood_entries 
      WHERE user_id = ${userId}
        AND created_at >= ${dateThreshold.toISOString()}
    `;
        return result[0]?.average_mood ? Number(result[0].average_mood) : null;
    } catch (error) {
        console.error("Error calculating average mood:", error);
        return null;
    }
}

export async function getAverageSleepForUser(
    userId: number,
    days = 5
): Promise<number | null> {
    try {
        const result = await sql`
      SELECT AVG(sleep_hours) as average_sleep
      FROM mood_entries 
      WHERE user_id = ${userId}
        AND created_at >= NOW() - INTERVAL '${days} days'
        AND sleep_hours IS NOT NULL
    `;
        return result[0]?.average_sleep
            ? Number(result[0].average_sleep)
            : null;
    } catch (error) {
        console.error("Error calculating average sleep:", error);
        return null;
    }
}

export async function getComparisonAverages(userId: number): Promise<{
  latest: { mood: number | null; sleep: number | null }
  previous: { mood: number | null; sleep: number | null }
  comparison: { mood: number | null; sleep: number | null }
}> {
  try {
    // Get latest 5 days (days 0-4)
    const latestThreshold = new Date()
    latestThreshold.setDate(latestThreshold.getDate() - 5)

    // Get previous 5 days (days 5-9)
    const previousStart = new Date()
    previousStart.setDate(previousStart.getDate() - 10)
    const previousEnd = new Date()
    previousEnd.setDate(previousEnd.getDate() - 5)

    // Latest 5 days averages
    const latestResults = await sql`
      SELECT AVG(mood) as avg_mood, AVG(sleep_hours) as avg_sleep
      FROM mood_entries 
      WHERE user_id = ${userId}
        AND created_at >= ${latestThreshold.toISOString()}
    `

    // Previous 5 days averages
    const previousResults = await sql`
      SELECT AVG(mood) as avg_mood, AVG(sleep_hours) as avg_sleep
      FROM mood_entries 
      WHERE user_id = ${userId}
        AND created_at >= ${previousStart.toISOString()}
        AND created_at < ${previousEnd.toISOString()}
    `

    const latestMood = latestResults[0]?.avg_mood ? Number(latestResults[0].avg_mood) : null
    const latestSleep = latestResults[0]?.avg_sleep ? Number(latestResults[0].avg_sleep) : null
    const previousMood = previousResults[0]?.avg_mood ? Number(previousResults[0].avg_mood) : null
    const previousSleep = previousResults[0]?.avg_sleep ? Number(previousResults[0].avg_sleep) : null

    // Calculate comparisons (positive = improvement, negative = decline)
    const moodComparison = latestMood !== null && previousMood !== null ? latestMood - previousMood : null
    const sleepComparison = latestSleep !== null && previousSleep !== null ? latestSleep - previousSleep : null

    return {
      latest: { mood: latestMood, sleep: latestSleep },
      previous: { mood: previousMood, sleep: previousSleep },
      comparison: { mood: moodComparison, sleep: sleepComparison },
    }
  } catch (error) {
    console.error("Error calculating comparison averages:", error)
    return {
      latest: { mood: null, sleep: null },
      previous: { mood: null, sleep: null },
      comparison: { mood: null, sleep: null },
    }
  }
}

