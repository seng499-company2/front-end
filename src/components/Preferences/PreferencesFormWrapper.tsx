import {
    Button,
    HStack,
    Progress,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import { useGetQuery } from "@hooks/useRequest";
import { FiRefreshCcw } from "react-icons/fi";
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
        duration: "HALF",
        fromMonth: "1",
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

function convertFromBackendFormat(data) {
    const frontendData = {
        sabbatical: {
            value: data.taking_sabbatical,
            duration: data.sabbatical_length,
            fromMonth: data.sabbatical_start_month,
        },
        preferredTime: data.preferred_times,
        coursePreferences: data.courses_preferences,
        nonTeachingSemester: data.preferred_non_teaching_semester,
        numCoursesPerSem: data.preferred_courses_per_semester,
        teachingDaysPerWeek: data.preferred_number_teaching_days,
        preferredDays: data.preferred_course_day_spreads,
    };
    return frontendData;
}

const PreferencesFormWrapper = () => {
    const { data, isError, isLoading, execute } =
        useGetQuery("/api/preferences/");

    const initialValuesRaw = data || defaultInitialValues;
    const initialValues = data
        ? convertFromBackendFormat(initialValuesRaw)
        : initialValuesRaw;
    const errorBgColor = useColorModeValue("red.100", "red.400");

    return (
        <>
            {isLoading && <Progress isIndeterminate />}
            {isError && (
                <HStack
                    spacing={4}
                    bg={errorBgColor}
                    borderRadius={"md"}
                    justifyContent={"space-between"}
                    mb={4}
                    p={2}
                >
                    <Text fontSize="sm" colorScheme="primary">
                        There was an error loading your preferences.
                    </Text>
                    <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => execute()}
                        leftIcon={<FiRefreshCcw />}
                    >
                        Try again
                    </Button>
                </HStack>
            )}
            <PreferencesForm
                isDisabled={isLoading}
                initialValues={initialValues}
            />
        </>
    );
};

export default PreferencesFormWrapper;
