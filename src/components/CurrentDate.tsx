"use client";
import { useEffect, useState } from "react";

const CurrentDate = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    // Update date at midnight to keep it current
    useEffect(() => {
        const now = new Date();
        const msUntilMidnight =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() + 1
            ).getTime() - now.getTime();

        const timer = setTimeout(() => {
            setCurrentDate(new Date());
        }, msUntilMidnight);

        return () => clearTimeout(timer);
    }, [currentDate]);

    // Format date as "Wednesday, April 16th, 2025"
    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date
            .toLocaleDateString("en-US", options)
            .replace(/(\d+)(,)/, (_, day) => {
                let suffix = "th";
                if (day === "1") {
                    suffix = "st";
                } else if (day === "2") {
                    suffix = "nd";
                } else if (day === "3") {
                    suffix = "rd";
                }
                return `${day}${suffix},`;
            });
    };

    return (
        <time
            dateTime={currentDate.toISOString().split("T")[0]}
            className="current-date text-preset-6 text-accent-foreground"
        >
            {formatDate(currentDate)}
        </time>
    );
};
export default CurrentDate;
