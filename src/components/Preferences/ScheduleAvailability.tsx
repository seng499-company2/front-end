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
                        values={val}
                        // value={values.preferredTime.fall}
                        setFieldValue={setFieldValue}
                    />
                </TabPanel>
                <TabPanel>
                    <Timetable
                        color="Orange"
                        semester="Summer"
                        values={values.preferredTime.summer}
                        // onChange={(v) =>
                        //     setFieldValue("preferredTime.summer", v)
                        // }
                    />
                </TabPanel>
                <TabPanel>
                    <Timetable
                        color="Pink"
                        semester="Spring"
                        values={values.preferredTime.spring}
                        // onChange={(v) =>
                        //     setFieldValue("preferredTime.spring", v)
                        // }
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default ScheduleAvailability;
