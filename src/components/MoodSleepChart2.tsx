"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import type { ChartData } from "@/lib/types";

interface MoodSleepChartProps {
    data: ChartData[];
}

const MoodSleepChart2 = ({ data }: MoodSleepChartProps) => {
    // Mood colors mapping
    const moodColors = {
        "2": "hsl(35, 100%, 74%)", // Very Happy - Amber
        "1": "hsl(115, 72%, 71%)", // Happy - Green
        "0": "hsl(207, 100%, 77%)", // Neutral - Blue
        "-1": "hsl(247, 100%, 85%)", // Sad - Purple
        "-2": "hsl(1, 100%, 80%)", // Very Sad - Red
    };

    // Mood icons mapping
    const moodIcons = {
        "2": "😄", // Very Happy
        "1": "😊", // Happy
        "0": "😐", // Neutral
        "-1": "😢", // Sad
        "-2": "😭", // Very Sad
    };

    // Sleep labels for Y-axis
    const sleepLabels = {
        1: "0-2h",
        2: "3-4h",
        3: "5-6h",
        4: "7-8h",
        5: "9+h",
    };

    if (!data || data.length === 0) {
        return (
            <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-preset-4 text-foreground mb-4">
                    Mood and sleep trends
                </h2>
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <p>
                        No mood data available. Start tracking to see your
                        trends!
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-full">
                <h2 className="text-preset-4 text-foreground mb-4">
                    Mood and sleep trends
                </h2>
                <div className="w-full overflow-x-auto">
                    <ChartContainer
                        config={{
                            sleep: {
                                label: "Sleep Hours",
                                color: "hsl(var(--chart-1))",
                            },
                        }}
                        className="min-h-[300px] w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={data}
                            margin={{
                                top: 40,
                                right: 20,
                                left: 20,
                                bottom: 20,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="var(--foreground)"
                            />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fontSize: 12,
                                    fill: "hsl(var(--foreground))",
                                }}
                            />
                            <YAxis
                                domain={[0, 6]}
                                ticks={[1, 2, 3, 4, 5]}
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fontSize: 12,
                                    fill: "hsl(var(--foreground))",
                                }}
                                tickFormatter={(value) =>
                                    sleepLabels[
                                        value as keyof typeof sleepLabels
                                    ] || ""
                                }
                            />
                            <ChartTooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                                                <p className="font-medium text-foreground">
                                                    {label}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Sleep: {data.sleepLabel}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Mood: {data.moodLabel}{" "}
                                                    {
                                                        moodIcons[
                                                            data.mood.toString() as keyof typeof moodIcons
                                                        ]
                                                    }
                                                </p>
                                                {data.feelings &&
                                                    data.feelings.length >
                                                        0 && (
                                                        <p className="text-sm text-muted-foreground">
                                                            Feelings:{" "}
                                                            {data.feelings.join(
                                                                ", "
                                                            )}
                                                        </p>
                                                    )}
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="sleep" radius={[40, 40, 40, 40]} barSize={40}>
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            moodColors[
                                                entry.mood.toString() as keyof typeof moodColors
                                            ]
                                        }
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </div>
            </div>
        </section>
    );
};

export default MoodSleepChart2;
