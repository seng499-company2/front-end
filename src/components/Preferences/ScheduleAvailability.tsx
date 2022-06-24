import { TabList, Tabs, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import Timetable from "./ScheduleSelector";

const ScheduleAvailability = ({ isDisabled }) => {
    //const { handleSubmit } = props;

    return (
        <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
                <Tab>Fall</Tab>
                <Tab>Summer</Tab>
                <Tab>Spring</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Timetable
                        color="Blue"
                        semester="Fall"
                        isDisabled={isDisabled}
                    />
                </TabPanel>
                <TabPanel>
                    <Timetable
                        color="Orange"
                        semester="Summer"
                        isDisabled={isDisabled}
                    />
                </TabPanel>
                <TabPanel>
                    <Timetable
                        color="Pink"
                        semester="Spring"
                        isDisabled={isDisabled}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default ScheduleAvailability;
