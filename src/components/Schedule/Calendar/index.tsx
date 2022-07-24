import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { Calendar as ReactBigCalendar, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import { MyWeek } from "@components/Schedule/Calendar/MyWeek";
import { generateColorHex } from "@lib/color";
import {
    formatOnDropToast,
    formatOnResizeToast,
    generateCalendarRange,
    initLocalizer,
    moveEvent,
} from "@lib/calendar";

const DnDCalendar = withDragAndDrop(ReactBigCalendar);

interface CalendarEvent {
    start: Date;
    end: Date;
    title: string;
    section: string;
    id: string;
}

const Calendar = ({ scheduledCourses }) => {
    const toast = useToast({
        position: "bottom-left",
        duration: 5000,
        isClosable: true,
    });

    const now = new Date();
    const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);

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
                backgroundColor: generateColorHex(event.title),
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
            //defaultDate={defaultDate}
            defaultView={Views.WEEK}
            views={{ week: MyWeek, day: true }}
            min={min}
            max={max}
            step={10}
            resizable
            style={{ height: "80vh" }}
        />
    );
};

export default Calendar;

const mockEvents = [
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "CSC 225",
        section: "A01",
        id: "CSC225-A01",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "CSC 225",
        section: "A02",
        id: "CSC225-A02",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "CSC 226",
        section: "A01",
        id: "CSC226-A01",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "CSC 227",
        section: "A01",
        id: "CSC227-A01",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "CSC 227",
        section: "A02",
        id: "CSC227-A02",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "SENG 321",
        section: "A01",
        id: "SENG321-A01",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "SENG 321",
        section: "A02",
        id: "SENG321-A02",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "CSC 471",
        section: "A01",
        id: "CSC471-A01",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "CSC 471",
        section: "A02",
        id: "CSC471-A02",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "SENG 460",
        section: "A01",
        id: "SENG460-A01",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "SENG 460",
        section: "A02",
        id: "SENG460-A02",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 110",
        section: "A01",
        id: "ENGR110-A01",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 110",
        section: "A02",
        id: "ENGR110-A02",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 111",
        section: "A01",
        id: "ENGR111-A01",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 111",
        section: "A02",
        id: "ENGR111-A02",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 112",
        section: "A01",
        id: "ENGR112-A01",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 112",
        section: "A02",
        id: "ENGR112-A02",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 113",
        section: "A01",
        id: "ENGR113-A01",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 113",
        section: "A02",
        id: "ENGR113-A02",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 114",
        section: "A01",
        id: "ENGR114-A01",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 114",
        section: "A02",
        id: "ENGR114-A02",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 115",
        section: "A01",
        id: "ENGR115-A01",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 115",
        section: "A02",
        id: "ENGR115-A02",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 116",
        section: "A01",
        id: "ENGR116-A01",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 116",
        section: "A02",
        id: "ENGR116-A02",
    },
    {
        start: new Date("2022-07-12T15:30:00.000Z"),
        end: new Date("2022-07-12T16:20:00.000Z"),
        title: "ENGR 117",
        section: "A01",
        id: "ENGR117-A01",
    },
];
