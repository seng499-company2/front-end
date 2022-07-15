import { convertToEvents } from "@lib/convert";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Schedule,
    ScheduledCourse,
    ScheduledCourseEvent,
    Semester,
} from "src/types/calendar";
import { useWeekStart } from "./useWeekStart";

export const useEvents = (
    rawSchedule: ScheduledCourse[],
    semester: Semester
) => {
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

    const [filteredEvents, setFilteredEvents] = useState<Schedule>({
        fall: [],
        spring: [],
        summer: [],
    });

    useEffect(() => {
        const allEvents = convertInitialEvents(
            rawSchedule,
            semester,
            weekStartFuture
        );
        setEvents(allEvents);
        setFilteredEvents(allEvents);
    }, [convertInitialEvents, rawSchedule, semester, weekStartFuture]);

    // TODO fix this broken filter logic
    // cant combine filters
    const filterEvents = useCallback(
        (column, value) => {
            if (column.id === "course") {
                const newEvents = {
                    ...events,
                    [semester]: events[semester].filter(
                        (event: ScheduledCourseEvent) => {
                            return event.course.course.code
                                .toLowerCase()
                                .includes(value);
                        }
                    ),
                };
                setFilteredEvents(newEvents);
            } else if (column.id === "professor") {
                const newEvents = {
                    ...events,
                    [semester]: events[semester].filter(
                        (event: ScheduledCourseEvent) => {
                            return event.course.section.professor.name
                                .toLowerCase()
                                .includes(value);
                        }
                    ),
                };
                setFilteredEvents(newEvents);
            }
        },
        [events, semester]
    );

    return { events: filteredEvents, setEvents, filterEvents };
};
