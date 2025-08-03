import { sql } from "./db"
import type { MoodEntry, User, MoodQuote } from "./types"

export async function getMoodEntriesForUser(userId: number, limit = 7): Promise<MoodEntry[]> {
  try {
    const entries = await sql`
      SELECT id, user_id, mood, sleep_hours, feelings, journal_entry, created_at
      FROM mood_entries 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC 
      LIMIT ${limit}
    `
    return entries as MoodEntry[]
  } catch (error) {
    console.error("Error fetching mood entries:", error)
    throw new Error("Failed to fetch mood entries")
  }
}

export async function getUserById(userId: number): Promise<User | null> {
  try {
    const users = await sql`
      SELECT id, name, email, created_at
      FROM users 
      WHERE id = ${userId}
      LIMIT 1
    `
    return (users[0] as User) || null
  } catch (error) {
    console.error("Error fetching user:", error)
    throw new Error("Failed to fetch user")
  }
}

export async function getMoodQuotes(): Promise<MoodQuote[]> {
  try {
    const quotes = await sql`
      SELECT mood_level, quotes
      FROM mood_quotes
      ORDER BY mood_level
    `
    return quotes as MoodQuote[]
  } catch (error) {
    console.error("Error fetching mood quotes:", error)
    return []
  }
}

export async function getAverageMoodForUser(userId: number, days = 5): Promise<number | null> {
  try {
    // Calculate the date threshold on the client side
    const dateThreshold = new Date()
    dateThreshold.setDate(dateThreshold.getDate() - days)

    const result = await sql`
      SELECT AVG(mood) as average_mood
      FROM mood_entries 
      WHERE user_id = ${userId}
        AND created_at >= ${dateThreshold.toISOString()}
    `
    return result[0]?.average_mood ? Number(result[0].average_mood) : null
  } catch (error) {
    console.error("Error calculating average mood:", error)
    return null
  }
}

export async function getAverageSleepForUser(userId: number, days = 5): Promise<number | null> {
  try {
    const result = await sql`
      SELECT AVG(sleep_hours) as average_sleep
      FROM mood_entries 
      WHERE user_id = ${userId}
        AND created_at >= NOW() - INTERVAL '${days} days'
        AND sleep_hours IS NOT NULL
    `
    return result[0]?.average_sleep ? Number(result[0].average_sleep) : null
  } catch (error) {
    console.error("Error calculating average sleep:", error)
    return null
  }
}
