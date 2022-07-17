import { Box, HStack, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";

const LimitedSkeleton = (props) => {
    return <Skeleton startColor="gray.300" endColor="gray.500" {...props} />;
};

const SkeletonColumn = () => {
    return (
        <VStack gap={4}>
            {[...Array(8)].map((_, index) => (
                <LimitedSkeleton key={index} h={20} width="100%" />
            ))}
        </VStack>
    );
};

export const CalendarLoadingSkeleton = () => {
    return (
        <Box height="80vh" width="100%">
            {/* make calendar with skeletons */}
            <HStack justifyContent={"flex-end"}>
                <LimitedSkeleton height="10" width="40" mb={4} />
            </HStack>
            <LimitedSkeleton height="20" width="100%" mb={4} />
            <SimpleGrid columns={5} spacing={4}>
                {[...Array(5)].map((_, index) => (
                    <SkeletonColumn key={index} />
                ))}
            </SimpleGrid>
        </Box>
    );
};
