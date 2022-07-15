import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    ButtonGroup,
    Heading,
    HStack,
    IconButton,
} from "@chakra-ui/react";
import { formatDateWeekday } from "@lib/format";
import { Navigate } from "react-big-calendar";

const Toolbar = (props) => {
    const { view, date, onNavigate, onView } = props;

    const isWeek = view === "week";
    return (
        <HStack justifyContent={"space-between"} mb={4}>
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
