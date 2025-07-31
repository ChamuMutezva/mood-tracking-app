"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Cell,
    ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import Image from "next/image";
import type { ChartData } from "@/lib/types";

interface MoodSleepChartProps {
    data: ChartData[];
}

const MoodSleepChart = ({ data }: MoodSleepChartProps) => {
    // Mood colors mapping
    const moodColors = {
        "2": "hsl(35, 100%, 74%)", // Very Happy - Amber
        "1": "hsl(115, 72%, 71%)", // Happy - Green
        "0": "hsl(207, 100%, 77%)", // Neutral - Blue
        "-1": "hsl(247, 100%, 85%)", // Sad - Purple
        "-2": "hsl(1, 100%, 80%)", // Very Sad - Red
    };

    // Mood icons mapping to SVG files
    const moodIcons = {
        "2": "/assets/images/icon-very-happy-white.svg",
        "1": "/assets/images/icon-happy-white.svg",
        "0": "/assets/images/icon-neutral-white.svg",
        "-1": "/assets/images/icon-sad-white.svg",
        "-2": "/assets/images/icon-very-sad-white.svg",
    };

    // Sleep labels for Y-axis
    const sleepLabels = {
        1: "0-2h",
        2: "3-4h",
        3: "5-6h",
        4: "7-8h",
        5: "9+h",
    };

    // Custom bar component with mood icons
    const CustomBar = (props: any) => {
        const { payload, x, y, width, height } = props;
        if (!payload) return null;

        const moodValue = payload.mood.toString();
        const color = moodColors[moodValue as keyof typeof moodColors];
        const iconSrc = moodIcons[moodValue as keyof typeof moodIcons];

        return (
            <g>
                {/* Bar */}
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={color}
                    rx={20}
                    ry={20}
                />
                {/* Mood Icon */}
                <foreignObject
                    x={x + width / 2 - 15}
                    y={y + 5}
                    width={30}
                    height={30}
                >
                    <Image
                        src={iconSrc || "/placeholder.svg"}
                        alt={`Mood: ${payload.moodLabel}`}
                        width={30}
                        height={30}
                        className="drop-shadow-sm"
                    />
                </foreignObject>
            </g>
        );
    };

    if (!data || data.length === 0) {
        return (
            <section className="lg:col-span-2 bg-primary rounded-[var(--radius-16)] px-[var(--spacing-200)] py-[var(--spacing-250)]">
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
        <section className="lg:col-span-2 bg-primary rounded-[var(--radius-16)] px-[var(--spacing-200)] py-[var(--spacing-250)] min-w-0">
            <div className="w-full">
                <h2 className="text-preset-4 text-foreground mb-4">
                    Mood and sleep trends
                </h2>
                <div className="overflow-x-auto">
                <div className="w-full min-w-96">
                    <ChartContainer
                        config={{
                            sleep: {
                                label: "Sleep Hours",
                                color: "hsl(var(--chart-1))",
                            },
                        }}
                        className="min-h-[300px] w-full"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                accessibilityLayer
                                data={data}
                                margin={{
                                    top: 50,
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
                                        if (
                                            active &&
                                            payload &&
                                            payload.length
                                        ) {
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
                                                        Mood: {data.moodLabel}
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
                                <Bar
                                    dataKey="sleep"
                                    shape={<CustomBar />}
                                    radius={[20, 20, 20, 20]}
                                    barSize={40}
                                >
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
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
                </div>
            </div>
        </section>
    );
};

export default MoodSleepChart;
