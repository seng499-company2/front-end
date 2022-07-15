import { Box, Text } from "@chakra-ui/react";

const WeekHeader = (props) => {
    const { date } = props;
    // format date to EEEE
    const formatDate = (date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
        });
    };
    return (
        <Box>
            <Text>{formatDate(date)}</Text>
        </Box>
    );
};
export default WeekHeader;
