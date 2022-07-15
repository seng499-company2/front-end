import { Box, Text } from "@chakra-ui/react";
import { formatDateWeekday } from "@lib/format";

const WeekHeader = (props) => {
    const { date } = props;

    return (
        <Box>
            <Text>{formatDateWeekday(date)}</Text>
        </Box>
    );
};
export default WeekHeader;
