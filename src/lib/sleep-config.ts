export interface SleepOption {
    value: number;
    label: string;
    hours: string;
    actualHours: number; // Representative actual hours for storage
}
export interface MoodOption {
    value: number;
    label: string;
    icon: string;
}

export const sleepOptions: SleepOption[] = [
    { value: 5, label: "9+ hours", hours: "9+", actualHours: 10 },
    { value: 4, label: "7-8 hours", hours: "7-8", actualHours: 7.5 },
    { value: 3, label: "5-6 hours", hours: "5-6", actualHours: 5.5 },
    { value: 2, label: "3-4 hours", hours: "3-4", actualHours: 3.5 },
    { value: 1, label: "0-2 hours", hours: "0-2", actualHours: 1 },
];

export const sleepLabels = {
    1: "0-2h",
    2: "3-4h",
    3: "5-6h",
    4: "7-8h",
    5: "9+h",
};

export function getSleepValue(hours: number): number {
    if (hours <= 2) return 1;
    if (hours <= 4) return 2;
    if (hours <= 6) return 3;
    if (hours <= 8) return 4;
    return 5;
}

export function getSleepLabel(hours: number): string {
    if (hours <= 2) return "0-2h";
    if (hours <= 4) return "3-4h";
    if (hours <= 6) return "5-6h";
    if (hours <= 8) return "7-8h";
    return "9+h";
}

export function getSleepLabelFromValue(value: number): string {
    return sleepLabels[value as keyof typeof sleepLabels] || "Unknown";
}
