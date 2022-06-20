import React, { useMemo, useState } from "react";
import ScheduleSelector from "react-schedule-selector";

const Timetable = (props) => {
    const { color, semester, values, setFieldValue } = props;
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const form_value = "preferredTime." + semester;

    const arr = [];
    values.forEach((element) => {
        let date = new Date();
        const day = first + element.day - 1;
        date.setDate(day);
        date.setHours(element.time, 0, 0);
        arr.push(date);
    });

    const [schedule, setSchedule] = useState(arr);
    const [data, setData] = useState(values);

    const unselectedColorDict = {
        fall: "#a2c6f8",
        spring: "#FFB6C1",
        summer: "#FFD580",
    };
    const selectedColorDict = {
        fall: "#599af2",
        spring: "#FF69B4",
        summer: "#FFA500",
    };

    function handleChange(newSchedule) {
        const arr = [];
        newSchedule.forEach((element) => {
            const time = {
                day: element.getDay(),
                time: element.getHours(),
            };
            arr.push(time);
        });
        setSchedule(newSchedule);
        setData(arr);
        setFieldValue(form_value, arr);
    }

    return (
        <ScheduleSelector
            selectedColor={selectedColorDict[semester]}
            unselectedColor={unselectedColorDict[semester]}
            selection={schedule}
            numDays={5}
            minTime={8}
            maxTime={20}
            hourlyChunks={1}
            dateFormat={"dddd"}
            startDate={new Date(today.setDate(first))}
            onChange={handleChange}
        />
    );
};

export default Timetable;
