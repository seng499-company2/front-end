import { TabList, Tabs, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import useProfPrefMeta from "@hooks/useProfPrefMeta";
import Timetable from "./ScheduleSelector";

const ScheduleAvailability = () => {
    const { profType } = useProfPrefMeta();

    return (
        <Tabs variant="solid-rounded" colorScheme="green" isLazy>
            <TabList>
                <Tab>Fall</Tab>
                <Tab>Summer</Tab>
                <Tab>Spring</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Timetable semester="fall" />
                </TabPanel>
                <TabPanel>
                    <Timetable semester="summer" />
                </TabPanel>
                <TabPanel>
                    <Timetable semester="spring" />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default ScheduleAvailability;
