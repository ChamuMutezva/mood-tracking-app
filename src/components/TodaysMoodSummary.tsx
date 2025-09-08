"use client";

import Image from "next/image";
import type { MoodEntry } from "@/lib/types";
import { getSleepLabel } from "@/lib/sleep-config";

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

export default function TodaysMoodSummary({
    entry,
    selectedQuote,
}: Readonly<TodaysMoodSummaryProps>) {
    const mood = moodOptions.find((option) => option.value === entry.mood);
    const sleepLabel = getSleepLabel(entry.sleep_hours).replace("h", " hours");

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center text-center w-full">
            {mood && (
                <div
                    className="bg-accent shadow-sm rounded-[var(--radius-16)] p-6 grid grid-cols-1
                sm:grid-cols-2 lg:col-span-1 lg:row-span-2 place-items-center gap-3 w-full"
                >
                    <h2 className="text-foreground flex flex-col text-left">
                        <span className="opacity-70 text-preset-3">
                            I&apos;m feeling
                        </span>
                        <span className="opacity-100 text-preset-2">
                            {mood.label}
                        </span>
                    </h2>
                    <Image
                        src={mood.icon || "/placeholder.svg"}
                        alt={mood.label}
                        width={154}
                        height={155}
                        className="min-w-50 min-h-50 w-auto h-auto row-span-2"
                        priority
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
            <div className="bg-accent shadow-sm rounded-[var(--radius-16)] p-6 w-full">
                <div className="flex items-center justify-start gap-4 mb-4">
                    <div>
                        <Image
                            src={"/assets/images/icon-sleep.svg"}
                            alt={""}
                            width={16}
                            height={16}
                        />
                    </div>
                    <h2 className="text-preset-6 text-accent-foreground">
                        Sleep
                    </h2>
                </div>
                {sleepLabel && (
                    <p className="text-preset-3 text-foreground text-left">
                        {sleepLabel}
                    </p>
                )}
            </div>
            <div className="bg-accent shadow-sm rounded-[var(--radius-16)] p-6 w-full">
                <div className="flex items-center justify-start gap-4 mb-4">
                    <div>
                        <Image
                            src={"/assets/images/icon-reflection.svg"}
                            alt={""}
                            width={16}
                            height={16}
                        />
                    </div>
                    <h2 className="text-preset-6 text-accent-foreground">
                        Reflection of the day
                    </h2>
                </div>
                {entry.journal_entry && (
                    <p className="text-preset-6 text-foreground max-w-prose line-clamp-3 text-left mb-4">
                        {entry.journal_entry}
                    </p>
                )}
                <div className="text-left flex flex-start gap-2">
                    {entry.feelings &&
                        entry.feelings.length > 0 &&
                        entry.feelings.map((entry) => (
                            <span
                                key={entry}
                                className="text-preset-6-italic text-accent-foreground"
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
