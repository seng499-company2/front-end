import { Box, Heading } from "@chakra-ui/react";

import Availability from "../components/Preferences/Availability";
import CoursesPreferencesTable from "../components/Preferences/CoursesPreferencesTable";
import GeneralPreferences from "../components/Preferences/GeneralPreferences";

const courses = [
    "CSC 225",
    "CSC 226",
    "ECE 260",
    "ECE 310",
    "SENG 265",
    "SENG 310",
];

const Preferences = () => {
    return (
        <Box pt="1rem">
            <Heading>Prof Preferences</Heading>
            <Availability />
            <GeneralPreferences />
            <CoursesPreferencesTable courses={courses} />
        </Box>
    );
};

export default Preferences;
