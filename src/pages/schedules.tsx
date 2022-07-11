import {
    Center,
    Button,
    Text,
    VStack,
    Flex,
    Select,
    Checkbox,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { CircularProgress } from "@chakra-ui/progress";
import { useTheme } from "@chakra-ui/system";

import AdminLayout from "@components/Layout/AdminLayout";
import ScheduleTable from "@components/Schedule/ScheduleTable";
import { useGetQuery } from "@hooks/useRequest";

const dayArr = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

// convert backend data to our data format per course
const convertBackendDataToOurData = (backendData) => {
    const { course, sections } = backendData;
    const { code, title } = course;

    const ourData = sections.map((section, idx) => {
        const {
            capacity,
            professor: { name },
            timeSlots,
        } = section;

        const time = timeSlots.reduce((acc, timeSlot) => {
            const { dayOfWeek, timeRange } = timeSlot;
            const [startTime, endTime] = timeRange;
            const timeString = `${startTime} - ${endTime}`;

            const timeArray = acc[timeString] || [];
            timeArray.push(dayArr.indexOf(dayOfWeek) + 1);
            acc[timeString] = timeArray;

            return acc;
        }, {});

        // convert section idx to A01, A02, A03, ..., A20, ...
        const sectionIdx = idx + 1;
        const sectionId = `A${sectionIdx < 10 ? `0${sectionIdx}` : sectionIdx}`;

        return {
            course: { code, title },
            section: sectionId,
            professor: name,
            time,
            capacity,
        };
    });

    return ourData;
};

const Schedules = ({ scheduledCourses }) => {
    const [generated, setGenerated] = useState(false);
    const [semester, setSemester] = useState("fall");
    const [company, setCompany] = useState("2");
    const { data, isLoading, isError, execute } = useGetQuery(
        "/schedule/2022/FALL/" + company,
        {
            manual: true,
        }
    );

    const onClick = (course) => {
        // TODO: show schedule sidesheet
    };

    const convertData = (data) => {
        const generatedSchedule = {};
        for (const [semester, scheduleArray] of Object.entries(data)) {
            if (!scheduleArray || scheduleArray?.length === 0) {
                generatedSchedule[semester] = [];
            } else {
                generatedSchedule[semester] = scheduleArray.flatMap((course) =>
                    convertBackendDataToOurData(course)
                );
            }
        }
        return generatedSchedule;
    };

    const schedule = data
        ? convertData(data)
        : { fall: [], spring: [], summer: [] };

    const {
        colors: { primary },
    } = useTheme();

    if (isLoading)
        return (
            <Center height="50vh">
                <CircularProgress color={primary[400]} isIndeterminate />
            </Center>
        );

    return (
        <Flex flexDirection="column" pt="1rem">
            <Center height="50vh" display={generated ? "none" : null}>
                <VStack gap={4}>
                    <Button
                        onClick={() => {
                            execute();
                            setGenerated(true);
                        }}
                        isLoading={isLoading}
                    >
                        Generate Schedule
                    </Button>
                </VStack>
            </Center>
            {!isError && (
                <>
                    <Checkbox
                        display={!generated ? null : "None"}
                        onChange={(e) => {
                            setCompany(e.target.checked ? "1" : "2");
                        }}
                    >
                        Use Company 1 Algorithm instead
                    </Checkbox>
                    <Select
                        onChange={(e) => {
                            setSemester(e.target.value);
                        }}
                        display={generated ? null : "None"}
                        w="200px"
                    >
                        <option value="fall">Fall</option>
                        <option value="spring">Spring</option>
                        <option value="summer">Summer</option>
                    </Select>
                </>
            )}
            {isError && (
                <Text fontSize="sm" color="red.500">
                    There was an error while generating schedule.
                </Text>
            )}
            <ScheduleTable schedule={schedule[semester]} onClick={onClick} />
        </Flex>
    );
};

Schedules.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Schedules;
