import { Box, Heading, VStack, useColorModeValue } from "@chakra-ui/react";
import PreferencesForm from "../components/Preferences/PreferencesForm";

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
                <PreferencesForm />
            </Box>
        </VStack>
    );
};

export default Preferences;
