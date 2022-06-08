import { VStack, Heading } from "@chakra-ui/react";
import CoursesPreferencesTable from "../components/Preferences/CoursesPreferencesTable";

const Preferences = () => {
    return (
        <VStack spacing={5} align="flex-start">
            <Heading>Prof Preferences</Heading>
            <CoursesPreferencesTable courses={["CSC225", "CSC226"]} />
        </VStack>
    );
};

export default Preferences;
