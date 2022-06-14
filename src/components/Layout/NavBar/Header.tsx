import {
    Flex,
    FlexProps,
    IconButton,
    useColorModeValue,
    HStack,
    Heading,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import User from "./User";

import { DarkModeSwitch } from "../DarkModeSwitch";

export interface HeaderProps extends FlexProps {
    onOpen: () => void;
}

export const Header = ({ onOpen, ...rest }: HeaderProps) => (
    <Flex
        ml={{ base: 0 }}
        px={{ base: 4, md: 4 }}
        alignItems="center"
        bg={useColorModeValue("primary.600", "gray.700")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.100", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
    >
        <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
            color="background.main"
        />
        <Heading color="background.main" mr="auto">
            Course Scheduler 2022
        </Heading>

        {/* <Text
      display={{ base: "flex", md: "none" }}
      fontSize="2xl"
      fontWeight="bold"
    >
      Logo
    </Text> */}

        <HStack spacing="6">
            {/* the return of the 👑 */}
            <DarkModeSwitch />
            <User />
        </HStack>
    </Flex>
);

export default Header;
