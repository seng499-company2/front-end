import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import ScheduleSelector from "react-schedule-selector";

function convertValuesToDatetime(values, first) {
    const datetimeArr = [];
    values.forEach((element) => {
        let date = new Date();
        const day = first + element.day - 1;
        date.setDate(day);
        date.setHours(element.time, 0, 0);
        datetimeArr.push(date);
    });
    return datetimeArr;
}

const dayList = ["", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", ""];
function convertToJsonArr(values) {
    const dayTime = {
        monday: [],
        tuesday: [],
        wenesday: [],
        thursday: [],
        friday: []
    };
    values.forEach((element) => {
        const day = dayList[element.getDay()];
        const list = dayTime[day];
        list.push([element.getHours(), element.getHours()+1]);
    });
    console.log(dayTime);
    return dayTime;
}

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

const Timetable = ({ semester, values, setFieldValue, isDisabled = false }) => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const formValue = `preferredTime.${semester}`;

    const [schedule, setSchedule] = useState(
        convertValuesToDatetime(values, first)
    );

    const handleChange = useCallback(
        (newSchedule) => {
            if (!isDisabled) {
                setSchedule(newSchedule);
                setFieldValue(formValue, convertToJsonArr(newSchedule));
            }
        },
        [setFieldValue, formValue, isDisabled]
    );

    return (
        <Box
            opacity={isDisabled && 0.5}
            pointerEvents={isDisabled ? "none" : "all"}
            cursor={isDisabled ? "not-allowed" : "grab"}
        >
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
                style
            />
        </Box>
    );
};

export default Timetable;
