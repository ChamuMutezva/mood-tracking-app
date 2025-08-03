import React from "react";
import Image from "next/image";

type DisplaySleepMoodDataProps = {
    entryCount: number;
    averageMood: number | null;
    averageMoodLabel: string | null;
    averageMoodIcon?: string | null;
    averageSleep: number | null;
    averageSleepRange: string | null;
};

function DisplaySleepMoodData({
    entryCount,
    averageMood,
    averageMoodLabel,
    averageMoodIcon,
    averageSleep,
    averageSleepRange,
}: Readonly<DisplaySleepMoodDataProps>) {
    return (
        <section
            aria-labelledby="average-mood-title"
            className="flex flex-col gap-8 bg-primary rounded-[var(--radius-16)] px-[var(--spacing-200)] py-[var(--spacing-250)] min-w-0"
        >
            <div className="average-mood-container flex flex-col gap-4">
                <h2
                    id="average-mood-title"
                    className="text-preset-4 text-foreground"
                >
                    Average Mood
                    <span className="text-preset-7">
                        (Last {entryCount} Check-ins)
                    </span>
                </h2>
                <div
                    className="bg-secondary rounded-[var(--radius-16)] px-[var(--spacing-200)] py-[var(--spacing-250)]
                        flex flex-col items-start gap-4
                        bg-[url('/assets/images/bg-pattern-averages.svg')] bg-cover bg-center "
                >
                    <div className="flex items-center gap-3">
                        {averageMoodIcon && (
                            <Image
                                src={averageMoodIcon || "/placeholder.svg"}
                                alt={`Mood: ${averageMoodLabel}`}
                                width={24}
                                height={24}
                                className="flex-shrink-0"
                            />
                        )}
                        <h3 className="text-preset-4 text-foreground">
                            {averageMoodLabel ?? "No mood data available"}
                        </h3>
                    </div>
                    {averageMood !== null && (
                        <p className="text-preset-7 text-foreground">
                            Score: {averageMood.toFixed(1)}
                        </p>
                    )}
                    <p>Comparison with previous week</p>
                </div>
            </div>
            <div className="average-sleep-container flex flex-col gap-4">
                <h2
                    id="average-sleep-title-data"
                    className="text-preset-4 text-foreground"
                >
                    Average Sleep
                    <span className="text-preset-7">
                        (Last {entryCount} Check-ins)
                    </span>
                </h2>
                <div
                    className="bg-card-foreground rounded-[var(--radius-16)] px-[var(--spacing-200)] py-[var(--spacing-250)] flex flex-col items-start gap-4
                        bg-[url('/assets/images/bg-pattern-averages.svg')] bg-cover bg-center "
                >
                    <h3 className="text-preset-4 text-foreground">
                        {averageSleepRange ?? "No sleep data available"}
                    </h3>
                    {averageSleep !== null && (
                        <p className="text-preset-7 text-foreground">
                            Exact: {averageSleep.toFixed(1)}h per night
                        </p>
                    )}
                    <p>Comparison with previous week</p>
                </div>
            </div>
        </section>
    );
}

export default DisplaySleepMoodData;
