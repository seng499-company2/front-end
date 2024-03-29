import { Button } from "@chakra-ui/button";
import { Box, Center, VStack } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { Text } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/system";
import ProfessorsTable from "./ProfessorsTable";

const ProfessorsTableWrapper = ({
    openDetails,
    data,
    isLoading,
    isError,
    execute,
}) => {
    const {
        colors: { primary },
    } = useTheme();

    if (isLoading)
        return (
            <Center height="50vh">
                <CircularProgress color={primary[400]} isIndeterminate />
                <Text ml={2} color="primary.700" fontSize="xl">
                    Loading Professors
                </Text>
            </Center>
        );

    if (isError)
        return (
            <Center>
                <VStack gap={4}>
                    <Text fontSize="xl" color="red">
                        Error fetching data
                    </Text>
                    <Button colorScheme={"red"} onClick={() => execute()}>
                        Try again
                    </Button>
                </VStack>
            </Center>
        );

    return (
        <Box>
            <ProfessorsTable professors={data} openDetails={openDetails} />
        </Box>
    );
};
export default ProfessorsTableWrapper;
