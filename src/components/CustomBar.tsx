"use client";

import Image from "next/image";
import { BarProps } from "recharts";

interface MoodData {
    mood: number;
    moodLabel: string;
    sleepLabel: string;
    feelings?: string[];
}

interface CustomBarProps extends BarProps {
    payload?: MoodData;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

const moodColors = {
    "2": "hsl(35, 100%, 74%)", // Very Happy - Amber
    "1": "hsl(115, 72%, 71%)", // Happy - Green
    "0": "hsl(207, 100%, 77%)", // Neutral - Blue
    "-1": "hsl(247, 100%, 85%)", // Sad - Purple
    "-2": "hsl(1, 100%, 80%)", // Very Sad - Red
};

const moodIcons = {
    "2": "/assets/images/icon-very-happy-white.svg",
    "1": "/assets/images/icon-happy-white.svg",
    "0": "/assets/images/icon-neutral-white.svg",
    "-1": "/assets/images/icon-sad-white.svg",
    "-2": "/assets/images/icon-very-sad-white.svg",
};

export const CustomBar = (props: CustomBarProps) => {
    const { payload, x = 0, y = 0, width = 0, height = 0 } = props;
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
                width={31}
                height={31}
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
