import {
    Button,
    Heading,
    Divider,
    Flex,
    TabList,
    Tabs,
    Tab,
    TabPanel,
    TabPanels
} from "@chakra-ui/react";
import Timetable from "./ScheduleSelector";

const courses = [
    "CSC 225",
    "CSC 226",
    "ECE 260",
    "ECE 310",
    "SENG 265",
    "SENG 310",
];

const ScheduleAvailability = (props) => {
    const { handleSubmit } = props;

    return (
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
    );
};

export default ScheduleAvailability;
