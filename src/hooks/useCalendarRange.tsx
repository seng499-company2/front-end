import { CalendarRangeOptions, generateCalendarRange } from "@lib/calendar";
import { useMemo, useRef } from "react";
import { useWeekStart } from "./useWeekStart";

export const useCalendarRange = (
    inputNow?: Date,
    opts?: CalendarRangeOptions
) => {
    const { weekStart } = useWeekStart(inputNow);

    // add 1 week to now
    // OR figure out how to disable current day styling on table
    const start = useMemo(() => {
        return new Date(
            weekStart.getFullYear(),
            weekStart.getMonth(),
            weekStart.getDate() + 7
        );
    }, [weekStart]);

    const range = generateCalendarRange(start, opts);
    const rangeRef = useRef(range);

    return { min: rangeRef.current.min, max: rangeRef.current.max };
};
