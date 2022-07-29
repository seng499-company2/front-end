import { Box, HStack, Text, Tooltip, VStack } from "@chakra-ui/react";
import { ScheduleEvent } from "src/types/calendar";

interface CalendarEventProps {
    event: ScheduleEvent;
    title?: string;
}

const Label = ({
    code,
    sectionDisplay,
    profName,
}: {
    code: string;
    sectionDisplay: string;
    profName: string;
}) => {
    return (
        <VStack
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            <HStack>
                <Text fontSize="md" fontWeight="bold">
                    {code}
                </Text>
                <Text fontSize="md">- {sectionDisplay}</Text>
            </HStack>
            <Text fontSize="md">{profName}</Text>
        </VStack>
    );
};

// body of the event
const CalendarEvent: React.FC<CalendarEventProps> = (props) => {
    const {
        course,
        section: { display, professor },
    } = props.event.details;

    const courseCodeDisplay = course?.code || "No Course Code";
    const sectionDisplay = display || "No Section";
    const profName = professor?.name || "No Professor";

    return (
        <Tooltip
            hasArrow
            placement="bottom"
            openDelay={300}
            arrowSize={15}
            closeOnMouseDown
            label={
                <Label
                    code={courseCodeDisplay}
                    sectionDisplay={sectionDisplay}
                    profName={profName}
                />
            }
        >
            <Box>
                <Text>{courseCodeDisplay}</Text>
                <Text>{sectionDisplay}</Text>
            </Box>
        </Tooltip>
    );
};

export default CalendarEvent;
