import { useToast } from "@chakra-ui/react";
import { formatOnDropToast, formatOnResizeToast } from "@lib/calendar";
import { convertToEvents } from "@lib/convert";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
    Schedule,
    ScheduledCourse,
    ScheduledCourseEvent,
    Semester,
} from "src/types/calendar";
import useCalendarFilter from "./useCalendarFilter";
import { useWeekStart } from "./useWeekStart";

export const useEvents = (
    rawSchedule: ScheduledCourse[],
    semester: Semester
) => {
    const { weekStart } = useWeekStart();
    const rawToast = useToast({
        position: "bottom-left",
        duration: 5000,
        isClosable: true,
    });
    const toast = useCallback(
        (message) => {
            rawToast(message);
        },
        [rawToast]
    );
    // add 7 days to weekStart  OR figure out how to disable current day styling on table
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

    const dataRef = useRef(
        convertInitialEvents(rawSchedule, semester, weekStartFuture)
    );

    const [events, setEvents] = useState<Schedule>(dataRef.current);

    useEffect(() => {
        const initEvents = convertInitialEvents(
            rawSchedule,
            semester,
            weekStartFuture
        );
        setEvents(initEvents);
        dataRef.current = initEvents;
    }, [convertInitialEvents, rawSchedule, semester, weekStartFuture]);

    const moveEvent = useCallback(
        (id, newStart, newEnd, semester, toastData) => {
            const { type, code, section } = toastData;

            setEvents((prevEvents) => {
                const newEvents = {
                    ...prevEvents,
                    [semester]: prevEvents[semester].map(
                        (event: ScheduledCourseEvent) => {
                            if (event.id === id) {
                                // update start and end times
                                return {
                                    ...event,
                                    start: newStart,
                                    end: newEnd,
                                };
                            }
                            return event;
                        }
                    ),
                };

                dataRef.current = newEvents;
                localStorage.setItem("schedule", JSON.stringify(newEvents));

                return newEvents;
            });
            if (type === "drop") {
                toast(formatOnDropToast({ code, section, newStart, newEnd }));
            } else {
                toast(formatOnResizeToast({ code, section, newStart, newEnd }));
            }
        },
        [toast]
    );

    const { filteredData, onFilterChange } = useCalendarFilter(dataRef.current);

    return { events: filteredData, moveEvent, onFilterChange };
};
