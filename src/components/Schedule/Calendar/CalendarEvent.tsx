import { Box, Text } from "@chakra-ui/react";
import { ScheduleEvent } from "src/types/calendar";

interface CalendarEventProps {
    event: ScheduleEvent;
    title?: string;
}

// body of the event
const CalendarEvent: React.FC<CalendarEventProps> = (props) => {
    return (
        <Box>
            <Text>{props.event.details.course.code}</Text>
            <Text>{props.event.details.section.display}</Text>
        </Box>
    );
};

export default CalendarEvent;
