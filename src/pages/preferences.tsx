import {
    FormControl,
    Box,
    Heading,
    Tabs,
    TabPanels,
    TabPanel,
    TabList,
    Tab,
} from "@chakra-ui/react";
import Availability from "../components/Preferences/Availability";
import Timetable from "../components/Preferences/ScheduleSelector";

const Preferences = () => {
    return (
        <Box pt="1rem">
            <FormControl>
                <Heading>Prof Preferences</Heading>
                <Availability />
                <Tabs variant="soft-rounded" colorScheme="green">
                    <TabList>
                        <Tab>Fall</Tab>
                        <Tab>Summer</Tab>
                        <Tab>Spring</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Timetable color="Blue" semester="Fall" />
                        </TabPanel>
                        <TabPanel>
                            <Timetable color="Orange" semester="Summer" />
                        </TabPanel>
                        <TabPanel>
                            <Timetable color="Pink" semester="Spring" />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </FormControl>
        </Box>
    );
};

export default Preferences;
