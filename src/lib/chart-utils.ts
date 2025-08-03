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
    // Convert average sleep to range
    const getSleepRange = (hours: number): string => {
        if (hours < 3) return "0-2h";
        if (hours < 5) return "3-4h";
        if (hours < 7) return "5-6h";
        if (hours < 9) return "7-8h";
        return "9+h";
    };

    return {
        averageMood,
        averageSleep,
        entryCount: chartEntries.length,
        averageMoodLabel:
            averageMood !== null ? getMoodLabel(averageMood) : null,
        averageSleepRange:
            averageSleep !== null ? getSleepRange(averageSleep) : null,
        averageMoodIcon: averageMood !== null ? getMoodIcon(averageMood) : null,
    };
}
