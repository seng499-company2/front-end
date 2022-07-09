import { Box, Heading, VStack, useColorModeValue } from "@chakra-ui/react";
import PreferencesForm from "../components/Preferences/PreferencesForm";
import {
    Difficulty,
    Willingness,
} from "../components/Preferences/CoursesPreferencesTable";

const getCourses = () => {
    return ["CSC 225", "CSC 226", "ECE 260", "ECE 310", "SENG 265", "SENG 310"];
};

const coursePreferencesInit = getCourses().reduce((obj, course) => {
    obj[course] = {
        willingness: Willingness.willing,
        difficulty: Difficulty.moderate,
    };
    return obj;
}, {});

const initialValues = {
    numCoursesPerSem: {
        fall: 0,
        spring: 0,
        summer: 0,
    },
    // relief: {
    //     value: false,
    //     numCourses: 0,
    // },
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
    preferredDaysFall: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
    },
    preferredDaysSpring: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
    },
    preferredDaysSummer: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
    },
    preferredTime: {
        fall: [],
        summer: [],
        spring: [],
    },
    coursePreferences: coursePreferencesInit,
};

const Preferences = () => {
    return (
        <VStack width="50%">
            <Heading mr="auto" mb={5}>
                Professor Preferences
            </Heading>
            <Box
                width="100%"
                pt="1rem"
                bg={useColorModeValue("white", "gray.800")}
                padding={5}
                borderRadius={10}
                boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
            >
                <PreferencesForm
                    isDisabled={false}
                    initialValues={initialValues}
                    isProfessorPage={false}
                />
            </Box>
        </VStack>
    );
};

export default Preferences;
