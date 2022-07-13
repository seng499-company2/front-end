import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { Calendar as ReactBigCalendar, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import { AcademicWeek } from "@components/Schedule/Calendar/AcademicWeek";
import { generateColorHex } from "@lib/color";
import {
    formatOnDropToast,
    formatOnResizeToast,
    generateCalendarRange,
    initLocalizer,
    moveEvent,
} from "@lib/calendar";
import CalendarEvent, { ScheduledCourse } from "./CalendarEvent";
import TimeSlotWrapper from "./TimeSlotWrapper";

const DnDCalendar = withDragAndDrop(ReactBigCalendar as any);

const Calendar = ({ scheduledCourses }) => {
    const toast = useToast({
        position: "bottom-left",
        duration: 5000,
        isClosable: true,
    });

    const now = new Date();
    const [events, setEvents] = useState<ScheduledCourse[]>(mockEvents);

    const onEventResize = (data) => {
        const {
            start: newStart,
            end: newEnd,
            event: { id, title, section },
        } = data;

        // TODO update event in backend

        // update event in state
        setEvents(moveEvent(id, newStart, newEnd));
        toast(formatOnResizeToast({ title, section, newStart, newEnd }));
    };

    const onEventDrop = (data) => {
        const {
            start: newStart,
            end: newEnd,
            event: { title, section, id },
        } = data;

        // TODO update event in backend

        // update event in state
        setEvents(moveEvent(id, newStart, newEnd));
        toast(formatOnDropToast({ title, section, newStart, newEnd }));
    };

    const eventPropGetter = useCallback((event, _start, _end, _isSelected) => {
        return {
            style: {
                backgroundColor: generateColorHex(event.course?.code),
                borderRadius: "10px",
                color: "white",
                border: "none",
            },
        };
    }, []);

    const onSelectEvent = (event) => {
        console.log("selected", event);
    };

    const localizer = initLocalizer();
    const { min, max } = generateCalendarRange(now);

    return (
        <DnDCalendar
            events={events}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            onSelectEvent={onSelectEvent}
            localizer={localizer}
            eventPropGetter={eventPropGetter}
            //defaultDate={defaultDate} // Year start? Term start?
            defaultView={Views.WEEK}
            views={{ week: AcademicWeek, day: true }}
            min={min}
            max={max}
            step={10}
            resizable
            style={{ height: "80vh" }}
            components={{
                event: CalendarEvent,
            }}
        />
    );
};

export default Calendar;

const mockEvents = [
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        course: {
            code: "CSC111",
            title: "Fundamentals of Programming with Engineering Applications",
        },
        section: "A01",
        professor: "Kui Wu",
        time: {
            "08:30 - 09:20": [2, 3, 5],
        },
        capacity: 249,
        id: "CSC225-A01",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        course: {
            code: "CSC111",
            title: "Fundamentals of Programming with Engineering Applications",
        },
        section: "A02",
        professor: "Kui Wu",
        time: {
            "08:30 - 09:20": [2, 3, 5],
        },
        capacity: 249,
        id: "CSC225-A02",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        course: {
            code: "CSC225",
            title: "Programming with C++",
        },
        section: "A01",
        professor: "Kui Wu",
        time: {
            "08:30 - 09:20": [2, 3, 5],
        },
        capacity: 249,
        id: "CSC226-A01",
    },
];
