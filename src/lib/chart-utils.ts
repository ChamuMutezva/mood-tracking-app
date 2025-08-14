import type { MoodEntry, ChartData } from "./types";
import { getSleepLabel, getSleepValue } from "./sleep-config";

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

    return entries
        .slice(0, 11) // Last 5 entries
        .reverse() // Show chronologically
        .map((entry) => ({
            id: entry.id,
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
            journal_entry: entry.journal_entry,
        }));
}

export function calculateAveragesFromEntries(entries: MoodEntry[]) {
    const chartEntries = entries.slice(0, 5); // Same 5 entries used in chart

    if (chartEntries.length === 0) {
        return {
            averageMood: null,
            averageSleep: null,
            entryCount: 0,
            averageMoodLabel: null,
            averageSleepRange: null,
            averageMoodIcon: null,
        };
    }

    console.log("Chart Entries:", chartEntries);
    const totalMood = chartEntries.reduce((sum, entry) => sum + entry.mood, 0);
    const averageMood = totalMood / chartEntries.length;

    const sleepEntries = chartEntries.filter((entry) => entry.sleep_hours > 0);
    const averageSleep =
        sleepEntries.length > 0
            ? sleepEntries.reduce((sum, entry) => sum + entry.sleep_hours, 0) /
              sleepEntries.length
            : null;

    // Convert average mood to label
    const getMoodLabel = (mood: number): string => {
        const roundedMood = Math.round(mood);
        const moodLabels = {
            "-2": "Very Sad",
            "-1": "Sad",
            "0": "Neutral",
            "1": "Happy",
            "2": "Very Happy",
        };
        return (
            moodLabels[roundedMood.toString() as keyof typeof moodLabels] ||
            "Neutral"
        );
    };

    // Convert average mood to icon path
    const getMoodIcon = (mood: number): string => {
        const roundedMood = Math.round(mood);
        const moodIcons = {
            "-2": "/assets/images/icon-very-sad-white.svg",
            "-1": "/assets/images/icon-sad-white.svg",
            "0": "/assets/images/icon-neutral-white.svg",
            "1": "/assets/images/icon-happy-white.svg",
            "2": "/assets/images/icon-very-happy-white.svg",
        };
        return (
            moodIcons[roundedMood.toString() as keyof typeof moodIcons] ||
            "/assets/images/icon-neutral-white.svg"
        );
    };

    return {
        averageMood,
        averageSleep,
        entryCount: chartEntries.length,
        averageMoodLabel:
            averageMood !== null ? getMoodLabel(averageMood) : null,
        averageSleepRange:
            averageSleep !== null ? getSleepLabel(averageSleep) : null,
        averageMoodIcon: averageMood !== null ? getMoodIcon(averageMood) : null,
    };
}
