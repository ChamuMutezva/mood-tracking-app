import React from "react";

function SleepMoodDataNotAvailable() {
    return (
        <section
            aria-labelledby="average-mood-title"
            className="flex flex-col gap-8 bg-primary rounded-[var(--radius-16)]
             px-[var(--spacing-200)] py-[var(--spacing-250)] min-w-0 h-full"
        >
            <div className="average-mood-container flex flex-1 flex-col gap-4">
                <h2
                    id="average-mood-title"
                    className="text-preset-4 text-foreground"
                >
                    Average Mood
                    <span className="text-preset-7">(Last 5 Check-ins)</span>
                </h2>
                <div className="bg-card rounded-[var(--radius-16)] px-[var(--spacing-200)]
                 py-[var(--spacing-250)] flex flex-col items-start justify-center gap-4 h-full">
                    <h3 className="text-preset-4 text-foreground">
                        Keep tracking
                    </h3>
                    <p className="text-preset-7 text-foreground">
                        Log 5 Check-ins to see your average mood.
                    </p>
                </div>
            </div>
            <div className="average-sleep-container flex flex-1 flex-col gap-4">
                <h2
                    id="average-sleep-title"
                    className="text-preset-4 text-foreground"
                >
                    Average Sleep
                    <span className="text-preset-7">(Last 5 Check-ins)</span>
                </h2>
                <div className="bg-card rounded-[var(--radius-16)] px-[var(--spacing-200)] 
                py-[var(--spacing-250)] flex flex-col items-start justify-center gap-4 h-full">
                    <h3 className="text-preset-4 text-foreground">
                        Not enough data yet
                    </h3>
                    <p className="text-preset-7 text-foreground">
                        Track 5 nights to view your average sleep.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default SleepMoodDataNotAvailable;
