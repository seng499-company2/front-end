import { TabList, Tabs, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import Timetable from "./ScheduleSelector";

const ScheduleAvailability = (props) => {
    const { setFieldValue, values } = props;
    const val = [
        { day: 1, time: 8 },
        { day: 1, time: 9 },
        { day: 1, time: 10 },
        { day: 3, time: 8 },
        { day: 3, time: 9 },
        { day: 3, time: 10 },
        { day: 5, time: 10 },
    ];
    const val2 = [
        { day: 1, time: 8 },
        { day: 1, time: 9 },
        { day: 1, time: 10 },
        { day: 3, time: 8 },
        { day: 3, time: 9 },
        { day: 3, time: 10 },
        { day: 5, time: 10 },
    ];

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
                        values={val}
                        setFieldValue={setFieldValue}
                    />
                </TabPanel>
                <TabPanel>
                    <Timetable
                        color="Orange"
                        semester="summer"
                        // values={values.preferredTime.summer}
                        values={val2}
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
