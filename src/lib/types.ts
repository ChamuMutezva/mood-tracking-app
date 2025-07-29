export interface User {
  id: number
  name: string
  email: string
  created_at: string
}

export interface MoodEntry {
  id: number
  user_id: number
  mood: number
  sleep_hours: number
  feelings: string[]
  journal_entry: string | null
  created_at: string
}

export interface MoodQuote {
  mood_level: number
  quotes: string[]
}

export interface ChartData {
  date: string
  sleep: number
  mood: number
  moodLabel: string
  sleepLabel: string
  feelings: string[]
}
