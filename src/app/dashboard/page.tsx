import Header from "@/components/Header";
import MoodSleepChart from "@/components/MoodSleepChart";
import MoodLoggingDialog from "@/components/MoodLoggingDialog";
import { auth } from "../../../auth";
import {
    getUserById,
    getMoodEntriesForUser,
    getMoodEntryForToday,
    getMoodQuotes,
    getComparisonAverages,
} from "@/lib/data";
import {
    transformMoodEntriesToChartData,
    calculateAveragesFromEntries,
} from "@/lib/chart-utils";
import CurrentDate from "@/components/CurrentDate";
import DisplaySleepMoodData from "@/components/DisplaySleepMoodData";
import SleepMoodDataNotAvailable from "@/components/SleepMoodDataNotAvailable";

export default async function Home() {
    const session = await auth();
    const userId = parseInt(session?.user?.id || "0", 10);
    const user = await getUserById(userId);
    const moodEntries = await getMoodEntriesForUser(userId);
    const todayMoodEntry = await getMoodEntryForToday(userId);
    const quotes = await getMoodQuotes();
    const comparisonAverages = await getComparisonAverages(userId);

    const {
        averageMood,
        averageSleep,
        entryCount,
        averageMoodLabel,
        averageSleepRange,
        averageMoodIcon,
    } = calculateAveragesFromEntries(moodEntries);

    const chartData = transformMoodEntriesToChartData(moodEntries);

    let selectedQuote: string | null = null;
    if (todayMoodEntry) {
        const moodQuotesForEntry =
            quotes.find((q) => q.mood_level === todayMoodEntry.mood)?.quotes ||
            [];
        if (moodQuotesForEntry.length > 0) {
            selectedQuote =
                moodQuotesForEntry[
                    Math.floor(Math.random() * moodQuotesForEntry.length)
                ];
        }
    }

    return (
        <div className="px-4 pt-8 pb-20 flex flex-col gap-2 max-w-7xl m-auto">
            <Header session={session} />
            <main className="grid  gap-[32px] row-start-2 items-center  lg:grid-cols-3">
                <section
                    className="welcome-section flex flex-col gap-6 justify-center items-center lg:col-span-3 min-w-0 "
                    aria-labelledby="greeting-text"
                >
                    <p
                        id="greeting-text"
                        className="text-preset-3 text-card-foreground"
                    >
                        {`Hello, ${session?.user?.name}!`}
                    </p>
                    <h1 className="greeting text-preset-1 text-foreground text-center">
                        How are you feeling today?
                    </h1>

                    <CurrentDate />
                    <MoodLoggingDialog
                        user={user || { id: 0 }}
                        todayEntry={todayMoodEntry}
                        selectedQuote={selectedQuote}
                    />
                </section>
                {averageMood !== null || averageSleep !== null ? (
                    <DisplaySleepMoodData
                        entryCount={entryCount}
                        averageMood={averageMood}
                        averageMoodIcon={averageMoodIcon}
                        averageMoodLabel={averageMoodLabel}
                        averageSleep={averageSleep}
                        averageSleepRange={averageSleepRange}
                        comparisonAverages={comparisonAverages}
                    />
                ) : (
                    <SleepMoodDataNotAvailable />
                )}
                <MoodSleepChart data={chartData} />
            </main>
        </div>
    );
}
