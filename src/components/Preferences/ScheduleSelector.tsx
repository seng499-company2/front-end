import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import ScheduleSelector from "react-schedule-selector";

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
    dayList.forEach((day, index) => {
        if (!values[day]) {
            return;
        }
        values[day].forEach((time) => {
            let date = new Date();
            date.setDate(first + index - 1);
            // only need the hours part
            time = time[0].split(":");
            date.setHours(time[0], time[1]);
            datetimeArr.push(date);
        });
    });
    return datetimeArr;
}

function convertToList(element) {
    if (element.getMinutes() === 0) {
        const startTime = element.getHours() + ":00";
        const endTime = element.getHours() + ":30";
        return [startTime, endTime];
    } else {
        const startTime = element.getHours() + ":30";
        const endTime = element.getHours() + 1 + ":00";
        return [startTime, endTime];
    }
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
        list.push(convertToList(element));
    });
    return dayTime;
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

    console.log("Timetable values: ", values);

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
                hourlyChunks={2}
                timeFormat={"H:mm"}
                dateFormat={"dddd"}
                startDate={new Date(today.setDate(first))}
                onChange={handleChange}
                style
            />
        </Box>
    );
};

export default Timetable;
