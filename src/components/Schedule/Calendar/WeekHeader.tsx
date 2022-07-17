import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { formatDateWeekday } from "@lib/format";

const WeekHeader = (props) => {
    const { date } = props;
    const textHoverColor = useColorModeValue("primary.500", "primary.300");

    return (
        <Box>
            <Text
                _hover={{
                    color: textHoverColor,
                }}
            >
                {formatDateWeekday(date)}
            </Text>
        </Box>
    );
};
export default WeekHeader;
