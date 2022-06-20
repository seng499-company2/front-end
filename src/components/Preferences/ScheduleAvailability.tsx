import { TabList, Tabs, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import Timetable from "./ScheduleSelector";

const ScheduleAvailability = (props) => {
    const { setFieldValue, values } = props;

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
                        semester="fall"
                        values={values.preferredTime.fall}
                        setFieldValue={setFieldValue}
                    />
                </TabPanel>
                <TabPanel>
                    <Timetable
                        color="Orange"
                        semester="summer"
                        values={values.preferredTime.summer}
                        setFieldValue={setFieldValue}
                    />
                </TabPanel>
                <TabPanel>
                    <Timetable
                        color="Pink"
                        semester="spring"
                        values={values.preferredTime.spring}
                        setFieldValue={setFieldValue}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default ScheduleAvailability;
