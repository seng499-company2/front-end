import { Box, Text } from "@chakra-ui/react";
import { ScheduledCourseEvent } from "src/types/calendar";

interface CalendarEventProps {
    event: ScheduledCourseEvent;
    title?: string;
}

// body of the event
const CalendarEvent: React.FC<CalendarEventProps> = (props) => {
    return (
        <Box>
            <Text>{props.event.course.course.code}</Text>
            <Text>{props.event.course.section.display}</Text>
        </Box>
    );
};

export default CalendarEvent;
