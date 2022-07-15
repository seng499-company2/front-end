import { convertToEvents, Schedule } from "@lib/convert";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWeekStart } from "./useWeekStart";

export const useEvents = (rawSchedule, semester) => {
    let { weekStart } = useWeekStart();
    // add 7 days to weekStart
    // OR figure out how to disable current day styling on table
    const weekStartFuture = useMemo(
        () =>
            new Date(
                weekStart.getFullYear(),
                weekStart.getMonth(),
                weekStart.getDate() + 7
            ),
        [weekStart]
    );

    const convertInitialEvents = useCallback(convertToEvents, [
        rawSchedule,
        semester,
        weekStartFuture,
    ]);

    const [events, setEvents] = useState<Schedule>({
        fall: [],
        spring: [],
        summer: [],
    });

    useEffect(() => {
        setEvents(convertInitialEvents(rawSchedule, semester, weekStartFuture));
    }, [convertInitialEvents, rawSchedule, semester, weekStartFuture]);

    // const filterEvents = useCallback((filterFunc, semester) => {
    //     setEvents((prevEvents) => {
    //         return prevEvents[semester].filter(filterFunc);
    //     });
    // }, []);

    return { events, setEvents }; //, filterEvents };
};
