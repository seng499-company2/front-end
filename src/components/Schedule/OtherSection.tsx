import { Flex, VStack, Text, useColorModeValue } from "@chakra-ui/react";
import { CourseTimeBox } from "./CourseTimeBox";

const OtherSection = ({ data }) => {
    return (
        <VStack
            align={"start"}
            bg={useColorModeValue("primary.200", "primary.700")}
            borderRadius={10}
            padding={2}
            _hover={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
                cursor: "pointer",
            }}
        >
            <Text fontSize="large" as="b">
                {data.section}
            </Text>
            <Flex maxW={100}>
                <CourseTimeBox courseTime={data.time} />
            </Flex>
        </VStack>
    );
};

export default OtherSection;
