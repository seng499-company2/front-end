import { VStack, Heading } from "@chakra-ui/react";
import CoursesPreferencesTable from "../components/Preferences/CoursesPreferencesTable";
import GeneralPreferences from "../components/Preferences/GeneralPreferences";

const courses = ["CSC 225", "CSC 226", "ECE 260", "ECE 310", "SENG 265", "SENG 310"];

const Preferences = () => {
    return (
        <VStack spacing={5} align="flex-start">
            <Heading>Prof Preferences</Heading>
            <GeneralPreferences />
            <CoursesPreferencesTable courses={courses} />
        </VStack>
    );
};

export default Preferences;
