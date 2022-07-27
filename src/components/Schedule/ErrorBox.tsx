import { VStack, Text, Button, useColorModeValue } from "@chakra-ui/react";
import { FiRefreshCcw } from "react-icons/fi";

const formatErrorText = (error: string) => {
    if (error.includes("ERROR WITH ALGORITHMS")) {
        return "Something went wrong with the algorithms. Please adjust constraints and try again.";
    }

    return error;
};

const ErrorBox = ({ error, retry }) => {
    const errorBgColor = useColorModeValue("red.100", "red.400");

    return (
        <VStack
            spacing={4}
            bg={errorBgColor}
            borderRadius={"md"}
            mb={4}
            p={8}
            maxW={500}
            alignSelf={"center"}
        >
            <Text fontSize="sm" colorScheme="primary">
                {formatErrorText(error)}
            </Text>
            <Button
                size="sm"
                colorScheme="red"
                onClick={() => retry()}
                leftIcon={<FiRefreshCcw />}
            >
                Try again
            </Button>
        </VStack>
    );
};

export default ErrorBox;
