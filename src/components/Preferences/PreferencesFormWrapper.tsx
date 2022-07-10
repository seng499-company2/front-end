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

// fills times with term keys if they are not present
function initTermsObjectIfNeeded(times, initVal) {
    const keys = ["fall", "spring", "summer"];
    const timesWithKeys = keys.reduce((obj, key) => {
        if (!(key in times)) {
            obj[key] = initVal;
        }
        return obj;
    }, {});
    return { ...times, ...timesWithKeys };
}

function convertFromBackendFormat(data) {
    const frontendData = {
        sabbatical: {
            value: data.taking_sabbatical,
            duration: data.sabbatical_length,
            fromMonth: data.sabbatical_start_month,
        },
        preferredTime: initTermsObjectIfNeeded(data.preferred_times ?? {}, []),
        coursePreferences: data.courses_preferences,
        nonTeachingSemester: data.preferred_non_teaching_semester || "fall",
        numCoursesPerSem: initTermsObjectIfNeeded(
            data.preferred_courses_per_semester ?? {},
            0
        ),
        teachingDaysPerWeek: initTermsObjectIfNeeded(
            data.preferred_number_teaching_days ?? {},
            0
        ),
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

    const showForm = !isLoading && !isError;

    return (
        <>
            {isLoading && (
                <Progress isIndeterminate hasStripe size="lg" mb={4} />
            )}
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
            {showForm && (
                <PreferencesForm
                    isDisabled={isLoading}
                    initialValues={initialValues}
                />
            )}
        </>
    );
};

export default PreferencesFormWrapper;
