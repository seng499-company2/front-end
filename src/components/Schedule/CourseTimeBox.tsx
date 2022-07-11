import { Box, Text, Divider, Grid, Center } from "@chakra-ui/react";

const weekday = ["S", "M", "T", "W", "T", "F", "S"];

const DaysBox = ({ selected }) => {
    return (
        <Grid templateColumns="repeat(7, 1fr)" gap={1}>
            {weekday.map((day, index) => (
                <Center
                    w="5"
                    h="5"
                    color="white"
                    bg={selected.includes(index) ? "blue.500" : "gray.500"}
                    key={index}
                >
                    {day}
                </Center>
            ))}
        </Grid>
    );
};

export const CourseTimeBox = ({ courseTime, ...other }) => {
    return (
        <>
            {Object.entries(courseTime).map(([time, days]) => (
                <Box key={time}>
                    <Text as="em">{time}</Text>
                    <Divider />
                    <DaysBox selected={days} />
                </Box>
            ))}
        </>
    );
};
