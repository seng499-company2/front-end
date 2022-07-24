import React, { useMemo } from "react";
import PropTypes from "prop-types";

import * as dates from "date-arithmetic";
import { Navigate } from "react-big-calendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid";

export function MyWeek({
    date,
    localizer,
    max = localizer.endOf(new Date(), "day"),
    min = localizer.startOf(new Date(), "day"),
    scrollToTime = localizer.startOf(new Date(), "day"),
    ...props
}) {
    const currRange = useMemo(
        () => MyWeek.range(date, { localizer }),
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

MyWeek.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    localizer: PropTypes.object,
    max: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    scrollToTime: PropTypes.instanceOf(Date),
};

MyWeek.range = (date, { localizer }) => {
    const start = date;
    // range is from start of current week to end of the week (Monday to Friday)
    // list of date objects

    let startOfWeek = localizer.startOf(start, "week");
    // add 1 day to start of week
    startOfWeek = localizer.add(startOfWeek, 1, "day");

    const range = [];
    for (let i = 0; i < 5; i++) {
        range.push(dates.add(startOfWeek, i, "day"));
    }
    // const end = dates.add(start, 3, "day");

    // let current = start;
    // const range = [];

    // while (localizer.lte(current, end, "day")) {
    //     range.push(current);
    //     current = localizer.add(current, 1, "day");
    // }

    return range;
};

MyWeek.navigate = (date, action, { localizer }) => {
    switch (action) {
        case Navigate.PREVIOUS:
            return localizer.add(date, -3, "day");

        case Navigate.NEXT:
            return localizer.add(date, 3, "day");

        default:
            return date;
    }
};

MyWeek.title = (date) => {
    return `Week: ${date.toLocaleDateString()}`;
};
