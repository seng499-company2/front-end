import { Box, Text, Divider } from "@chakra-ui/react";

export const CourseNameBox = ({ courseCode, courseName, ...other }) => {
    return (
    <Box {...other}>
    <Text as="b">{courseCode}</Text>
    <Divider />
    <Text fontSize="sm" as="i">
        {courseName}
    </Text>
    </Box>
    );
};
