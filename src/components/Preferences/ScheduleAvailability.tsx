import { TabList, Tabs, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import Timetable from "./ScheduleSelector";

const ScheduleAvailability = (props) => {
    const { setFieldValue, values, isDisabled = false } = props;

    console.log("ScheduleAvailability values: ", values);

    return (
        <Tabs variant="solid-rounded" colorScheme="green" isLazy>
            <TabList>
                <Tab>Fall</Tab>
                <Tab>Summer</Tab>
                <Tab>Spring</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Timetable
                        semester="fall"
                        values={values.fall}
                        setFieldValue={setFieldValue}
                        isDisabled={isDisabled}
                    />
                </TabPanel>
                <TabPanel>
                    <Timetable
                        semester="summer"
                        values={values.summer}
                        setFieldValue={setFieldValue}
                        isDisabled={isDisabled}
                    />
                </TabPanel>
                <TabPanel>
                    <Timetable
                        semester="spring"
                        values={values.spring}
                        setFieldValue={setFieldValue}
                        isDisabled={isDisabled}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default ScheduleAvailability;
