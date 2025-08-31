"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { CustomBar } from "./CustomBar";
import type { ChartData } from "@/lib/types";
import { sleepLabels } from "@/lib/sleep-config";
import Image from "next/image";

interface MoodSleepChartProps {
    data: ChartData[];
}

interface TooltipProps {
    active?: boolean;
    payload?: Array<{
        payload: ChartData;
        value: number;
        dataKey: string;
    }>;
    label?: string;
}

// Custom tooltip content component
const TooltipContent = ({ active, payload, label }: TooltipProps) => {
    if (active && payload?.length) {
        const data = payload[0].payload;
        const moodIcons = {
            "-2": "/assets/images/icon-very-sad-color.svg",
            "-1": "/assets/images/icon-sad-color.svg",
            "0": "/assets/images/icon-neutral-color.svg",
            "1": "/assets/images/icon-happy-color.svg",
            "2": "/assets/images/icon-very-happy-color.svg",
        } as const;

        type MoodKey = keyof typeof moodIcons;

        function getMoodIcon(mood: number): string {
            const key = String(mood) as MoodKey;
            return moodIcons[key] ?? "/assets/images/icon-neutral-color.svg";
        }

        const iconSrc = getMoodIcon(data.mood);

        return (
            <div className="bg-background border border-border flex flex-col gap-4 rounded-[var(--radius-10)] p-3 shadow-lg max-w-44">
                <p className="font-medium text-foreground">{label}</p>
                <div className="flex flex-col gap-1">
                    <h3 className="text-preset-8">Mood:</h3>
                    <div className="flex justify-start items-center gap-2">
                        <Image
                            src={iconSrc}
                            alt="Mood icon"
                            width={16}
                            height={16}
                        />
                        <p className="text-muted-foreground text-preset-7">
                            {data.moodLabel}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-preset-8">Sleep:</h3>
                    <p className="text-muted-foreground text-preset-8">
                        {data.sleepLabel}
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-preset-8">Reflections:</h3>
                    <p className="text-muted-foreground text-preset-9">
                        {data.journal_entry}
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-preset-8"> Feelings:</h3>
                    {data.feelings && data.feelings.length > 0 && (
                        <p className="text-preset-9 text-muted-foreground">
                            {data.feelings.join(", ")}
                        </p>
                    )}
                </div>
            </div>
        );
    }
    return null;
};

// Y-axis tick props interface
interface YAxisTickProps {
    x?: number;
    y?: number;
    payload?: {
        value: number;
        coordinate: number;
        tickCoord: number;
        isShow: boolean;
        offset: number;
    };
}

// Custom Y-axis tick component with sleep icons
const CustomYAxisTick = (props: YAxisTickProps) => {
    const { x, y, payload } = props;

    // Safety check for payload
    if (payload?.value === undefined) {
        return null;
    }

    const label = sleepLabels[payload.value as keyof typeof sleepLabels];

    if (!label) return null;

    return (
        <g transform={`translate(${x},${y})`}>
            {/* Sleep icon (zzz) */}
            <text
                x={-60}
                y={2}
                textAnchor="middle"
                fill="hsl(var(--muted-foreground))"
                fontSize="16"
                dominantBaseline="middle"
            >
                💤
            </text>
            {/* Sleep label */}
            <text
                x={-50}
                y={0}
                textAnchor="start"
                fill="hsl(var(--foreground))"
                fontSize="12"
                dominantBaseline="middle"
            >
                {label.replace("h", " hours")}
            </text>
        </g>
    );
};

const MoodSleepChart = ({ data }: MoodSleepChartProps) => {
    // Mood colors mapping
    const moodColors = {
        "2": "hsl(35, 100%, 74%)", // Very Happy - Amber
        "1": "hsl(115, 72%, 71%)", // Happy - Green
        "0": "hsl(207, 100%, 77%)", // Neutral - Blue
        "-1": "hsl(247, 100%, 85%)", // Sad - Purple
        "-2": "hsl(1, 100%, 80%)", // Very Sad - Red
    };

    // Sleep labels for Y-axis
    // Generate empty data for last 5 days if no data
    const generateEmptyData = () => {
        const emptyData = [];
        const today = new Date();

        for (let i = 10; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            emptyData.push({
                id: i,
                date: date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                }),
                sleep: 0,
                mood: 0,
                moodLabel: "",
                sleepLabel: "",
                feelings: [],
            });
        }
        return emptyData;
    };

    const chartData = !data || data.length === 0 ? generateEmptyData() : data;
    const hasData = data && data.length > 0;
//    console.log("Chart Data:", chartData);

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
                            className="min-h-[300px] "
                        >
                            <BarChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    top: 50,
                                    right: 20,
                                    left: 20,
                                    bottom: 20,
                                }}
                            >
                                <CartesianGrid
                                   // strokeDasharray="3 3"
                                    stroke="var(--muted)"
                                    vertical={false}
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
                                    tick={<CustomYAxisTick />}
                                />
                                {hasData && (
                                    <ChartTooltip
                                        content={<TooltipContent />}
                                    />
                                )}
                                {hasData && (
                                    <Bar
                                        dataKey="sleep"
                                        shape={<CustomBar dataKey={""} />}
                                        radius={[20, 20, 20, 20]}
                                        barSize={40}
                                        className="hover:cursor-pointer"
                                    >
                                        {chartData.map((entry) => (
                                            <Cell
                                                key={`cell-${entry.id}`}
                                                fill={
                                                    moodColors[
                                                        entry.mood.toString() as keyof typeof moodColors
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Bar>
                                )}
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MoodSleepChart;
