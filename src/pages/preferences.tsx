import { Box, Heading } from "@chakra-ui/react";
import Availability from "../components/Preferences/Availability";


const Preferences = () => {
    return (
        <Box pt="1rem">
            <Heading>Prof Preferences</Heading>
            <Availability/>
        </Box>
        
    );
};

export default Preferences;
