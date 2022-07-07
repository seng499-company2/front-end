import { Box, Text } from "@chakra-ui/react";

export const SidesheetHeader = ({ title, subTitle }) => (
    <Box>
        <Text fontSize="lg">{title}</Text>
        {subTitle && <Text fontWeight="thin">{subTitle}</Text>}
    </Box>
);
