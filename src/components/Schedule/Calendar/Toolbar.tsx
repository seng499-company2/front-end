import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    ButtonGroup,
    Heading,
    HStack,
    IconButton,
} from "@chakra-ui/react";
import TableFilter from "@components/Table/TableFilter";
import { formatDateWeekday } from "@lib/format";
import { useMemo } from "react";
import { Navigate, NavigateAction, View } from "react-big-calendar";

interface ToolbarProps {
    view: View;
    date: Date;
    onNavigate: (action: NavigateAction, date?: Date) => void;
    onView: (view: View) => void;
    onFilter: (column, value) => void;
}

const Toolbar = (props: ToolbarProps) => {
    const { view, date, onNavigate, onView, onFilter } = props;

    const isDay = view === "day";

    const weekDay = useMemo(() => formatDateWeekday(date), [date]);

    return (
        <HStack justifyContent={"space-between"} mb={4} overflowX="auto">
            <HStack w="fit-content" gap={4}>
                {isDay ? (
                    <>
                        <ButtonGroup
                            alignItems={"center"}
                            minW={"12rem"}
                            justifyContent="space-between"
                        >
                            <IconButton
                                onClick={() => onNavigate(Navigate.PREVIOUS)}
                                icon={<ArrowLeftIcon />}
                                size="sm"
                                disabled={weekDay === "Monday"}
                                aria-label={`previous ${view}`}
                            />
                            <Heading as="h4" size="md">
                                {weekDay}
                            </Heading>
                            <IconButton
                                onClick={() => onNavigate(Navigate.NEXT)}
                                icon={<ArrowRightIcon />}
                                size="sm"
                                disabled={weekDay === "Friday"}
                                aria-label={`next ${view}`}
                            />
                        </ButtonGroup>
                    </>
                ) : (
                    <Box></Box>
                )}
                <HStack>
                    <TableFilter
                        column={{
                            Header: "Course Code",
                            accessor: "course",
                            filter: { type: "text" },
                        }}
                        onFilter={(column, value) => {
                            onFilter(column, value);
                        }}
                        w={"10rem"}
                    />

                    <TableFilter
                        column={{
                            Header: "Professor",
                            accessor: "professor",
                            filter: { type: "text" },
                        }}
                        onFilter={(column, value) => {
                            onFilter(column, value);
                        }}
                        w={"10rem"}
                    />
                    <TableFilter
                        column={{
                            Header: "Year Required",
                            accessor: "yearRequired",
                            filter: {
                                type: "dropdown",
                                options: [
                                    { label: "1st Year", value: "1" },
                                    { label: "2nd Year", value: "2" },
                                    { label: "3rd Year", value: "3" },
                                    { label: "4th Year", value: "4" },
                                ],
                            },
                        }}
                        onFilter={(column, value) => {
                            onFilter(column, +value);
                        }}
                        w={"10rem"}
                    />
                </HStack>
            </HStack>

            <ButtonGroup size="sm" isAttached variant="solid">
                <Button isDisabled={!isDay} onClick={() => onView("week")}>
                    Week
                </Button>
                <Button isDisabled={isDay} onClick={() => onView("day")}>
                    Day
                </Button>
            </ButtonGroup>
        </HStack>
    );
};

export default Toolbar;
