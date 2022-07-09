import {
    Box,
    Button,
    Flex,
    HStack,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";

import { DarkModeSwitch } from "./DarkModeSwitch";
import User from "./NavBar/User";

const DefaultLayout = ({ children }) => {
    const userTextColor = useColorModeValue("gray.800", "gray.100");
    return (
        <VStack bg={useColorModeValue("background.main", "gray.900")}>
            <HStack ml="auto" pt={5} pr={5}>
                <DarkModeSwitch />
                <User hasProfile={false} textColor={userTextColor} />
            </HStack>

            <Flex minH={"100vh"} justify={"center"} padding={10} width="100%">
                {children}
            </Flex>
        </VStack>
    );
};

export default DefaultLayout;
