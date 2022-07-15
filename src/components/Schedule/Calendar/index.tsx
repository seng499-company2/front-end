import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { Calendar as ReactBigCalendar, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import { AcademicWeek } from "@components/Schedule/Calendar/Week";
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
import Toolbar from "./Toolbar";
import WeekHeader from "./WeekHeader";
import TableFilter from "@components/Table/TableFilter";
import { ScheduleCourseEventChange } from "src/types/calendar";

const DnDCalendar = withDragAndDrop(ReactBigCalendar as any);

const Calendar = ({ schedule, semester }) => {
    const { events, setEvents } = useEvents(schedule, semester);
    const { min, max } = useCalendarRange();

    const toast = useToast({
        position: "bottom-left",
        duration: 5000,
        isClosable: true,
    });

    const onEventResize = (data: ScheduleCourseEventChange) => {
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

    const onEventDrop = (data: ScheduleCourseEventChange) => {
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
        <>
            {/* <TableFilter
                column={{ Header: "Course Code", filter: { type: "text" } }}
                onFilter={(_column, value) =>
                    filterEvents(
                        (event) => event.course.course.code.includes(value),
                        semester
                    )
                }
            /> */}
            <DnDCalendar
                events={events[semester]}
                onEventDrop={onEventDrop as any}
                onEventResize={onEventResize as any}
                onSelectEvent={onSelectEvent}
                localizer={localizer}
                eventPropGetter={eventPropGetter}
                defaultView={Views.WEEK}
                defaultDate={min}
                views={{ week: AcademicWeek, day: true }}
                min={min}
                max={max}
                step={10}
                resizable
                style={{ height: "80vh" }}
                components={{
                    event: CalendarEvent as any,
                    toolbar: Toolbar,
                    week: {
                        header: WeekHeader,
                    },
                }}
            />
        </>
    );
};

export default Calendar;
