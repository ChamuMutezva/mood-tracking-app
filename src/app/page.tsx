import Header from "@/components/Header";
import MoodSleepChart from "@/components/MoodSleepChart";
import MoodLoggingDialog from "@/components/MoodLoggingDialog";
import {
    getUserById,
    getMoodEntriesForUser,
    getMoodEntryForToday,
    // getMoodQuotes,
} from "@/lib/data";
import {
    transformMoodEntriesToChartData,
    calculateAveragesFromEntries,
} from "@/lib/chart-utils";
import CurrentDate from "@/components/CurrentDate";
import DisplaySleepMoodData from "@/components/DisplaySleepMoodData";
import SleepMoodDataNotAvailable from "@/components/SleepMoodDataNotAvailable";

export default async function Home() {
    const user = await getUserById(1);
    const moodEntries = await getMoodEntriesForUser(1);
    const todayMoodEntry = await getMoodEntryForToday(1);
    const {
        averageMood,
        averageSleep,
        entryCount,
        averageMoodLabel,
        averageSleepRange,
        averageMoodIcon,
    } = calculateAveragesFromEntries(moodEntries);

    const chartData = transformMoodEntriesToChartData(moodEntries);
    console.log("Chart Data:", chartData);
    console.log("Average Mood:", averageMood);
    console.log("Average Sleep:", averageSleep);
    console.log("Entry Count:", entryCount);

    return (
        <div className="px-4 pt-8 pb-20 flex flex-col gap-2 sm:p-20">
            <Header />
            <main className="grid  gap-[32px] row-start-2 items-center  lg:grid-cols-3">
                <section
                    className="welcome-section flex flex-col gap-6 justify-center items-center lg:col-span-3 min-w-0 "
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
                    <MoodLoggingDialog
                        user={user || { id: 0 }}
                        todayEntry={todayMoodEntry}
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
                    />
                ) : (
                    <SleepMoodDataNotAvailable />
                )}
                <MoodSleepChart data={chartData} />
            </main>
        </div>
    );
}
