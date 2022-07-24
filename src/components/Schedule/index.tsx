import {
    Button,
    Text,
    Center,
    Flex,
    HStack,
    IconButton,
    Select,
    Box,
    Tooltip,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { CircularProgress } from "@chakra-ui/progress";
import { useTheme } from "@chakra-ui/system";
import { ImTable } from "react-icons/im";
import { CalendarIcon } from "@chakra-ui/icons";

import ScheduleTable from "@components/Schedule/ScheduleTable";
import ErrorBox from "@components/Schedule/ErrorBox";
import DeveloperSettings from "@components/Schedule/DeveloperSettings";
import Calendar from "@components/Schedule/Calendar";
import { convertRawToTableSchedule } from "@lib/convert";
import { ScheduleView, Semester } from "src/types/calendar";
import useSchedule from "@hooks/useSchedule";

const Schedules = () => {
    const [semester, setSemester] = useState<Semester>("fall");
    const [view, setView] = useState<ScheduleView>("calendar");

    const {
        schedule,
        error,
        isLoading,
        generated,
        lastGeneratedDate,
        generateSchedule,
    } = useSchedule();

    console.log("Schedules");

    const onClick = (scheduledSection) => {
        // TODO: show schedule sidesheet
    };

    const toggleScheduleView = () => {
        setView((prevView) => {
            return prevView === "calendar" ? "table" : "calendar";
        });
    };

    const tableSchedule = useMemo(() => {
        return convertRawToTableSchedule(schedule);
    }, [schedule]);

    const {
        colors: { primary },
    } = useTheme();

    if (isLoading)
        return (
            <Center height="50vh">
                <CircularProgress color={primary[400]} isIndeterminate />
            </Center>
        );

    const isCalendar = view === "calendar";
    console.log(lastGeneratedDate);
    console.log(schedule);

    return (
        <Flex flexDirection="column" pt="1rem" gap={8}>
            {/* display small last generated date */}
            {lastGeneratedDate && (
                <Text fontSize="sm" color="gray.500">
                    Last generated:{" "}
                    {new Date(lastGeneratedDate)?.toLocaleDateString("en-US")}
                </Text>
            )}
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
                            variant="ghost"
                            size="lg"
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
                            generateSchedule();
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
                                generateSchedule();
                            }}
                            isLoading={isLoading}
                        >
                            Generate Schedule
                        </Button>
                    </Box>
                </Center>
            )}

            {error && (
                <ErrorBox
                    error={error.response.data}
                    retry={generateSchedule}
                />
            )}
            {!error && generated && (
                <>
                    {isCalendar ? (
                        <Calendar schedule={schedule} semester={semester} />
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

export default Schedules;
