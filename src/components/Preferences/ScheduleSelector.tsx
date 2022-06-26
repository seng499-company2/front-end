import React, { useState } from "react";
import ScheduleSelector from "react-schedule-selector";

const Timetable = (props) => {
    const { semester, values, setFieldValue, isDisabled } = props;
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const form_value = "preferredTime." + semester;
    const datetime_arr = [];

    values.forEach((element) => {
        let date = new Date();
        const day = first + element.day - 1;
        date.setDate(day);
        date.setHours(element.time, 0, 0);
        datetime_arr.push(date);
    });

    const [schedule, setSchedule] = useState(datetime_arr);

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
        if (!isDisabled) {
            const json_arr = [];
            newSchedule.forEach((element) => {
                const time = {
                    day: element.getDay(),
                    time: element.getHours(),
                };
                json_arr.push(time);
            });
            setSchedule(newSchedule);
            setFieldValue(form_value, json_arr);
        }
    }

    return (
        <ScheduleSelector
            selectedColor={selectedColorDict[semester]}
            unselectedColor={unselectedColorDict[semester]}
            hoveredColor={unselectedColorDict[semester]}
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
