import React, { useMemo } from "react";
import PropTypes from "prop-types";

import * as dates from "date-arithmetic";
import { Navigate } from "react-big-calendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid";

export function AcademicWeek({
    date,
    localizer,
    max = localizer.endOf(new Date(), "day"),
    min = localizer.startOf(new Date(), "day"),
    scrollToTime = localizer.startOf(new Date(), "day"),
    ...props
}) {
    const currRange = useMemo(
        () => AcademicWeek.range(date, { localizer }),
        [date, localizer]
    );

    return (
        <TimeGrid
            date={date}
            eventOffset={15}
            localizer={localizer}
            max={max}
            min={min}
            range={currRange}
            scrollToTime={scrollToTime}
            {...props}
        />
    );
}

AcademicWeek.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    localizer: PropTypes.object,
    max: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    scrollToTime: PropTypes.instanceOf(Date),
};

AcademicWeek.range = (date, { localizer }) => {
    const start = date;
    // startOf week is Sunday
    let startOfWeek = localizer.startOf(start, "week");
    // add 1 day to make it Monday
    startOfWeek = localizer.add(startOfWeek, 1, "day");

    const range = [];
    for (let i = 0; i < 5; i++) {
        range.push(dates.add(startOfWeek, i, "day"));
    }

    return range;
};

AcademicWeek.navigate = (date, action, { localizer }) => {
    switch (action) {
        case Navigate.PREVIOUS:
            return localizer.add(date, -3, "day");

        case Navigate.NEXT:
            return localizer.add(date, 3, "day");

        default:
            return date;
    }
};

AcademicWeek.title = (date) => {
    return `Week: ${date.toLocaleDateString()}`;
};
