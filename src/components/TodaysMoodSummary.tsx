"use client";

import Image from "next/image";
import type { MoodEntry } from "@/lib/types";

interface TodaysMoodSummaryProps {
    entry: MoodEntry;
}

const moodOptions = [
    {
        value: 2,
        label: "Very Happy",
        icon: "/assets/images/icon-very-happy-color.svg",
    },
    { value: 1, label: "Happy", icon: "/assets/images/icon-happy-color.svg" },
    {
        value: 0,
        label: "Neutral",
        icon: "/assets/images/icon-neutral-color.svg",
    },
    { value: -1, label: "Sad", icon: "/assets/images/icon-sad-color.svg" },
    {
        value: -2,
        label: "Very Sad",
        icon: "/assets/images/icon-very-sad-color.svg",
    },
];

const sleepLabels = {
    1: "0-2 hours",
    2: "3-4 hours",
    3: "5-6 hours",
    4: "7-8 hours",
    5: "9+ hours",
};

export default function TodaysMoodSummary({
    entry,
}: Readonly<TodaysMoodSummaryProps>) {
    const mood = moodOptions.find((option) => option.value === entry.mood);
    const sleepLabel =
        sleepLabels[entry.sleep_hours as keyof typeof sleepLabels];

    return (
        <div className="bg-card rounded-[var(--radius-10)] p-6 shadow-sm flex flex-col gap-4 items-center text-center">
            {mood && (
                <div className="flex flex-col items-center gap-3">
                    <h3 className="text-preset-4 text-foreground flex flex-col">
                        I am feeling
                        <span className="text-preset-3 text-foreground">
                            {mood.label}
                        </span>
                    </h3>
                    <Image
                        src={mood.icon || "/placeholder.svg"}
                        alt={mood.label}
                        width={40}
                        height={40}
                    />
                    <div>
                        <Image
                            src={"/assets/images/icon-quote.svg"}
                            alt={""}
                            width={16}
                            height={16}
                        />
                    </div>
                </div>
            )}
            {entry.feelings && entry.feelings.length > 0 && (
                <p className="text-preset-6 text-muted-foreground">
                    You felt: {entry.feelings.join(", ")}
                </p>
            )}
            {sleepLabel && (
                <p className="text-preset-6 text-muted-foreground">
                    You slept: {sleepLabel} 💤
                </p>
            )}
            {entry.journal_entry && (
                <p className="text-preset-7 text-muted-foreground italic max-w-prose line-clamp-3">
                    &quot;{entry.journal_entry}&quot;
                </p>
            )}
            <p className="text-preset-7 text-muted-foreground mt-2">
                Logged at:{" "}
                {new Date(entry.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </p>
            {/* You can add an "Edit" button here later if needed */}
        </div>
    );
}
