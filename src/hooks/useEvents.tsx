import { convertToEvents, Schedule } from "@lib/convert";
import { useEffect, useMemo, useState } from "react";
import { useWeekStart } from "./useWeekStart";

export const useEvents = (rawSchedule, semester) => {
    let { weekStart } = useWeekStart();
    // add 7 days to weekStart
    // OR figure out how to disable current day styling on table
    weekStart = new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + 7
    );

    const initialEvents = useMemo(() => {
        return convertToEvents(rawSchedule, semester, weekStart);
    }, [rawSchedule, semester, weekStart]);

    const [events, setEvents] = useState<Schedule>(initialEvents);

    useEffect(() => {
        setEvents(initialEvents);
    }, [initialEvents]);

    return { events, setEvents };
};
