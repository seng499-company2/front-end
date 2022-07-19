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

function convertToJsonArr(values) {
    const jsonArr = [];
    values.forEach((element) => {
        const time = {
            day: element.getDay(),
            time: element.getHours(),
        };
        jsonArr.push(time);
    });
    return jsonArr;
}

const unselectedColorDict = {
    fall: "#a2c6f8",
    spring: "#FFE6E6",
    summer: "#FEBA4F",
};
const selectedColorDict = {
    fall: "#599af2",
    spring: "#E4AEC5",
    summer: "#F5761A",
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
