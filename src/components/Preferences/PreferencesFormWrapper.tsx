import { Progress, Text } from "@chakra-ui/react";

import { useGetQuery } from "@hooks/useRequest";
import { Difficulty, Willingness } from "./CoursesPreferencesTable";
import PreferencesForm from "./PreferencesForm";

const getCourses = () => {
    return ["CSC 225", "CSC 226", "ECE 260", "ECE 310", "SENG 265", "SENG 310"];
};

const coursePreferencesInit = getCourses().reduce((obj, course) => {
    obj[course] = {
        willingness: Willingness.noSelection,
        difficulty: Difficulty.noSelection,
    };
    return obj;
}, {});

const defaultInitialValues = {
    nonTeachingSemester: "fall",
    numCoursesPerSem: {
        fall: 0,
        spring: 0,
        summer: 0,
    },
    sabbatical: {
        value: false,
        duration: "half",
        fromMonth: "january",
    },
    teachingDaysPerWeek: {
        fall: 0,
        spring: 0,
        summer: 0,
    },
    preferredDays: [],
    preferredTime: {
        fall: [],
        summer: [],
        spring: [],
    },
    coursePreferences: coursePreferencesInit,
};

const PreferencesFormWrapper = () => {
    const { data, isError, isLoading } = useGetQuery("/api/preferences/");

    const initialValues = data || defaultInitialValues;
    return (
        <>
            {isLoading && <Progress isIndeterminate />}
            {isError && (
                <Text fontSize="sm" color="red.500">
                    There was an error loading your preferences.
                </Text>
            )}
            <PreferencesForm
                isDisabled={isLoading}
                initialValues={initialValues}
            />
        </>
    );
};

export default PreferencesFormWrapper;
