import {
    Center,
    Button,
    VStack,
    Flex,
    Select,
    useDisclosure,
} from "@chakra-ui/react";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { CircularProgress } from "@chakra-ui/progress";
import { useTheme } from "@chakra-ui/system";

import AdminLayout from "@components/Layout/AdminLayout";
import ScheduleTable from "@components/Schedule/ScheduleTable";
import { useGetQuery } from "@hooks/useRequest";
import ErrorBox from "@components/Schedule/ErrorBox";
import DeveloperSettings from "@components/Schedule/DeveloperSettings";
import ScheduleSidesheet from "@components/Schedule/ScheduleSidesheet";

const dayArr = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

// convert backend data to our data format per course
const convertBackendDataToOurData = (backendData) => {
    const { course, sections } = backendData;
    const { code, title, yearRequired } = course;

    let ourData = sections.map((section, idx) => {
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
            section: sectionId,
            professor: name,
            time,
            capacity,
        };
    });

    //include data on other section for sidesheet. It does replicate data but seemed better than looping through all data again to find other sections
    ourData = ourData.map((thisSection) => {
        return {
            course: { code, title, yearRequired },
            otherSections: ourData.filter(
                (sec) => sec.section !== thisSection.section
            ),
            ...thisSection,
        };
    });

    return ourData;
};

const Schedules = () => {
    const [generated, setGenerated] = useState(false);
    const [semester, setSemester] = useState("fall");
    const [company, setCompany] = useState("2");
    const [selectedSection, setSelectedSection] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [useMockData, setUseMockData] = useState(false);

    const { data, isLoading, isError, execute } = useGetQuery(
        `/schedule/2022/FALL/${company}${
            useMockData ? "?use_mock_data=true" : ""
        }`,
        {
            manual: true,
        }
    );

    const onClick = useCallback(
        (section) => {
            setSelectedSection(section);
            onOpen();
        },
        [onOpen]
    );

    const onSidesheetClose = useCallback(() => {
        onClose();
        setSelectedSection({});
    }, [onClose]);

    const convertData = (data: { [semester: string]: any[] }) => {
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

    const schedule = useMemo(() => {
        if (!data) {
            return { fall: [], spring: [], summer: [] };
        } else {
            return convertData(data);
        }
    }, [data]);

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
        <Flex flexDirection="column" pt="1rem" gap={8}>
            <DeveloperSettings
                {...{
                    error: isError,
                    setUseMockData,
                    setCompany,
                    setSemester,
                    generated,
                    useMockData,
                    company,
                    execute,
                }}
            />
            {/* TODO: ask Nanami about this Select */}
            {generated && (
                <Select
                    onChange={(e) => {
                        setSemester(e.target.value);
                    }}
                    w="200px"
                >
                    <option value="fall">Fall</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                </Select>
            )}
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

            {isError && (
                <ErrorBox error={isError.response.data} retry={execute} />
            )}
            <ScheduleTable schedule={schedule[semester]} onClick={onClick} />
            <ScheduleSidesheet
                isOpen={isOpen}
                onClose={onSidesheetClose}
                section={selectedSection}
                refetch={execute}
            />
        </Flex>
    );
};

Schedules.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Schedules;
