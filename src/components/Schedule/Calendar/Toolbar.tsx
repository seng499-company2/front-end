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
import { Navigate } from "react-big-calendar";

const Toolbar = (props) => {
    const { view, date, onNavigate, onView, onFilter } = props;

    const isWeek = view === "week";
    return (
        <HStack justifyContent={"space-between"} mb={4}>
            <HStack w="fit-content">
                {!isWeek ? (
                    <ButtonGroup isAttached>
                        <IconButton
                            onClick={() => onNavigate(Navigate.PREVIOUS)}
                            icon={<ArrowLeftIcon />}
                            aria-label={`previous ${view}`}
                        />
                        <IconButton
                            onClick={() => onNavigate(Navigate.NEXT)}
                            icon={<ArrowRightIcon />}
                            aria-label={`next ${view}`}
                        />
                    </ButtonGroup>
                ) : (
                    <Box></Box>
                )}
                <TableFilter
                    column={{
                        Header: "Course Code",
                        id: "course",
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
                        id: "professor",
                        filter: { type: "text" },
                    }}
                    onFilter={(column, value) => {
                        onFilter(column, value);
                    }}
                    w={"10rem"}
                />
            </HStack>

            {!isWeek && (
                <Heading as="h4" size="md">
                    {formatDateWeekday(date)}
                </Heading>
            )}
            <ButtonGroup size="sm" isAttached variant="solid">
                <Button isDisabled={isWeek} onClick={() => onView("week")}>
                    Week
                </Button>
                <Button isDisabled={!isWeek} onClick={() => onView("day")}>
                    Day
                </Button>
            </ButtonGroup>
        </HStack>
    );
};

export default Toolbar;
