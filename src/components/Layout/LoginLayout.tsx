import {
    Button,
    Flex,
    HStack,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";

import { DarkModeSwitch } from "./DarkModeSwitch";

// fix after sprint 2
const LoginLayout = ({ children }) => {
    return (
        <VStack bg={useColorModeValue("background.main", "gray.900")}>
            <HStack ml="auto" pt={5} pr={5}>
                <DarkModeSwitch />
            </HStack>

            <Flex minH={"100vh"} justify={"center"} padding={10} width="100%">
                {children}
            </Flex>
        </VStack>
    );
};

export default LoginLayout;
