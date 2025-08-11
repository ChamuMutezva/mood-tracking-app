"use client";

import Image from "next/image";
import type { MoodEntry } from "@/lib/types";

interface TodaysMoodSummaryProps {
    entry: MoodEntry;
    selectedQuote: string | null;
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

const getSleepLabel = (hours: number): string => {
    if (hours <= 2) return "0-2 hours";
    if (hours <= 4) return "3-4 hours";
    if (hours <= 6) return "5-6 hours";
    if (hours <= 8) return "7-8 hours";
    return "9+ hours";
};

export default function TodaysMoodSummary({
    entry,
    selectedQuote,
}: Readonly<TodaysMoodSummaryProps>) {
    const mood = moodOptions.find((option) => option.value === entry.mood);
    const sleepLabel = getSleepLabel(entry.sleep_hours);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center text-center w-full">
            {mood && (
                <div
                    className="bg-accent shadow-sm rounded-[var(--radius-10)] p-6 grid grid-cols-1
                sm:grid-cols-2 lg:col-span-1 lg:row-span-2 place-items-center gap-3 w-full"
                >
                    <h3 className="text-foreground  flex flex-col">
                        <span className="opacity-70 text-preset-3">
                            I am feeling
                        </span>
                        <span className="opacity-100 text-preset-2">
                            {mood.label}
                        </span>
                    </h3>
                    <Image
                        src={mood.icon || "/placeholder.svg"}
                        alt={mood.label}
                        width={200}
                        height={200}
                        className="min-w-50 min-h-50 row-span-2"
                    />
                    <div className="flex flex-col justify-center items-center">
                        <Image
                            src={"/assets/images/icon-quote.svg"}
                            alt={""}
                            width={16}
                            height={16}
                        />
                        {selectedQuote && (
                            <p className="text-preset-6-italic text-foreground max-w-prose mt-2">
                                &quot;{selectedQuote}&quot;
                            </p>
                        )}
                    </div>
                </div>
            )}
            <div className="bg-accent shadow-sm rounded-[var(--radius-10)] p-6 w-full">
                <div className="flex">
                    <Image
                        src={"/assets/images/icon-sleep.svg"}
                        alt={""}
                        width={16}
                        height={16}
                    />
                    <span>Sleep</span>
                </div>
                {sleepLabel && (
                    <p className="text-preset-6 text-muted-foreground text-left">
                        {sleepLabel}
                    </p>
                )}
            </div>
            <div className="bg-accent shadow-sm rounded-[var(--radius-10)] p-6 w-full">
                <div className="flex justify-items-start">
                    <Image
                        src={"/assets/images/icon-reflection.svg"}
                        alt={""}
                        width={16}
                        height={16}
                    />
                    <h3>Reflection of the day</h3>
                </div>
                {entry.journal_entry && (
                    <p className="text-preset-7 text-muted-foreground italic max-w-prose line-clamp-3 text-left">
                        &quot;{entry.journal_entry}&quot;
                    </p>
                )}
                <div className="text-left flex flex-start gap-2">
                    {entry.feelings &&
                        entry.feelings.length > 0 &&
                        entry.feelings.map((entry) => (
                            <span
                                key={entry}
                                className="text-preset-6 text-muted-foreground"
                            >
                                #{entry}
                            </span>
                        ))}
                </div>
            </div>

            <div className="lg:col-span-2">
                <p className="text-preset-7 text-muted-foreground mt-2">
                    Logged at:{" "}
                    {new Date(entry.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>
            {/* add an "Edit" button here later if needed */}
        </div>
    );
}
