import React, { useCallback, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import ScheduleSelector from "react-schedule-selector";
import { useFormikContext } from "formik";
import { PreferencesFormType } from "src/types/preferences";
import useProfPrefMeta from "@hooks/useProfPrefMeta";

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
    if (!values) {
        return null;
    }

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

const Timetable = ({ semester, isFillable = true }) => {
    const {
        values: {
            preferredTime: { [semester]: values },
        },
        setFieldValue,
    } = useFormikContext<PreferencesFormType>();
    const { isDisabled: isDisabledMeta } = useProfPrefMeta();

    const today = useRef(new Date());
    const first = today.current.getDate() - today.current.getDay() + 1;
    const firstDate = useRef(new Date(today.current.setDate(first)));
    const formValue = `preferredTime.${semester}`;

    const initVals = useRef(values);
    const schedule = useRef(convertValuesToDatetime(initVals.current, first));

    const isDisabled = isDisabledMeta || !isFillable;

    const handleChange = useCallback(
        (newSchedule) => {
            if (!isDisabled) {
                schedule.current = newSchedule;
                setFieldValue(formValue, convertToJsonArr(newSchedule));
            }
        },
        [setFieldValue, formValue, isDisabled]
    );

    if (!isFillable || schedule.current === null) {
        return (
            <Box
                border="1px solid"
                borderColor="gray.200"
                borderRadius="5px"
                p={2}
                textAlign="center"
                fontSize="sm"
                color="gray.500"
            >
                <Text>
                    Not available with current sabbatical and/or preferred
                    non-teaching semester choices.
                </Text>
            </Box>
        );
    }

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
                selection={schedule.current}
                numDays={5}
                minTime={8}
                maxTime={20}
                hourlyChunks={2}
                timeFormat={"H:mm"}
                dateFormat={"dddd"}
                startDate={firstDate.current}
                onChange={handleChange}
                style
            />
        </Box>
    );
};

export default Timetable;
