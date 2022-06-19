import React, { useMemo, useState } from "react";
import ScheduleSelector from "react-schedule-selector";

const Timetable = (props) => {
    const { color, semester, values, setFieldValue } = props;
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;

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
        Blue: "rgba(162, 198, 248, 1)",
        Orange: "rgba(255, 165, 0)",
        Pink: "rgba(255, 182, 193)",
    };
    const selectedColorDict = {
        Blue: "rgba(89, 154, 242, 1)",
        Orange: "rgba(255, 140, 0)",
        Pink: "rgba(255, 105, 180)",
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
        setFieldValue("preferredTime.fall", arr);
    }

    return (
        <ScheduleSelector
            selectedColor={selectedColorDict[color]}
            unselectedColor={unselectedColorDict[color]}
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
