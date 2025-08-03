import Header from "@/components/Header";
import MoodSleepChart from "@/components/MoodSleepChart";
import Image from "next/image";
import {
    getUserById,
    // getAverageMoodForUser,
    //  getAverageSleepForUser,
    getMoodEntriesForUser,
    // getMoodQuotes,
} from "@/lib/data";
import {
    transformMoodEntriesToChartData,
    calculateAveragesFromEntries,
} from "@/lib/chart-utils";
import CurrentDate from "@/components/CurrentDate";

export default async function Home() {
    const user = await getUserById(1);
    const moodEntries = await getMoodEntriesForUser(1);
    const {
        averageMood,
        averageSleep,
        entryCount,
        averageMoodLabel,
        averageSleepRange,
        averageMoodIcon,
    } = calculateAveragesFromEntries(moodEntries);

    const chartData = transformMoodEntriesToChartData(moodEntries);
    console.log("User:", user);
    console.log("Average Mood:", averageMood);
    console.log("Average Sleep:", averageSleep);
    console.log("Entry Count:", entryCount);
    function displaySleepMoodData() {
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
                    <div className="bg-card rounded-[var(--radius-16)] px-[var(--spacing-200)] py-[var(--spacing-250)] flex flex-col items-start gap-4">
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
                    <div className="bg-card rounded-[var(--radius-16)] px-[var(--spacing-200)] py-[var(--spacing-250)] flex flex-col items-start gap-4">
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

    function sleepMoodDataNotAvailable() {
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
        );
    }

    return (
        <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <Header />
            <main className="grid  gap-[32px] row-start-2 items-center  lg:grid-cols-3">
                <section
                    className="welcome-section flex flex-col gap-2 justify-center items-center lg:col-span-3 min-w-0 "
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

                    <CurrentDate />

                    <button
                        type="button"
                        id="mood-logging-heading"
                        className="bg-card-foreground text-preset-5 text-white px-[var(--spacing-400)] py-[var(--spacing-200)] rounded-[var(--radius-10)] font-semibold hover:bg-card-foreground/90 transition-colors duration-200"
                    >
                        Log today&apos;s mood
                    </button>
                </section>
                {averageMood !== null || averageSleep !== null
                    ? displaySleepMoodData()
                    : sleepMoodDataNotAvailable()}
                <MoodSleepChart data={chartData} />
            </main>
        </div>
    );
}
