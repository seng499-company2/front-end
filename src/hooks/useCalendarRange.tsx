import { CalendarRangeOptions, generateCalendarRange } from "@lib/calendar";
import { useMemo } from "react";
import { useWeekStart } from "./useWeekStart";

export const useCalendarRange = (
    inputNow?: Date,
    opts?: CalendarRangeOptions
) => {
    const { now } = useWeekStart();
    // add 1 week to now
    // OR figure out how to disable current day styling on table
    const start = useMemo(() => {
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
    }, [now]);
    return generateCalendarRange(start, opts);
};
