import {
    Button,
    Flex,
    HStack,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { DarkModeSwitch } from "./DarkModeSwitch";

const DefaultLayout = ({ children }) => (
    <VStack bg={useColorModeValue("background.main", "gray.900")}>
        <HStack ml="auto" pt={5} pr={5}>
            <DarkModeSwitch />
            <Button>Logout</Button>
        </HStack>

        <Flex minH={"100vh"} justify={"center"} padding={10} width="100%">
            {children}
        </Flex>
    </VStack>
);

export default DefaultLayout;
