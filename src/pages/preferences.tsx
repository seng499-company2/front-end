import { Box, Heading } from "@chakra-ui/react";
import Availability from "../components/Preferences/Availability";
import App from "../components/Preferences/ScheduleSelector";


const Preferences = () => {
    return (
        <Box pt="1rem">
            <Heading>Prof Preferences</Heading>
            <Availability/>
            <App/>
        </Box>
        
    );
};

export default Preferences;
