import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallback } from "react";
import { Calendar as ReactBigCalendar, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import { AcademicWeek } from "@components/Schedule/Calendar/Week";
import { generateColorHex } from "@lib/color";
import { initLocalizer } from "@lib/calendar";
import CalendarEvent from "./CalendarEvent";
import { useEvents } from "@hooks/useEvents";
import { useCalendarRange } from "@hooks/useCalendarRange";
import Toolbar from "./Toolbar";
import WeekHeader from "./WeekHeader";
import { ScheduleCourseEventChange } from "src/types/calendar";

function withEventFilter(Component, onFilter) {
    return function EventFilter(props) {
        return (
            <Component
                {...{
                    onFilter,
                }}
                {...props}
            />
        );
    };
}

const DnDCalendar = withDragAndDrop(ReactBigCalendar as any);

const Calendar = ({ schedule, semester }) => {
    const { events, moveEvent, onFilterChange } = useEvents(schedule, semester);
    const { min, max } = useCalendarRange();

    const onEventResize = (data: ScheduleCourseEventChange) => {
        const {
            start: newStart,
            end: newEnd,
            event: { id },
        } = data;

        // update event in state
        moveEvent(id, newStart, newEnd, semester, "resize");
    };

    const onEventDrop = (data: ScheduleCourseEventChange) => {
        const {
            start: newStart,
            end: newEnd,
            event: { id },
        } = data;

        // update event in state
        moveEvent(id, newStart, newEnd, semester, "drop");
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
                style={{ height: "81vh" }}
                components={{
                    event: CalendarEvent as any,
                    toolbar: withEventFilter(Toolbar, onFilterChange),
                    week: {
                        header: WeekHeader,
                    },
                }}
            />
        </>
    );
};

export default Calendar;
