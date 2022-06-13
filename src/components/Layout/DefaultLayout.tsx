import { Flex, useColorModeValue } from "@chakra-ui/react";

const DefaultLayout = ({ children }) => (
    <Flex
        minH={"100vh"}
        //align={"center"}
        justify={"center"}
        bg={useColorModeValue("background.main", "primary.800")}
        padding={10}
    >
        {children}
    </Flex>
);

export default DefaultLayout;
