import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import ScheduleSelector from "react-schedule-selector";
import { elementDragControls } from "framer-motion/types/gestures/drag/VisualElementDragControls";

const dayList = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

function convertValuesToDatetime(values, first) {
    const datetimeArr = [];
    const start = new Date();
    dayList.forEach((day, index) => {
        if (!values[day]) {
            return;
        }
        values[day].forEach((time) => {
            let date = new Date();
            date.setDate(first + index - 1);
            // only need the hours part
            date.setHours(time[0].substring(0, 2), 0, 0);
            datetimeArr.push(date);
        });
        console.log(datetimeArr);
    });
    return datetimeArr;
}

function convertToJsonArr(values) {
    const dayTime = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
    };
    values.forEach((element) => {
        const day = dayList[element.getDay()];
        const list = dayTime[day];
        if (typeof list === "undefined") {
            return;
        }
        list.push([element.getHours() + ":00", element.getHours() + 1 + ":00"]);
    });
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
