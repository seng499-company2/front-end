import React, { useState } from "react";
import ScheduleSelector from "react-schedule-selector";

const Timetable = (props) => {
    const { semester, values, setFieldValue } = props;
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const formValue = "preferredTime." + semester;
    const datetimeArr = [];

    values.forEach((element) => {
        let date = new Date();
        const day = first + element.day - 1;
        date.setDate(day);
        date.setHours(element.time, 0, 0);
        datetimeArr.push(date);
    });

    const [schedule, setSchedule] = useState(datetimeArr);

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
        const jsonArr = [];
        newSchedule.forEach((element) => {
            const time = {
                day: element.getDay(),
                time: element.getHours(),
            };
            jsonArr.push(time);
        });
        setSchedule(newSchedule);
        setFieldValue(formValue, jsonArr);
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
