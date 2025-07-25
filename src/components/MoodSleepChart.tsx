"use client";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MoodSleepChart = () => {
    // Convert sleep categories to numerical values for the chart
    const sleepValues = {
        A: 5, // 9+ hours
        B: 4, // 7-8 hours
        C: 3, // 5-6 hours
        D: 2, // 3-4 hours
        E: 1, // 0-2 hours
    };

    const data = {
        labels: ["Apr 06", "Apr 07", "Apr 08", "Apr 09", "Apr 10"],
        datasets: [
            {
                label: "Mood",
                data: [4, 3, 2, 1, 1],
                backgroundColor: "rgba(136, 132, 216, 0.8)",
                yAxisID: "y",
            },
            {
                label: "Sleep",
                data: (
                    ["A", "B", "C", "D", "E"] as Array<keyof typeof sleepValues>
                ).map((s) => sleepValues[s]),
                backgroundColor: "rgba(130, 202, 157, 0.8)",
                yAxisID: "y1",
            },
        ],
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        scales: {
            y: {
                type: "linear",
                display: true,
                position: "left",
                title: {
                    display: true,
                    text: "Mood",
                },
            },
            y1: {
                type: "linear",
                display: true,
                position: "right",
                title: {
                    display: true,
                    text: "Sleep",
                },
                min: 0,
                max: 6,
                ticks: {
                    callback: function (value: string | number) {
                        const sleepLabels = {
                            1: "0-2h",
                            2: "3-4h",
                            3: "5-6h",
                            4: "7-8h",
                            5: "9+h",
                        };
                        return (
                            sleepLabels[
                                Number(value) as keyof typeof sleepLabels
                            ] || ""
                        );
                    },
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    return (
        <section aria-labelledby="trends-heading" className="lg:col-span-2">
            <div style={{ width: "100%", height: "300px" }}>
                <h2 id="trends-heading">Mood and sleep trends</h2>
                <Bar options={options} data={data} />
            </div>
        </section>
    );
};

export default MoodSleepChart;
