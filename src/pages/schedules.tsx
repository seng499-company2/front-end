import { Center, Button, Text, VStack, Flex, Select } from "@chakra-ui/react";
import { ReactElement, useState } from "react";

import AdminLayout from "@components/Layout/AdminLayout";
import ScheduleTable from "@components/Schedule/ScheduleTable";
import { useGetQuery } from "@hooks/useRequest";

const Schedules = ({ scheduledCourses }) => {
    const { data, isLoading, isError, execute } = useGetQuery(
        "/schedule/2022/FALL/2",
        {
            manual: true,
        }
    );

    const [generated, setGenerated] = useState(false);
    const [semester, setSemester] = useState("Fall");

    const onClick = (course) => {
        // TODO: show schedule sidesheet
    };

    return (
        <Flex flexDirection="column" pt="1rem">
            <Center height="50vh" display={generated ? "none" : null}>
                <VStack gap={4}>
                    <Button
                        onClick={() => {
                            execute();
                            if (!isError) {
                                setGenerated(true);
                            }
                        }}
                        isLoading={isLoading}
                    >
                        Generate Schedule
                    </Button>
                    {isError && <Text color="red">Error</Text>}
                </VStack>
            </Center>
            <Select
                onChange={(e) => {
                    setSemester(e.target.value);
                    console.log(mockSchedule[semester]);
                }}
                display={generated ? null : "None"}
                w="200px"
            >
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
            </Select>
            <ScheduleTable
                schedule={mockSchedule[semester]}
                generated={generated}
                onClick={onClick}
            />
        </Flex>
    );
};

Schedules.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

// mock schedule
const mockSchedule = {
    Fall: [
        {
            course: {
                code: "CSC 225",
                name: "Algorithms and Data Structures: I",
            },
            section: "A01",
            instructor: "I.N. Structor",
            time: { "8:30am - 9:20am": [1, 2], "2:30pm-3:20pm": [3, 4] },
            capacity: "150",
        },
        {
            course: { code: "SENG 275", name: "Software Testing" },
            section: "A01",
            instructor: "Jason Corless",
            time: { "10:30am - 11:20am": [1, 2, 3, 4, 5] },
            capacity: "200",
        },
        {
            course: { code: "SENG 371", name: "Software Evolution" },
            section: "A02",
            instructor: "Jens Weber",
            time: { "5:30pm - 6:20pm": [2, 3] },
            capacity: "50",
        },
        {
            course: { code: "SENG 499", name: "Design Project II" },
            section: "A01",
            instructor: "Daniela Damian",
            time: { "5:30pm - 6:20pm": [4] },
            capacity: "80",
        },
    ],
    Spring: [
        {
            course: { code: "CSC 100", name: "Something II" },
            section: "A01",
            instructor: "Pro Fessor",
            time: { "5:30pm - 6:20pm": [4, 5] },
            capacity: "23",
        },
        {
            course: { code: "SENG 230", name: "ABCDE II" },
            section: "A01",
            instructor: "AB CDRE",
            time: { "5:30pm - 6:20pm": [1, 5] },
            capacity: "10",
        },
    ],
    Summer: [
        {
            course: { code: "CSC 230", name: "AAAA BBB CCC" },
            section: "A01",
            instructor: "Harry Potter",
            time: { "2:30pm - 3:20pm": [4] },
            capacity: "8000",
        },
        {
            course: { code: "ECE 360", name: "Project III" },
            section: "A02",
            instructor: "BBB",
            time: { "5:30pm - 6:20pm": [4] },
            capacity: "20",
        },
    ],
};

export default Schedules;
