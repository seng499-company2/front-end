import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { Calendar as ReactBigCalendar, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import { AcademicWeek } from "@components/Schedule/Calendar/AcademicWeek";
import { generateColorHex } from "@lib/color";
import {
    formatOnDropToast,
    formatOnResizeToast,
    initLocalizer,
    moveEvent,
} from "@lib/calendar";
import CalendarEvent from "./CalendarEvent";
import { useEvents } from "@hooks/useEvents";
import { useCalendarRange } from "@hooks/useCalendarRange";

const DnDCalendar = withDragAndDrop(ReactBigCalendar as any);

const Calendar = ({ schedule, semester }) => {
    const { events, setEvents } = useEvents(schedule, semester);
    const { min, max } = useCalendarRange();

    const toast = useToast({
        position: "bottom-left",
        duration: 5000,
        isClosable: true,
    });

    const onEventResize = (data) => {
        const {
            start: newStart,
            end: newEnd,
            event: { id, title, section },
        } = data;

        // TODO update event in backend

        // update event in state
        setEvents(moveEvent(id, newStart, newEnd, semester));
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
        setEvents(moveEvent(id, newStart, newEnd, semester));
        toast(formatOnDropToast({ title, section, newStart, newEnd }));
    };

    const eventPropGetter = useCallback((event, _start, _end, _isSelected) => {
        return {
            style: {
                backgroundColor: generateColorHex(event.course?.course?.code),
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

    return (
        <DnDCalendar
            events={events[semester]}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            onSelectEvent={onSelectEvent}
            localizer={localizer}
            eventPropGetter={eventPropGetter}
            defaultView={Views.WEEK}
            views={{ week: AcademicWeek, day: true }}
            min={min}
            max={max}
            step={10}
            resizable
            style={{ height: "80vh" }}
            components={{
                event: CalendarEvent as any,
            }}
        />
    );
};

export default Calendar;
