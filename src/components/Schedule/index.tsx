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
    VStack,
    Checkbox,
    useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
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
import { useAutoSave } from "@hooks/useAutoSave";
import ScheduleSidesheet from "./ScheduleSidesheet";
import RegenerateConfirmation from "@components/Layout/RegenerateConfirmation";

const Schedules = () => {
    const [semester, setSemester] = useState<Semester>("fall");
    const [view, setView] = useState<ScheduleView>("calendar");
    const [autoSaveIsDisabled, setAutoSaveIsDisabled] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedSection, setSelectedSection] = useState();

    const {
        isOpen: regenIsOpen,
        onOpen: triggerRegenConfirmation,
        onClose: closeRegenConfirmation,
    } = useDisclosure();

    const {
        schedule,
        error,
        isLoading,
        generated,
        lastUpdatedDate,
        isSaving,
        generateSchedule,
        saveSchedule,
    } = useSchedule();

    useAutoSave(saveSchedule, autoSaveIsDisabled);
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

    const onOpenSidesheet = useCallback(
        (sectionData) => {
            setSelectedSection(sectionData);
            onOpen();
        },
        [onOpen]
    );

    if (isLoading)
        return (
            <Center height="50vh">
                <CircularProgress color={primary[400]} isIndeterminate />
                <VStack ml={4}>
                    <Text ml={2} color="primary.700" fontSize="xl">
                        Generating Schedule
                    </Text>
                    <Text ml={2} color="primary.400" fontSize="md">
                        This could take up to a minute.
                    </Text>
                </VStack>
            </Center>
        );

    const isCalendar = view === "calendar";

    const lastGenerated = lastUpdatedDate ? new Date(lastUpdatedDate) : null;

    return (
        <Flex flexDirection="column" gap={8}>
            {/* display small last generated date */}
            <VStack gap={0} alignItems="stretch">
                <HStack justifyContent={"space-between"}>
                    <Tooltip
                        alignSelf={"start"}
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
                    {lastGenerated && (
                        <Tooltip label={`${lastGenerated.toLocaleString()}`}>
                            <Text
                                fontSize="sm"
                                color="gray.500"
                                alignSelf={"end"}
                            >
                                Last updated:{" "}
                                {lastGenerated?.toLocaleDateString("en-US")}
                            </Text>
                        </Tooltip>
                    )}
                </HStack>

                <HStack justifyContent={"space-between"}>
                    <HStack gap={4}>
                        {/* @ts-ignore */}
                        {window?.dev && <DeveloperSettings />}
                        {generated && (
                            <>
                                <Select
                                    onChange={(e) => {
                                        setSemester(e.target.value as Semester);
                                    }}
                                >
                                    <option value="fall">Fall</option>
                                    <option value="spring">Spring</option>
                                    <option value="summer">Summer</option>
                                </Select>

                                {isCalendar && (
                                    <>
                                        <Button
                                            onClick={saveSchedule}
                                            minW={20}
                                            isLoading={isSaving}
                                        >
                                            Save
                                        </Button>
                                        <Checkbox
                                            gap={2}
                                            minW={"fit-content"}
                                            isChecked={!autoSaveIsDisabled}
                                            onChange={() =>
                                                setAutoSaveIsDisabled(
                                                    (prev) => !prev
                                                )
                                            }
                                        >
                                            <>
                                                <Text>Auto save</Text>
                                                <Text
                                                    fontSize={"sm"}
                                                    color={"gray.400"}
                                                >
                                                    Periodic
                                                </Text>
                                            </>
                                        </Checkbox>
                                    </>
                                )}
                            </>
                        )}
                    </HStack>
                    {generated && (
                        <Box>
                            <Button
                                onClick={triggerRegenConfirmation}
                                isLoading={isLoading}
                                colorScheme="red"
                            >
                                Re-generate Schedule
                            </Button>
                        </Box>
                    )}
                </HStack>
            </VStack>

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
                        <Calendar
                            schedule={schedule}
                            semester={semester}
                            onOpenSidesheet={onOpenSidesheet}
                        />
                    ) : (
                        <ScheduleTable
                            schedule={tableSchedule[semester]}
                            onOpenSidesheet={onOpenSidesheet}
                        />
                    )}
                </>
            )}
            <ScheduleSidesheet
                isOpen={isOpen}
                onClose={onClose}
                data={selectedSection}
                semester={semester}
            />
            <RegenerateConfirmation
                isOpen={regenIsOpen}
                onClose={closeRegenConfirmation}
                onConfirm={generateSchedule}
            />
        </Flex>
    );
};

export default Schedules;
