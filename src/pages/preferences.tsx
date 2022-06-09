import { VStack, Heading } from "@chakra-ui/react";
import CoursesPreferencesTable from "../components/Preferences/CoursesPreferencesTable";
import GeneralPreferences from "../components/Preferences/GeneralPreferences";

const Preferences = () => {
    return (
        <VStack spacing={5} align="flex-start">
            <Heading>Prof Preferences</Heading>
            <CoursesPreferencesTable courses={["CSC225", "CSC226"]} />
            <GeneralPreferences />
        </VStack>
    );
};

export default Preferences;
