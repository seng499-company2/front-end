import {
    Button,
    Center,
    Flex,
    HStack,
    IconButton,
    Select,
    Box,
    Tooltip,
} from "@chakra-ui/react";
import { ReactElement, useMemo, useState } from "react";
import { CircularProgress } from "@chakra-ui/progress";
import { useTheme } from "@chakra-ui/system";
import { ImTable } from "react-icons/im";
import { CalendarIcon } from "@chakra-ui/icons";

import ScheduleTable from "@components/Schedule/ScheduleTable";
import AdminLayout from "@components/Layout/AdminLayout";
import { useGetQuery } from "@hooks/useRequest";
import ErrorBox from "@components/Schedule/ErrorBox";
import DeveloperSettings from "@components/Schedule/DeveloperSettings";
import Calendar from "@components/Schedule/Calendar";
import { convertScheduleData } from "@lib/convert";
import { ScheduleView, Semester } from "src/types/calendar";

const Schedules = () => {
    const [generated, setGenerated] = useState(false);
    const [semester, setSemester] = useState<Semester>("fall");
    const [company, setCompany] = useState("2");
    const [useMockData, setUseMockData] = useState(false);
    const [view, setView] = useState<ScheduleView>("calendar");

    const { data, isLoading, isError, execute } = useGetQuery(
        `/schedule/2022/FALL/${company}${
            useMockData ? "?use_mock_data=true" : ""
        }`,
        {
            manual: true,
            ssr: false,
        }
    );

    const onClick = (scheduledSection) => {
        // TODO: show schedule sidesheet
    };

    const toggleScheduleView = () => {
        setView((prevView) => {
            return prevView === "calendar" ? "table" : "calendar";
        });
    };

    const tableSchedule = useMemo(() => {
        return convertScheduleData(data);
    }, [data]);

    if (isLoading)
        return (
            <Center height="50vh">
                <CircularProgress color="primary.400" isIndeterminate />
                <Text ml={2} color="primary.700" fontSize="xl">
                    Generating Schedule
                </Text>
            </Center>
        );

    const isCalendar = view === "calendar";

    return (
        <Flex flexDirection="column" pt="1rem" gap={8}>
            <HStack justifyContent={"space-between"}>
                <HStack gap={4}>
                    {/* <DeveloperSettings
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
                    /> */}
                    {generated && (
                        <Select
                            onChange={(e) => {
                                setSemester(e.target.value as Semester);
                            }}
                            w="200px"
                        >
                            <option value="fall">Fall</option>
                            <option value="spring">Spring</option>
                            <option value="summer">Summer</option>
                        </Select>
                    )}
                    <Tooltip
                        maxW={100}
                        placement="right"
                        label={`Change to ${
                            isCalendar ? "Table" : "Calendar"
                        } view`}
                        aria-label="Toggle schedule view"
                    >
                        <IconButton
                            aria-label="Toggle schedule view"
                            onClick={toggleScheduleView}
                            icon={
                                view === "calendar" ? (
                                    <ImTable />
                                ) : (
                                    <CalendarIcon />
                                )
                            }
                        />
                    </Tooltip>
                </HStack>
                {generated && (
                    <Button
                        onClick={() => {
                            execute();
                            setGenerated(true);
                        }}
                        isLoading={isLoading}
                        colorScheme="red"
                    >
                        Re-generate Schedule
                    </Button>
                )}
            </HStack>

            {!generated && (
                <Center height="40vh">
                    <Box>
                        <Button
                            onClick={() => {
                                execute();
                                setGenerated(true);
                            }}
                            isLoading={isLoading}
                        >
                            Generate Schedule
                        </Button>
                    </Box>
                </Center>
            )}

            {isError && (
                <ErrorBox error={isError.response.data} retry={execute} />
            )}
            {!isError && generated && (
                <>
                    {isCalendar ? (
                        <Calendar schedule={data} semester={semester} />
                    ) : (
                        <ScheduleTable
                            schedule={tableSchedule[semester]}
                            onClick={onClick}
                        />
                    )}
                </>
            )}
        </Flex>
    );
};

Schedules.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Schedules;
