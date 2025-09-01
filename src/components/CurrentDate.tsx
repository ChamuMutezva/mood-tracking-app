"use client";
import { useEffect, useState } from "react";
import { format, addDays, startOfDay } from "date-fns";

const CurrentDate = () => {
    const [currentDate, setCurrentDate] = useState<Date | null>(null);

    useEffect(() => {
        // Set initial date to now
        const now = new Date();
        setCurrentDate(now);
        
        const nextDay = addDays(now , 1)
        const midnight = startOfDay(nextDay);
        const msUntilMidnight = midnight.getTime() - now.getTime();        

        const timer = setTimeout(() => {
            setCurrentDate(new Date());
        }, msUntilMidnight);

        return () => clearTimeout(timer);
    }, []);

    // Use date-fns's format function to handle the formatting, including the ordinal suffix.
    // The 'do' format token automatically adds the correct ordinal suffix.
    const formattedDate = format(currentDate ?? new Date(), "EEEE, MMMM do, yyyy");

    if (!currentDate) {
        return (
            <time className="current-date text-preset-6 text-accent-foreground">
                Loading...
            </time>
        );
    }

    return (
        <time
            dateTime={currentDate.toISOString().split("T")[0]}
            className="current-date text-preset-6 text-accent-foreground"
        >
            {formattedDate}
        </time>
    );
};
export default CurrentDate;
