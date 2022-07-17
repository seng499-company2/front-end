import { dateFnsLocalizer } from "react-big-calendar";

import format from "date-fns/format";
import enUS from "date-fns/locale/en-US";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";

import { ScheduledCourseEvent } from "src/types/calendar";

const locales = {
    "en-US": enUS,
};

export const initLocalizer = () => {
    return dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });
};

export const formatOnDropToast = ({
    code,
    section,
    newStart,
    newEnd,
}): any => ({
    title: `${code} - ${section}`,
    description: `Rescheduled to ${format(newStart, "EEEE h:mm a")} - ${format(
        newEnd,
        "h:mm a"
    )}`,
    status: "success",
});

export const formatOnResizeToast = ({
    code,
    section,
    newStart,
    newEnd,
}): any => ({
    title: `${code} - ${section}`,
    description: `Rescheduled to ${format(newStart, "h:mm a")} - ${format(
        newEnd,
        "h:mm a"
    )}`,
    status: "success",
});

export interface CalendarRangeOptions {
    minHour?: number;
    maxHour?: number;
    minMinute?: number;
    maxMinute?: number;
}

export const generateCalendarRange = (
    date: Date,
    opts?: CalendarRangeOptions
) => {
    // min and max are the start and end times of the day
    // min should be 8:00am and max should be 8:00pm by default

    const { minHour, maxHour, minMinute, maxMinute } = opts || {};

    const min = new Date(date.getTime());
    min.setHours(minHour ?? 8);
    min.setMinutes(minMinute ?? 0);
    const max = new Date(date.getTime());
    max.setHours(maxHour ?? 20);
    max.setMinutes(maxMinute ?? 0);

    return { min, max };
};

const moveEvent = (
    id: string | number,
    newStart: Date,
    newEnd: Date,
    semester: "fall" | "spring" | "summer"
) => {
    // find event by id in semester
    return (prevEvents) => {
        return {
            ...prevEvents,
            [semester]: prevEvents[semester].map(
                (event: ScheduledCourseEvent) => {
                    if (event.id === id) {
                        // update start and end times
                        return { ...event, start: newStart, end: newEnd };
                    }
                    return event;
                }
            ),
        };
    };
};
