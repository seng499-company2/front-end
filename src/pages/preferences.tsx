import { Box, Heading, VStack } from "@chakra-ui/react";
import PreferencesForm from "../components/Preferences/PreferencesForm";
import CoursesPreferencesTable from "../components/Preferences/CoursesPreferencesTable";

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
        <VStack width='50%'>
            <Heading mr='auto' mb={5}>Prof Preferences</Heading>
            <Box width='100%' pt="1rem" bg="white" padding={5} borderRadius={10} boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">
                <PreferencesForm />
                <CoursesPreferencesTable courses={courses} />
            </Box>
        </VStack>
    );
};

export default Preferences;
