import { TabList, Tabs, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import Timetable from "./ScheduleSelector";

const ScheduleAvailability = (props) => {
    const { setFieldValue, values } = props;
    const val = [{ day: "1", time: "8" }];

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
                        // value={values.preferredTime.Fall}
                        value={val}
                    />
                </TabPanel>
                <TabPanel>
                    <Timetable
                        color="Orange"
                        semester="Summer"
                        value={values.preferredTime.Summer}
                    />
                </TabPanel>
                <TabPanel>
                    <Timetable
                        color="Pink"
                        semester="Spring"
                        value={values.preferredTime.Spring}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default ScheduleAvailability;
