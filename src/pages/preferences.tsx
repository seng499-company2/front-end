import { VStack, Heading } from "@chakra-ui/react";
import GeneralPreferences from "../components/Preferences/GeneralPreferences";

const Preferences = () => {
    return (
        <VStack spacing={5} align="flex-start">
            <Heading>Prof Preferences</Heading>
            <GeneralPreferences />
        </VStack>
    );
};

export default Preferences;
