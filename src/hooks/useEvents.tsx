import { convertToEvents, Schedule } from "@lib/convert";
import { useEffect, useMemo, useState } from "react";
import { useWeekStart } from "./useWeekStart";

export const useEvents = (rawSchedule, semester) => {
    const { weekStart } = useWeekStart();
    const initialEvents = useMemo(() => {
        return convertToEvents(rawSchedule, semester, weekStart);
    }, [rawSchedule, semester, weekStart]);

    const [events, setEvents] = useState<Schedule>(initialEvents);

    useEffect(() => {
        setEvents(initialEvents);
    }, [initialEvents]);

    return { events, setEvents };
};
