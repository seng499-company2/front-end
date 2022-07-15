import {
    Button,
    HStack,
    Progress,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import { useGetQuery } from "@hooks/useRequest";
import { FiRefreshCcw } from "react-icons/fi";
import { Difficulty, Willingness } from "./CoursePreferencesTable";
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

function generateCoursePreferencesFromCodesIfNeeded(
    coursePreferences = {},
    courseCodes = []
) {
    // if coursePreferences is empty, generate it from courseCodes
    // default values are set to noSelection
    // i.e. { CSC 225: { difficulty: Difficulty["noSelection"], willingness: Willingness["noSelection"] } }
    // if coursePreferences is not empty for a course, it is not modified
    if (Object.keys(coursePreferences).length === 0) {
        return courseCodes.reduce((obj, course) => {
            obj[course] = {
                difficulty: Difficulty.noSelection,
                willingness: Willingness.noSelection,
            };
            return obj;
        }, {});
    }

    // check for courses that are not in coursePreferences
    // if they are not in coursePreferences, set them to default values
    const courseCodesInPreferences = Object.keys(coursePreferences);
    const courseCodesNotInPreferences = courseCodes.filter(
        (course) => !courseCodesInPreferences.includes(course)
    );

    const coursePreferencesWithDefaultValues =
        courseCodesNotInPreferences.reduce((obj, course) => {
            obj[course] = {
                difficulty: Difficulty.noSelection,
                willingness: Willingness.noSelection,
            };
            return obj;
        }, {});

    return { ...coursePreferences, ...coursePreferencesWithDefaultValues };
}

function convertFromBackendFormat(data) {
    const {
        course_codes,
        resource: {
            taking_sabbatical,
            sabbatical_length,
            sabbatical_start_month,
            preferred_times,
            courses_preferences,
            preferred_non_teaching_semester,
            preferred_courses_per_semester,
            preferred_number_teaching_days,
            preferred_course_day_spreads,
        },
    } = data;

    const frontendData = {
        sabbatical: {
            value: taking_sabbatical,
            duration: sabbatical_length,
            fromMonth: sabbatical_start_month,
        },
        preferredTime: initTermsObjectIfNeeded(preferred_times ?? {}, []),
        coursePreferences: generateCoursePreferencesFromCodesIfNeeded(
            courses_preferences,
            course_codes
        ),
        nonTeachingSemester: preferred_non_teaching_semester || "fall",
        numCoursesPerSem: initTermsObjectIfNeeded(
            preferred_courses_per_semester ?? {},
            0
        ),
        teachingDaysPerWeek: initTermsObjectIfNeeded(
            preferred_number_teaching_days ?? {},
            0
        ),
        preferredDays: preferred_course_day_spreads,
    };
    return frontendData;
}

const AdminPreferences = ({ professor, isDisabled }) => {
    const { data, isError, isLoading, execute } = useGetQuery(
        `/api/preferences/${professor.username}/`,
        {
            manual: false,
            ssr: false,
            useCache: false,
        }
    );

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
                    isDisabled={isDisabled}
                    initialValues={initialValues}
                    isProfessorPage={true}
                    endpoint={"/api/preferences/" + professor.username + "/"}
                    username={professor.username}
                />
            )}
        </>
    );
};

export default AdminPreferences;
