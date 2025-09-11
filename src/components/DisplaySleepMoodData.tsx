import React from "react";
import Image from "next/image";

type ComparisonAverages = {
    latest: {
        mood: number | null;
        sleep: number | null;
    };
    previous: {
        mood: number | null;
        sleep: number | null;
    };
    comparison: {
        mood: number | null;
        sleep: number | null;
    };
};

type DisplaySleepMoodDataProps = {
    entryCount: number;
    averageMood: number | null;
    averageMoodLabel: string | null;
    averageMoodIcon?: string | null;
    averageSleep: number | null;
    averageSleepRange: string | null;
    comparisonAverages: ComparisonAverages;
};

function DisplayTrendIncrease() {
    return (
        <div className="flex items-start gap-2">
            <div>
                <Image
                    width={16}
                    height={16}
                    src="/assets/images/icon-trend-increase.svg"
                    alt={""}
                    className="mt-0.75"
                />
            </div>
            <p className="text-preset-7">
                Increased from the previous 5 check ins
            </p>
        </div>
    );
}

function DisplayTrendSame() {
    return (
        <div className="flex items-start gap-2">
            <Image
                width={16}
                height={16}
                src="/assets/images/icon-trend-same.svg"
                alt={""}
                className="mt-0.75"
            />
            <p className="text-preset-7">No changes this week</p>
        </div>
    );
}

function DisplayTrendDecline() {
    return (
        <div className="flex items-start gap-2">
            <Image
                width={16}
                height={16}
                src="/assets/images/icon-trend-decrease.svg"
                alt={""}
                className="mt-0.75"
            />
            <p className="text-preset-7">
                decreased from the previous 5 check ins
            </p>
        </div>
    );
}

function DisplaySleepMoodData({
    entryCount,
    averageMoodLabel,
    averageMoodIcon,
    comparisonAverages,
}: Readonly<DisplaySleepMoodDataProps>) {
    const moodColors = {
        "2": "hsl(35, 100%, 74%)", // Very Happy - Amber
        "1": "hsl(115, 72%, 71%)", // Happy - Green
        "0": "hsl(207, 100%, 77%)", // Neutral - Blue
        "-1": "hsl(247, 100%, 85%)", // Sad - Purple
        "-2": "hsl(1, 100%, 80%)", // Very Sad - Red
    };

    const getMoodBackgroundColor = () => {
        const mood = comparisonAverages.latest.mood;
        if (mood === null) return "hsl(var(--card-foreground))"; // fallback
        const roundedMood = Math.round(mood);
        return (
            moodColors[roundedMood.toString() as keyof typeof moodColors] ||
            "hsl(var(--card-foreground))"
        );
    };
    return (
        <section
            aria-labelledby="average-mood-title"
            className="flex flex-col gap-8 bg-primary rounded-[var(--radius-16)] 
            px-[var(--spacing-200)] py-[var(--spacing-250)] min-w-0 h-full"
        >
            <div className="average-mood-container flex flex-col flex-1 gap-4">
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
                    className="patterns bg-secondary rounded-[var(--radius-16)] px-[var(--spacing-200)]
                     py-[var(--spacing-250)] flex flex-col items-start justify-center gap-4 relative h-full"
                    style={{ backgroundColor: getMoodBackgroundColor() }}
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
                        <p className="text-preset-4 text-foreground">
                            {averageMoodLabel}
                        </p>
                    </div>
                    <div>
                        {(() => {
                            const mood = comparisonAverages.comparison.mood;
                            if (
                                mood === null ||
                                mood === undefined ||
                                mood > 0
                            ) {
                                return <DisplayTrendIncrease />;
                            } else if (mood === 0) {
                                return <DisplayTrendSame />;
                            } else {
                                return <DisplayTrendDecline />;
                            }
                        })()}
                    </div>
                </div>
            </div>
            <div className="average-sleep-container flex flex-col flex-1 gap-4">
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
                    className="patterns bg-card-foreground rounded-[var(--radius-16)] px-[var(--spacing-200)]
                     py-[var(--spacing-250)] flex flex-col items-start justify-center gap-4 relative h-full"
                >
                    <div className="flex justify-center flex-start gap-2">
                        <Image
                            width={16}
                            height={16}
                            src="/assets/images/icon-sleep.svg"
                            alt={""}
                            className="filter brightness-0 invert"
                        />

                        {comparisonAverages.latest.sleep !== null && (
                            <p className="text-preset-4 text-white">
                                {comparisonAverages.latest.sleep.toFixed(1)}{" "}
                                hours
                            </p>
                        )}
                    </div>
                    <div className="text-preset-7 text-white filter brightness-0 invert">
                        {(() => {
                            const sleep = comparisonAverages.comparison.sleep;
                            if (
                                sleep === null ||
                                sleep === undefined ||
                                sleep > 0
                            ) {
                                return <DisplayTrendIncrease />;
                            } else if (sleep === 0) {
                                return <DisplayTrendSame />;
                            } else {
                                return <DisplayTrendDecline />;
                            }
                        })()}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DisplaySleepMoodData;
