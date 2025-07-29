import type { MoodEntry, ChartData } from "./types";

export function transformMoodEntriesToChartData(
    entries: MoodEntry[]
): ChartData[] {
    const moodLabels = {
        "-2": "Very Sad",
        "-1": "Sad",
        "0": "Neutral",
        "1": "Happy",
        "2": "Very Happy",
    };

    const getSleepLabel = (hours: number): string => {
        if (hours <= 2) return "0-2h";
        if (hours <= 4) return "3-4h";
        if (hours <= 6) return "5-6h";
        if (hours <= 8) return "7-8h";
        return "9+h";
    };

    const getSleepValue = (hours: number): number => {
        if (hours <= 2) return 1;
        if (hours <= 4) return 2;
        if (hours <= 6) return 3;
        if (hours <= 8) return 4;
        return 5;
    };

    return entries
        .slice(0, 5) // Last 5 entries
        .reverse() // Show chronologically
        .map((entry) => ({
            date: new Date(entry.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
            }),
            sleep: getSleepValue(entry.sleep_hours),
            mood: entry.mood,
            moodLabel:
                moodLabels[entry.mood.toString() as keyof typeof moodLabels] ||
                "Unknown",
            sleepLabel: getSleepLabel(entry.sleep_hours),
            feelings: entry.feelings || [],
        }));
}
