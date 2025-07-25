import Header from "@/components/Header";
import MoodSleepChart from "@/components/MoodSleepChart";

export default function Home() {
    return (
        <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <Header />
            <main className="grid  gap-[32px] row-start-2 items-center  lg:grid-cols-3">
                <section
                    className="welcome-section flex flex-col gap-2 justify-center items-center lg:col-span-3 "
                    aria-labelledby="greeting-text"
                >
                    <p
                        id="greeting-text"
                        className="text-preset-3 text-card-foreground"
                    >
                        Hello, Lisa!
                    </p>
                    <p className="greeting text-preset-1 text-foreground text-center">
                        How are you feeling today?
                    </p>
                    <time
                        dateTime="2025-04-16"
                        className="current-date text-preset-6 text-accent-foreground"
                    >
                        Wednesday, April 16th, 2025
                    </time>
                     <button
                        type="button"
                        id="mood-logging-heading"
                        className="bg-card-foreground text-preset-5 text-white px-[var(--spacing-400)] py-[var(--spacing-200)] rounded-[var(--radius-10)] font-semibold hover:bg-card-foreground/90 transition-colors duration-200"
                    >
                        Log today&apos;s mood
                    </button>
                </section>

                <section
                    aria-labelledby="average-mood-title"
                    className="flex flex-col gap-8 bg-primary rounded-[var(--radius-16)] px-[var(--spacing-200)] py-[var(--spacing-250)] "
                >
                    <div className="average-mood-container flex flex-col gap-4">
                        <h2
                            id="average-mood-title"
                            className="text-preset-4 text-foreground"
                        >
                            Average Mood
                            <span className="text-preset-7">
                                (Last 5 Check-ins)
                            </span>
                        </h2>
                        <div className="bg-card rounded-[var(--radius-16)] px-[var(--spacing-200)] py-[var(--spacing-250)] flex flex-col items-start gap-4">
                            <h3 className="text-preset-4 text-foreground">
                                Keep tracking
                            </h3>
                            <p className="text-preset-7 text-foreground">
                                Log 5 Check-ins to see your average mood.
                            </p>
                        </div>
                    </div>
                    <div className="average-sleep-container flex flex-col gap-4">
                        <h2
                            id="average-sleep-title"
                            className="text-preset-4 text-foreground"
                        >
                            Average Sleep
                            <span className="text-preset-7">
                                (Last 5 Check-ins)
                            </span>
                        </h2>
                        <div className="bg-card rounded-[var(--radius-16)] px-[var(--spacing-200)] py-[var(--spacing-250)] flex flex-col items-start gap-4">
                            <h3 className="text-preset-4 text-foreground">
                                Not enough data yet
                            </h3>
                            <p className="text-preset-7 text-foreground">
                                Track 5 nights to view your average sleep.
                            </p>
                        </div>
                    </div>
                </section>
                <MoodSleepChart />
                
            </main>
        </div>
    );
}
