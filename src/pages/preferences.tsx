import { Box, Heading } from "@chakra-ui/react";

import Availability from "../components/Preferences/Availability";
import CoursesPreferencesTable from "../components/Preferences/CoursesPreferencesTable";
import GeneralPreferences from "../components/Preferences/GeneralPreferences";

const Preferences = () => {
    return (
        <Box pt="1rem">
            <Heading>Prof Preferences</Heading>
            <Availability />
            <GeneralPreferences />
            <CoursesPreferencesTable courses={["CSC225", "CSC226"]} />
        </Box>
    );
};

export default Preferences;
