import { useToast } from "@chakra-ui/react";
import { formatOnDropToast, formatOnResizeToast } from "@lib/calendar";
import { DAYS_OF_WEEK } from "@lib/constants";
import { convertRawToEventsSchedule } from "@lib/convert";
import { formatDateWeekday } from "@lib/format";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
    CalendarYearSchedule,
    EventCourse,
    RawSchedule,
    ScheduleEvent,
    Semester,
    RawTimeSlot,
    DayOfWeek,
} from "src/types/calendar";
import useCalendarFilter from "./useCalendarFilter";
import useSchedule from "./useSchedule";
import { useWeekStart } from "./useWeekStart";

function isDayOfWeek(day: string): day is DayOfWeek {
    return DAYS_OF_WEEK.includes(day as any);
}

function convertEventTimeToTimeSlot(start, end): RawTimeSlot {
    // convert start and end dates to time slots e.g. {dayOfWeek: "MONDAY", timeRange: ["08:00 - 09:15"] }
    const startTime = `${start.getHours()}:${start.getMinutes()}`;
    const endTime = `${end.getHours()}:${end.getMinutes()}`;
    const dayOfWeek = formatDateWeekday(start).toUpperCase();

    if (!isDayOfWeek(dayOfWeek)) return null;

    return {
        dayOfWeek: dayOfWeek,
        timeRange: [startTime, endTime],
    };
}

export const useEvents = (rawSchedule: RawSchedule, semester: Semester) => {
    const { weekStart } = useWeekStart();
    const { rescheduleSection } = useSchedule();

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
    const convertInitialEvents = useCallback(convertRawToEventsSchedule, [
        rawSchedule,
        semester,
        weekStartFuture,
    ]);

    // const dataRef = useRef(
    //     convertInitialEvents(rawSchedule, semester, weekStartFuture)
    // );

    const [events, setEvents] = useState<CalendarYearSchedule>(
        convertInitialEvents(rawSchedule, semester, weekStartFuture)
    ); // dataRef.current);

    useEffect(() => {
        const initEvents = convertInitialEvents(
            rawSchedule,
            semester,
            weekStartFuture
        );
        setEvents(initEvents);
        //dataRef.current = initEvents;
    }, [convertInitialEvents, rawSchedule, semester, weekStartFuture]);

    const moveEvent = useCallback(
        (id, newStart, newEnd, semester, toastData) => {
            const { type, code, section } = toastData;
            let course: EventCourse;
            let sectionId: number;
            let oldTimeSlots: RawTimeSlot[] = [];
            let newTimeSlots: RawTimeSlot[] = [];

            setEvents((prevEvents) => {
                const newEvents = {
                    ...events,
                    [semester]: events[semester].map((event: ScheduleEvent) => {
                        if (
                            event.details.course.code === toastData.code &&
                            event.details.section.id === toastData.section.id
                        ) {
                            oldTimeSlots.push(
                                convertEventTimeToTimeSlot(
                                    event.start,
                                    event.end
                                )
                            );
                            if (event.id === id) {
                                console.log(event.id, id);
                                course = event.details.course;
                                sectionId = event.details.section.id;
                                newTimeSlots.push(
                                    convertEventTimeToTimeSlot(newStart, newEnd)
                                );
                                // update start and end times
                                return {
                                    ...event,
                                    start: newStart,
                                    end: newEnd,
                                };
                            } else {
                                newTimeSlots.push(
                                    convertEventTimeToTimeSlot(
                                        event.start,
                                        event.end
                                    )
                                );
                            }
                        }

                        return event;
                    }),
                };

                console.log({ course, sectionId, newTimeSlots });

                if (course) {
                    rescheduleSection(
                        {
                            courseCode: course.code,
                            courseSectionId: sectionId,
                            timeSlots: {
                                oldTimeSlots,
                                newTimeSlots,
                            },
                        },
                        semester
                    );
                }

                // dataRef.current = newEvents;
                // localStorage.setItem(
                //     "schedule",
                //     JSON.stringify(convertEventsToRaw(newEvents))
                // );

                return newEvents;
            });
            if (type === "drop") {
                toast(
                    formatOnDropToast({
                        code,
                        section: section.display,
                        newStart,
                        newEnd,
                    })
                );
            } else {
                toast(
                    formatOnResizeToast({
                        code,
                        section: section.display,
                        newStart,
                        newEnd,
                    })
                );
            }
        },
        [events, rescheduleSection, toast]
    );

    const { filteredData, onFilterChange } = useCalendarFilter(events); // dataRef.current);

    return { events: filteredData, moveEvent, onFilterChange };
};
